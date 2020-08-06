import { css } from '@emotion/core'

export default circleStyles => css`
.circle {
		background: yellow;
		border-radius: ${circleStyles.circumference};
		cursor: pointer;
		display: inline-block;
		height: ${circleStyles.circumference};
		left: ${circleStyles.origin};
		position: fixed;
		top: ${circleStyles.origin};
		transition: top .1s, left .1s, width .2s, height .2s, border-radius .2s;
		width: ${circleStyles.circumference};
		z-index: 9999
	}
`
