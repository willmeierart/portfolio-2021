import { useState } from 'react'
import useWindowSize from 'lib/hooks/useWindowSize'
import style from './Nav.style'
// import Link from 'next/link'
// import { routes } from 'lib/routes'
import { useGesture } from 'react-use-gesture'

const Nav = () => {
	// const { HOME } = routes
	const { width } = useWindowSize()
	const [isOpen, setIsOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const circleStyles = {
		circumference: isOpen ? `${width}px` : isHovered ? '180px' : '100px',
		origin: isOpen ? `-${width / 2}px` : isHovered ? '-90px' : '-50px',
	}

	const bind = useGesture({
		onDrag: console.log,
		onWheel: console.log
	}, { pointerEvents: true })

	return (
		<nav css={() => style(circleStyles)}>
			<div
				className="circle"
				onClick={() => setIsOpen(!isOpen)}
				onMouseLeave={() => setIsHovered(false)}
				onMouseOver={() => setIsHovered(true)}
				{...bind()}
			/>
		</nav>
	)
}

export default Nav
