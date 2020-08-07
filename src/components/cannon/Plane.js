import {
	useContext,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import * as CANNON from 'cannon'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import SimplexNoise from 'simplex-noise'
import useTexture from 'lib/hooks/useTexture'
import { cannonContext, useCannon } from 'lib/hooks/useCannon'
import { arrayLen, dimUnits } from 'lib/helpers'

const clock = new THREE.Clock()
const noise = new SimplexNoise()
const direction = new THREE.Vector3(0.5, 0, -1)

const size = 20
const mass = 1
const sqDim = 400
const baseForce = 2000
const off = 0.05

export default function Plane ({ imgSrc = '', initialPosition = [0, 0, 0] }) {
	const sizes = useRef(new THREE.Vector2(sqDim, sqDim))
	const stitches = useRef([])
	const flowField = useRef([])
	const force = useRef(0)
	const bufferV = useMemo(() => new THREE.Vector3(), [])
	const bufferV2 = useMemo(() => new CANNON.Vec3(), [])
	const world = useContext(cannonContext)
	const texture = useTexture(imgSrc)

	const plane = useCannon(
		{ mass },
		body => {
			body.addShape(new CANNON.Plane())
			body.position.set(...initialPosition)
		}
	)

	const connect = (a, b) => {
		const c = new CANNON.DistanceConstraint(a, b)
		world.addConstraint(c)
	}

	useEffect(() => {
		if (plane.current) {
			const { position } = plane.current?.geometry.attributes
			const { x: width, y: height } = sizes.current
			const particleShape = new CANNON.Particle()

			position && !stitches.current.length && (
				arrayLen(position.count).forEach((a, i) => {
					const { row } = dimUnits(size, i)
					const pos = new CANNON.Vec3(
						position.getX(i) * width,
						position.getY(i) * height,
						position.getZ(i)
					)

					const stitch = new CANNON.Body({
						mass: row === 0 ? 0 : mass / position.count,
						linearDamping: 0.8,
						position: pos,
						shape: particleShape,
						velocity: new CANNON.Vec3(0, 0, 0)
					})

					stitches.current.push(stitch)
					world.addBody(stitch)
					return a
				})
			)

			stitches.current.forEach((stitch, i) => {
				const { col, row } = dimUnits(size, i)
				if (col < size) connect(stitch, stitches.current[i + 1])
				if (row < size) connect(stitch, stitches.current[i + size + 1])
			})

			force.current = baseForce / position.count
			flowField.current = new Array(position.count)
		}
	}, [plane.current])

	useFrame((state, delta) => {
		if (flowField.current) {
			const t = clock.getElapsedTime()

			const {
				attributes: { position },
				parameters: { widthSegments }
			} = plane.current.geometry

			stitches.current.forEach((stitch, i) => {
				const { col, row } = dimUnits(widthSegments, i)

				const appliedNoise = noise.noise3D(row * off, col * off, t)
				const appliedForce = (appliedNoise * 0.5 + 0.5) * force.current

				flowField.current[i] = direction.clone().multiplyScalar(appliedForce)

				const p = bufferV.copy(stitch.position)

				position.setXYZ(
					i,
					p.x ? p.x / sqDim : 0,
					p.y ? p.y / sqDim : 0,
					p.z,
				)

				const { x, y, z } = flowField.current[i]
				const tempPosPhysic = bufferV2.set(x, y, z)

				// this is where it is breaking down, force being applied but not moving

				stitch.applyForce(tempPosPhysic, CANNON.Vec3.ZERO)

				position.needsUpdate = true
			})

			world.step(delta)
		}

	})

	return (
		<mesh ref={plane} receiveShadow castShadow>
			<planeBufferGeometry attach="geometry" args={[1, 1, size, size]} />
			<meshBasicMaterial attach="material" map={texture} />
		</mesh>
	)
}
