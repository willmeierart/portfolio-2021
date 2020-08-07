import { Suspense, useEffect, useRef, useState } from 'react'
// import { Physics } from 'use-cannon'
import PageHead from 'layout/PageHead'
import Background from 'components/three/Background'
import Camera from 'components/three/Camera'
import Canvas from 'components/three/Canvas'
import Cloud from 'components/three/Cloud'
import Text from 'components/three/Text'
import Plane from 'components/three/Plane'
// import Plane from 'components/cannon/Plane'
import useMouseMove from 'lib/hooks/useMouseMove'
import useWindowSize from 'lib/hooks/useWindowSize'
// import { CannonProvider } from 'lib/hooks/useCannon'

export default function Home () {
	// this is causing re-renders when done with state, doesnt work with ref, how can this get fixed?
	const mouseData = useMouseMove()
	const windowSize = useWindowSize()
	// const [mouseFromCenter, setMouseFromCenter] = useState({ x: 0, y: 0 })
	const mouseFromCenter = useRef({ x: 0, y: 0 })

	useEffect(() => { // maybe refactor this into its own hook
		const { posX, posY } = mouseData
		const screenCenter = {
			x: windowSize.width / 2,
			y: windowSize.height / 2,
		}
		mouseFromCenter.current = {
			x: posX - screenCenter.x,
			y: posY - screenCenter.y,
		}
		// setMouseFromCenter({
		// 	x: posX - screenCenter.x,
		// 	y: posY - screenCenter.y,
		// })
	}, [mouseData, windowSize])

	return (
		<section>
			<PageHead />
			<Canvas>
				<Camera />
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
					>
						<rectAreaLight
							castShadow
							color="pink"
							height={3}
							intensity={Math.abs(mouseData.deltaX + mouseData.deltaY) / 100 + 0.6}
							lookAt={[0, -10, 0]}
							penumbra={2}
							position={[mouseFromCenter.current.x / 50, -mouseFromCenter.current.y / 50, 4]}
							width={3}
						/>
					</Text>
				</Suspense>
				{/* <Suspense
					fallback={null}
				>
					<CannonProvider
						gravity={-1000}
					>
						<Plane
							imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/47/Wax_Museum_Plus_%286344827249%29.jpg"
							position={[0,0,0]}
						/>
					</CannonProvider>

				</Suspense> */}
				<Plane
					imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/47/Wax_Museum_Plus_%286344827249%29.jpg"
				/>
			</Canvas>
		</section>
	)
}
