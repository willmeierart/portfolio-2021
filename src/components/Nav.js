import { useState } from 'react'
import useWindowSize from 'lib/hooks/useWindowSize'
// import Link from 'next/link'
// import { routes } from 'lib/routes'

const Header = () => {
	// const { HOME } = routes
	const { width } = useWindowSize()
	const [isOpen, setIsOpen] = useState(false)

	const circleStyles = {
		circumference: isOpen ? `${width}px` : '100px',
		origin: isOpen ? `-${width / 2}px` : '-50px',
	}

	return (
		<nav>
			<div className="circle" onClick={() => setIsOpen(!isOpen)} />
			<style jsx>{`
				.circle {
					display: inline-block;
					position: fixed;
					top: ${circleStyles.origin};
					left: ${circleStyles.origin};
					width: ${circleStyles.circumference};
					height: ${circleStyles.circumference};
					border-radius: ${circleStyles.circumference};
					background: yellow;
					transition: top .1s, left .1s, width .2s, height .2s, border-radius .2s;
					z-index: 9999
				}
			`}</style>
		</nav>
	)
}

export default Header
