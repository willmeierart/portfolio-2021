import { css } from '@emotion/core'

export default (width, height) => css`
	.wrapper {
		align-items: center;
		display: flex;
		height: 100vh;
		justify-content: center; 
		width: 100vw;
	}
	.backdrop {
		align-items: center;
		background: white;
		border-radius: ${width * 0.15}px;
		display: flex;
		height: ${height * 0.66}px;
		justify-content: center;
		width: ${width * 0.66}px;
		z-index: 100;
		box-shadow: 0 0 ${width * 0.075}px ${width * 0.075}px  white;
	}
	.content {
		display: grid;
		grid-template-rows: 10% 60% 30%;
		grid-gap: 8px;
		width: 90%;
		height: 90%;

		& > div {
			border: 2px solid black;
			width: 100%;
			height: 100%;
			background: lightblue;
		}
	}
`
