import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { ShaderMaterial, UniformsUtils, ShaderLib } from 'three'
import useTexture from 'lib/hooks/useTexture'
import fragmentShader from 'lib/three/shaders/cloud.frag'
import vertexShader from 'lib/three/shaders/cloud.vert'

export default ({ size }) => {
	const group = useRef(null)
	const mesh = useRef(null)
	const [width, height] = size
	const src1 = require('../../../public/static/images/clouds/1.jpg')
	const src2 = require('../../../public/static/images/clouds/2.jpg')
	const t1 = useTexture(src1)
	const t2 = useTexture(src2)

	const myUniforms = useMemo(() => ({
		uSpeed: { value: 3 },
		uTime: { value: 0 },
		uTxtShape: { value: t1 },
		uTxtCloudNoise: { value: t2 },
		uFac1: { value: 17.8 },
		uFac2: { value: 2.7 },
		uTimeFactor1: { value: 0.002 },
		uTimeFactor2: { value: 0.0015 },
		uDisplStrength1: { value: 0.04 },
		uDisplStrength2: { value: 0.08 },
	}), [])

	const material = useMemo(() => {
		return new ShaderMaterial({
			uniforms: { ...UniformsUtils.clone(ShaderLib.sprite.uniforms), ...myUniforms },
			vertexShader,
			fragmentShader,
			transparent: true,
		})
	}, [])

	useEffect(() => {
		if (material) material.uniforms.uTxtShape.value = t1
	}, [t1])

	useEffect(() => {
		if (material) material.uniforms.uTxtCloudNoise.value = t2
	}, [t2])

	useFrame(() => {
		if (material) material.uniforms.uTime.value += 1
	})

	return (
		<group ref={group}>
			<mesh
				ref={mesh}
				position={[0, 0.03, 0]}
				scale={[width, height, 1]}
			>
				<planeBufferGeometry
					args={[1.0, 1.0, 5, 5]}
					attach="geometry"
				/>
				<primitive
					object={material}
					attach="material"
				/>
			</mesh>
		</group>
	)
}
