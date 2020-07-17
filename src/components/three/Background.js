import { useMemo, useRef } from 'react'
import { BackSide, Color } from 'three'
import vertexShader from 'lib/three/shaders/default.vert'
import fragmentShader from 'lib/three/shaders/environment.frag'

export default () => {
	const mesh = useRef(null)
	const radius = 8
	const colorSteps = {
		gradients: [
			{
				top: '#0747ab',
				bottom: '#6796b5',
				spot1: '#a7b9c7',
				spot2: '#a7b9c7'
			}
		]
	}

	const uniforms = useMemo(() => ({
		uTopColor: { value: new Color(colorSteps.gradients[0].top) },
		uBottomColor: { value: new Color(colorSteps.gradients[0].bottom) },
		uSpot1Color: { value: new Color(colorSteps.gradients[0].spot1) },
		uSpot1Position: { value: [0.4, 0.7] },
		uSpot2Color: { value: new Color(colorSteps.gradients[0].spot2) },
		uSpot2Position: { value: [0.6, 0.4] },
	}), [])

	return (
		<>
			<mesh
				ref={mesh}
				rotation={[0, 0, 0.12]}
			>
				<sphereBufferGeometry
					attach="geometry"
					args={[radius, 30, 30]}
				/>
				<shaderMaterial
					args={[{ uniforms, vertexShader, fragmentShader }]}
					side={BackSide}
					attach="material"
				/>
			</mesh>
		</>
	)

}
