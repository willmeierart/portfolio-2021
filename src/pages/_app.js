import '@babel/polyfill'
import App from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks';
import { PageTransition } from 'next-page-transitions'
import { ThemeProvider } from 'emotion-theming'
import withData from 'lib/apollo/client'
import Layout from 'layout/Layout'
import * as theme from 'styles/theme.style'
import GlobalStyles from 'styles/global.style'

class Application extends App {
	// static async getInitialProps ({ Component, ctx }) {
	// 	const pageProps = Component.getInitialProps
	// 		? await Component.getInitialProps({ ...ctx })
	// 		: {}

	// 	return { pageProps }
	// }

	componentDidMount () {
		window.dataLayer = window.dataLayer || []
		function gtag () {
			window.dataLayer.push(arguments)
		}
		gtag('config', 'G-GZ7H5KZ3H0')
	}

	render () {
		const {
			apollo,
			Component,
			pageProps,
			router,
		} = this.props

		console.log('Made with 💖 with next.js and react-three-fiber by Will Meier 2021 (still under construction)')

		return (
			<ApolloProvider client={apollo}>
				<Layout router={router}>
					<Head>
						<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZ7H5KZ3H0" />
						<meta property="og:type" content="website" />
						<meta property="og:site_name" content="will meier" />
						<meta property="og:locale" content="en_US" />
						<meta name="twitter:card" content="summary" />
						<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
						<title>Will Meier</title>
					</Head>
					<PageTransition
						skipInititalTransition
						timeout={300}
						classNames="page-transition"
					>
						<ThemeProvider theme={theme}>
							<GlobalStyles />
							<Component
								{...pageProps}
								key={router.route + (router.query.page || '')}
								router={router}
							/>
						</ThemeProvider>
					</PageTransition>
				</Layout>
			</ApolloProvider>
		)
	}
}

export default withData(Application)
