import { Suspense, useEffect, useRef, useState } from 'react'
import PageHead from 'layout/PageHead'
import Background from 'components/three/Background'
// import Camera from 'components/three/Camera'
import Canvas from 'components/three/Canvas'
import Cloud from 'components/three/Cloud'
import Text from 'components/three/Text'
import Plane from 'components/three/Plane'
import useMouseMove from 'lib/hooks/useMouseMove'
import useWindowSize from 'lib/hooks/useWindowSize'

const defaultTitle = 'Will Meier'

export default function Home () {
	// is there a better way to handle these? have access in the useFrame callback and as handlers on mesh obj...
	const mouseData = useMouseMove()
	const windowSize = useWindowSize()
	const [mouseFromCenter, setMouseFromCenter] = useState({ x: 0, y: 0 })
	const [xPositions, setXPositions] = useState({})
	const titleText = useRef(defaultTitle)
	// const mouseFromCenter = useRef({ x: 0, y: 0 })

	useEffect(() => { // maybe refactor this into its own hook
		const { posX, posY } = mouseData
		const screenCenter = {
			x: windowSize.width / 2,
			y: windowSize.height / 2,
		}
		// mouseFromCenter.current = {
		// 	x: posX - screenCenter.x,
		// 	y: posY - screenCenter.y,
		// }
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
			<PageHead />
			<Canvas>
				{/* <Camera /> */}
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
						content={titleText.current}
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
							// position={[mouseFromCenter.current.x / 50, -mouseFromCenter.current.y / 50, 4]}
							width={3}
						/>
					</Text>
				</Suspense>

				{/* it is going to be tough work here to figure out how to make sure they don't overlap */}

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

			</Canvas>
		</section>
	)
}
