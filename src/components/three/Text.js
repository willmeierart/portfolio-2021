import { useMemo } from 'react'
import * as THREE from 'three'
import { useLoader, useUpdate } from 'react-three-fiber'

export default ({
	children,
	content,
	vAlign = 'center',
	hAlign = 'center',
	fontSize = 1,
	color = '#000000',
	...extra
}) => {
	const font = useLoader(THREE.FontLoader, '/static/fonts/cholo_script.json')

	const config = useMemo(() => ({
		font,
		size: 12,
		height: 0,
		curveSegments: 15,
		material: 0,
	}), [])

	const mesh = useUpdate(self => {
		const size = new THREE.Vector3()
		self.geometry.computeBoundingBox()
		self.geometry.boundingBox.getSize(size)
		self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
		self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
	}, [])

	return (
		<group
			{...extra}
			scale={[0.1 * fontSize, 0.1 * fontSize, 0.1]}
		>
			<mesh ref={mesh} castShadow>
				<textGeometry attach="geometry" args={[content, config]} />
				<meshStandardMaterial
					attach="material"
					roughness={0}
					metalness={0.5}
					color={color}
					transparent
				/>
			</mesh>
			{children}
		</group>
	)
}
