import { css, Global } from '@emotion/core'

const styles = theme => css`

	@font-face {
		font-family: 'Infinite-Stroke';
		font-style: 'normal';
		font-weight: 600;
		src: url('/static/fonts/Infinite_Stroke_Bolder_Cond.otf');
	}

	body {
		background: ${theme.COLOR_BLUE_1};
		box-sizing: border-box;
		font-size: 11px;
		height: 100vh;
		letter-spacing: 1px;
		margin: 0;
		padding: 0;
		width: 100vw;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	li {
		list-style: none;
	}
	h1 {
		font-family: 'Infinite-Stroke', Helvetica, sans-serif;
		font-size: 2rem;
	}
	.page-transition-enter {
		opacity: 0;
	}
	.page-transition-enter-active {
		opacity: 1;
		transition: opacity 300ms;
	}
	.page-transition-exit {
		opacity: 1;
	}
	.page-transition-exit-active {
		opacity: 0;
		transition: opacity 300ms;
	}
`

const GlobalStyles = () => <Global styles={styles} />
export default GlobalStyles
