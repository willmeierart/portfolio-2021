import { Suspense, useEffect, useState } from 'react'
import Background from 'components/three/Background'
import Canvas from 'components/three/Canvas'
import Cloud from 'components/three/Cloud'
import Text from 'components/three/Text'
import Plane from 'components/three/Plane'
import useMouseMove from 'lib/hooks/useMouseMove'
import useWindowSize from 'lib/hooks/useWindowSize'

export default function Home () {
	const mouseData = useMouseMove()
	const windowSize = useWindowSize()
	const [mouseFromCenter, setMouseFromCenter] = useState({ x: 0, y: 0 })
	const [xPositions, setXPositions] = useState({})

	useEffect(() => {
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

	const data = [
		{
			name: 'github',
			externalUrl: 'https://github.com/willmeierart/'
		},
		{
			name: 'linkedin',
			externalUrl: 'https://www.linkedin.com/in/willmeierart/'
		},
		{
			name: 'medium',
			externalUrl: 'https://medium.com/@willmeierart/'
		},
		{
			name: 'instagram',
			externalUrl: 'https://www.instagram.com/micro_aesthetics/'
		},
		{
			name: 'soundcloud',
			externalUrl: 'https://soundcloud.com/dj-fake-art'
		}
	]

	return (
		<section>
			{/* <PageHead /> */}
			<Canvas>
				<Background
					radius={8}
				/>
				<Cloud
					scale={2}
					speed={1}
				/>
				<Suspense
					fallback={null}
				>
					<Text
						color="red"
						content="Will Meier"
						position={[0, 0, -4]} // -4 on z to make text recede into cloud
						viewport={windowSize}
					>
						<rectAreaLight
							castShadow
							color="pink"
							height={3}
							intensity={Math.abs(mouseData.deltaX + mouseData.deltaY) / 100 + 0.6}
							lookAt={[0, -10, 0]}
							penumbra={2}
							position={[mouseFromCenter.x / 50, -mouseFromCenter.y / 50, 4]}
							width={3}
						/>
					</Text>
				</Suspense>
				<Suspense>
					{data.map((icon, i) => {
						return (
							<Plane
								externalUrl={icon.externalUrl}
								key={`plane-i${i}`}
								idx={i}
								imgSrc={`/static/images/${icon.name}_y.png`}
								numItems={data.length}
								reflectivity={1}
								setXPositions={setXPositions}
								viewport={windowSize}
								xPositions={xPositions}
							/>
						)
					})}
				</Suspense>

			</Canvas>
		</section>
	)
}
