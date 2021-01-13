import Nav from 'components/Nav'
// import useMouseMove from 'lib/hooks/useMouseMove'
import * as style from './Layout.style'

const Layout = ({ children, router }) => {
	// const { posX, posY } = useMouseMove()

	return (
		<main css={style.main}>
			{/* <Nav router={router} /> */}
			{children}
			{/* <div css={style.cursor} style={{ top: `${posY - 6}px`, left: `${posX - 6}px` }} /> */}
		</main>
	)
}

export default Layout
