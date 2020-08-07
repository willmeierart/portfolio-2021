import { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { Clock } from 'three'
import useTexture from 'lib/hooks/useTexture'

const size = 2
const verticeNum = 60
const waveNum = 3
const waveAmt = 0.5

export default function Plane ({ imgSrc = '' }) {
	const plane = useRef()
	const texture = useTexture(imgSrc)

	const clock = new Clock()

	useFrame(() => {
		const t = clock.getElapsedTime()

		plane.current.geometry.vertices.map(v => {
			const waveX1 = 0.075 * Math.sin(v.x + t)
			const waveY1 = waveAmt * Math.sin(v.y * waveNum + t)
			const waveY2 = waveAmt / 2 * Math.sin(v.y * waveNum * 0.66 + t * 2)
			v.z = waveX1 + waveY1 + waveY2
		})

		plane.current.geometry.verticesNeedUpdate = true
	})

	return (
		<mesh
			rotation={[-0.1, 0, 0]}
			receiveShadow
			ref={plane}
			castShadow
			position={[0, 0, -2]}
		>
			<planeGeometry
				attach="geometry"
				args={[size, size, 60, 60]}
			/>
			<meshBasicMaterial
				attach="material"
				map={texture}
				// wireframe
			/>
		</mesh>
	)
}
