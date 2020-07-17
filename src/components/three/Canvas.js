import { Canvas } from 'react-three-fiber'

export default ({ children }) => (
	<div className="root">
		<Canvas camera={{ position: [0, 1, 4] }}>
			{children}
		</Canvas>
		<style jsx>{`
			.root {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}	
		`}</style>
	</div>
)
