import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { Sky } from 'drei'
import PageHead from 'layout/PageHead'
import Background from 'components/three/Background'
import Camera from 'components/three/Camera'
import Canvas from 'components/three/Canvas'
import Cloud from 'components/three/Cloud'
import Text from 'components/three/Text'
import PortfolioModule from 'components/three/PortfolioModule'
import useWindowSize from 'lib/hooks/useWindowSize'
import PORTFOLIO_QUERY from 'lib/queries/portfolio.query'
import style from '../../pagesFiles/portfolio.style'

const Portfolio = () => {
	const { query: { slug }, push: routerPush } = useRouter()
	const { data } = useQuery(PORTFOLIO_QUERY) // handle fetching by slug if there is one
	const { width, height } = useWindowSize()
	const [activeProject, setActiveProject] = useState(null)

	useEffect(() => {
		setActiveProject(data.techProjects.find(p => p.slug === slug))
	}, [slug])

	return activeProject && (
		<section css={() => style(width, height)}>
			<PageHead />
			<Canvas position={[0, 1, 20]}>
				{/* <Background /> */}
				<Cloud
					scale={1.5}
					speed={0.25}
				/>
				<Suspense fallback={null}>
					<Text
						color="red"
						content={activeProject.title}
						position={[0, 4, -4]} // -4 on z to make text recede into cloud
					/>
				</Suspense>
				{data.techProjects.map(proj => (
					<PortfolioModule
						key={proj.id}
						data={proj}
						isActive={proj.id === activeProject.id}
						setActive={setActiveProject}
					/>
				))}
				{/* <Camera /> */}
			</Canvas>
			{/* <div className="wrapper">
				<div className="backdrop">
					<div className="content">
						<div className="title">
							<a href={activeProject.url}>
								<h1>{activeProject.title}</h1>
							</a>
						</div>
						<div className="slideshow">example</div>
						<div className="description">{activeProject.description}</div>
					</div>
				</div>
			</div> */}
		</section>
	)
}

export default Portfolio
