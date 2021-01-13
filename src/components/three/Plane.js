import { useMemo, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { Clock, MixOperation } from 'three'
import useTexture from 'lib/hooks/useTexture'
import debounce from 'lodash.debounce'

const clock = new Clock()

export default function Plane ({
	externalUrl = '',
	idx,
	imgSrc = '',
	numItems,
	setXPositions,
	viewport = {},
	xPositions,
}) {
	const plane = useRef()
	const texture = useTexture(imgSrc)

	const [isOffscreen, setIsOffscreen] = useState(false)

	const config = useMemo(() => {
		const negMultiplier = Math.random() < 0.5 ? -1 : 1
		const posXMargin = Math.random() * 0.66 * viewport.width
		const randomPosX = viewport.width / posXMargin * negMultiplier / 2
		const divisor = viewport.width / 200
		const maxedPosX = negMultiplier < 0 ? Math.max(-divisor, randomPosX) : Math.min(divisor, randomPosX)

		const isOverlap = Object.keys(xPositions).reduce((acc, xPosKey) => {
			if (acc || xPosKey !== imgSrc && Math.abs(Math.abs(maxedPosX) - Math.abs(xPositions[xPosKey])) < viewport.width / 500) {
				return 1
			}
			return -1
		}, -1)
		// const posKey = `pos${idx}`
		// const prevPosKey = idx === 0 ? `pos${numItems - 1}` : `pos${idx - 1}`
		// const isOverlap = Math.abs(Math.abs(maxedPosX) - Math.abs(xPositions[`pos${idx}`]))
		const initialPosX = isOverlap * maxedPosX

		setXPositions({ ...xPositions, [`pos${idx}`]: initialPosX })

		return {
			initialPosX,
			initialPosY: -5,
			initialPosZ: -2,
			riseSpeed: 0.02,
			size: viewport.width / 1000,
			verticeNum: 60,
			waveAmt: 0.5,
			waveNum: 3,
		}

	}, [isOffscreen, viewport])

	const {
		initialPosX,
		initialPosY,
		initialPosZ,
		riseSpeed,
		size,
		verticeNum,
		waveAmt,
		waveNum,
	} = config

	const staggeredInitialY = (idx * 1.5 + 1) * initialPosY

	useFrame(state => {
		const t = clock.getElapsedTime()

		plane.current.geometry.vertices.forEach(v => {
			const waveX1 = 0.1 * Math.sin(v.x + t)
			const waveY1 = waveAmt * Math.sin(v.y * waveNum + t)
			const waveY2 = waveAmt / 2 * Math.sin(v.y * waveNum * 0.66 + t * 2)
			v.z = waveX1 + waveY1 + waveY2
		})

		setIsOffscreen(plane.current.position.y - (size / 2) >= state.viewport.height)

		if (isOffscreen) {
			plane.current.position.y = staggeredInitialY
		} else {
			plane.current.position.y += riseSpeed
		}

		plane.current.geometry.verticesNeedUpdate = true
	})

	const handlePointerEnter = () => {
		document.querySelector('body').style.cursor = 'pointer'
	}

	const handlePointerLeave = () => {
		document.querySelector('body').style.cursor = 'default'
	}

	const handleClick = () => { window.open(externalUrl, '_blank') }

	return (
		<mesh
			castShadow
			onClick={handleClick}
			onPointerEnter={debounce(handlePointerEnter, 50)}
			onPointerLeave={debounce(handlePointerLeave, 50)}
			position={[initialPosX, staggeredInitialY, initialPosZ]}
			receiveShadow
			ref={plane}
		>
			<planeGeometry
				attach="geometry"
				args={[size * 1.33, size, verticeNum, verticeNum]}
			/>
			<meshBasicMaterial
				attach="material"
				combine={MixOperation}
				map={texture}
				transparent
			/>
		</mesh>
	)
}
