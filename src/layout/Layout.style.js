import { css } from '@emotion/core'

export const main = css`
		position: relative;
		/* cursor: none; */
`

export const cursor = css`
		background: red;
		border-radius: 10px;
		box-shadow: 0 0 3px 3px red;
		display: block;
		height: 10px;
		filter: invert();
		mix-blend-mode: difference;
		/* pointer-events:none; */
		position: absolute;
		width: 10px;
		z-index: 10000;
`
