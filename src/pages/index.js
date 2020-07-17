import { Suspense, useEffect, useState } from 'react'
import PageHead from 'layout/PageHead'
import Background from 'components/three/Background'
// import Camera from 'components/three/Camera'
import Canvas from 'components/three/Canvas'
import Cloud from 'components/three/Cloud'
import Text from 'components/three/Text'
import useMouseMove from 'lib/hooks/useMouseMove'
import useWindowSize from 'lib/hooks/useWindowSize'

const Home = () => {
	const mouseData = useMouseMove()
	const windowSize = useWindowSize()
	const [mouseFromCenter, setMouseFromCenter] = useState({ x: 0, y: 0 })

	useEffect(() => { // maybe refactor this into its own hook
		const { posX, posY } = mouseData
		const screenCenter = {
			x: windowSize.width / 2,
			y: windowSize.height / 2,
		}
		setMouseFromCenter({
			x: posX - screenCenter.x,
			y: posY - screenCenter.y,
		})
	}, [mouseData, windowSize])

	return (
		<section>
			<PageHead />
			<Canvas>
				<Background />
				<Cloud
					size={[20.096, 20.696]}
				/>
				<Suspense fallback={null}>
					<Text
						color="red"
						content={'Will Meier'}
						mouseData={mouseData}
						position={[0, 0, -4]} // -4 on z to make text recede into cloud
					>
						<rectAreaLight
							width={3}
							height={3}
							color="pink"
							intensity={Math.abs(mouseData.deltaX + mouseData.deltaY) / 100 + 0.6}
							position={[mouseFromCenter.x / 100, mouseFromCenter.y / 100, 4]}
							lookAt={[0, -10, 0]}
							penumbra={2}
							castShadow
						/>
					</Text>
				</Suspense>
			</Canvas>
		</section>
	)
}

export default Home
