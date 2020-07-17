import Nav from 'components/Nav'
import useMouseMove from 'lib/hooks/useMouseMove'

const Layout = ({ children, router }) => {
	const { posX, posY } = useMouseMove()

	return (
		<>
			<main>
				<Nav router={router} />
				{children}
				<div className="cursor" style={{ top: `${posY - 6}px`, left: `${posX - 6}px` }} />
				<style jsx>{`
					main {
						cursor: none;
						position: relative;
					}
					.cursor {
						background: red;
						border-radius: 10px;
						box-shadow: 0 0 3px 3px red;
						display: block;
						height: 10px;
						mix-blend-mode: color-dodge;
						pointer-events:none;
						position: absolute;
						width: 10px;
						z-index: 10000;
					}
				`}</style>
			</main>
		</>
	)
}

export default Layout
