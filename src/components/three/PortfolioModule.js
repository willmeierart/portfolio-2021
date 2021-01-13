import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { useDrag, useGesture } from 'react-use-gesture'

const shapes = {
	6: props => <boxBufferGeometry {...props} />,
	8: props => <octahedronBufferGeometry {...props} />,
	12: props => <dodecahedronBufferGeometry {...props} />,
	20: props => <icosahedronBufferGeometry {...props} />,
}

const getShapeKey = faces => {
	return Object.keys(shapes).reduce((a, b) => {
		return a === 0 && +b >= faces ? +b : a
	}, 0)
}

const Shape = ({ faces, ...props }) => shapes[getShapeKey(faces.length)](props)

export default function PortfolioModule ({
	data,
	isActive,
	setActive,
}) {
	console.log(data)
	const ref = useRef()
	const { size, viewport } = useThree()
	const [position, setPosition] = useState(!isActive
		? [
			Math.random() * viewport.width,
			Math.random() * viewport.height,
			-10
		] : [
			0,
			0,
			0
		])
	const [isDragging, setIsDragging] = useState(false)
	const rotationRef = useRef(Math.random() / 100)
	const aspect = size.width / viewport.width

	// const increment = Math.random() / 100

	// const bind = useDrag(dragData => {
	// 	dragData.dragging && console.log(dragData)
	// 	const { offset: [x, y] } = dragData
	// 	const [,, z] = position
	// 	setPosition([x / aspect, -y / aspect, z])
	// }, { pointerEvents: true })

	const bind = useGesture({
		onDrag: dragData => {
			const { offset: [x, y] } = dragData
			if (isActive) {
				console.log('isActive')
				ref.current.rotation.x += (x / 1000)
				ref.current.rotation.y += (y / 1000)
			} else {
				console.log('notisActive')
				dragData.dragging && console.log('DRAGGING', dragData)
				const [,, z] = position
				setPosition([x / aspect, -y / aspect, z])
			}
		},
		onDragEnd: () => setIsDragging(false),
		onDragStart: () => setIsDragging(true),
	}, { eventOptions: { pointer: true } })

	const dragProps = bind()
	// dragProps.onPointerDown = dragProps.onMouseDown

	const setRotation = r => {
		rotationRef.current = r
	}

	const handleClick = () => {

		if (!isDragging) {
			isActive
				? setPosition([
					Math.random() * viewport.width,
					Math.random() * viewport.height,
					-10
				]) : setPosition([
					0,
					0,
					0
				])
		}
		setActive(data)
	}

	useFrame(() => {
		if (!isActive && !isDragging) {
			ref.current.rotation.x += rotationRef.current
			ref.current.rotation.z += rotationRef.current
		}
	})

	return (
		<group>
			<mesh
				position={position}
				ref={ref}
				onClick={handleClick}
				onPointerOver={() => { setRotation(0) }}
				onPointerOut={() => { setRotation(Math.max(Math.random(), 0.2) / 100) }}
				castShadow
				{...dragProps}
			>
				<Shape faces={[6,6,6,6,6,6,6]} attach="geometry" />
				<meshLambertMaterial attachArray="material" color="red" />
				<meshLambertMaterial attachArray="material" color="green" />
				<meshLambertMaterial attachArray="material" color="yellow" />
				<meshLambertMaterial attachArray="material" color="blue" />
				<meshLambertMaterial attachArray="material" color="purple" />
				<meshLambertMaterial attachArray="material" color="white" />
				<meshLambertMaterial attachArray="material" color="black" />
				<meshLambertMaterial attachArray="material" color="pink" />

			</mesh>
			<spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
		</group>

	)
}
