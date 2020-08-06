import { Canvas } from 'react-three-fiber'
import style from './Canvas.style.js'

export default ({ children }) => (
	<div css={style}>
		<Canvas camera={{ position: [0, 0, 4] }}>
			{children}
		</Canvas>
	</div>
)
