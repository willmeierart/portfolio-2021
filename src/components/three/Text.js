import { useMemo } from 'react'
import { FontLoader, Vector3 } from 'three'
import { useLoader, useUpdate } from 'react-three-fiber'

export default ({
	children,
	color = '#000000',
	content,
	fontSize = 1,
	hAlign = 'center',
	vAlign = 'center',
	viewport = {},
	...extra
}) => {
	const font = useLoader(FontLoader, '/static/fonts/infinite_stroke.json')

	const config = useMemo(() => ({
		font,
		size: Math.min(viewport.width / 100, 12),
		height: 0,
		curveSegments: 15,
		material: 0,
	}), [viewport])

	const mesh = useUpdate(self => {
		const size = new Vector3()
		self.geometry.computeBoundingBox()
		self.geometry.boundingBox.getSize(size)
		self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
		self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
	}, [content, viewport])

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
