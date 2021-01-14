import '@babel/polyfill'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import Layout from 'layout/Layout'
import * as theme from 'styles/theme.style'
import GlobalStyles from 'styles/global.style'

const words = [
	'Hi!',
	'My',
	'name',
	'is',
	'Will',
	'and',
	'I',
	'like',
	'to',
	'create',
	'fun',
	'experiences',
	'of',
	'various',
	'kinds,',
	'like',
	'the',
	'one',
	'you\'re',
	'having',
	'now',
	'(or',
	'what',
	'you',
	'might',
	'find',
	'by',
	'clicking',
	'any',
	'of',
	'these',
	'floaty',
	'links)!',
	':)',
	'...',
	'...',
	'...',
	'...',
	'...',
]

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

		let activeIndex = 0
		setInterval(() => {
			this.setState({ activeTitleWord: words[activeIndex] })
			if (activeIndex === words.length - 1) {
				activeIndex = 0
			} else {
				activeIndex += 1
			}
		}, 500)
	}

	state = {
		activeTitleWord: words[0]
	}

	render () {
		const {
			Component,
			pageProps,
			router,
		} = this.props

		console.log('Made with 💖 with next.js and react-three-fiber by Will Meier 2021 (under construction...)')

		return (
			<Layout router={router}>
				<Head>
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZ7H5KZ3H0" />
					<meta property="og:type" content="website" />
					<meta property="og:site_name" content="will meier" />
					<meta property="og:locale" content="en_US" />
					<meta name="twitter:card" content="summary" />
					<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
					<title>{this.state.activeTitleWord}</title>
				</Head>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<Component
						{...pageProps}
						key={router.route + (router.query.page || '')}
						router={router}
					/>
				</ThemeProvider>
			</Layout>
		)
	}
}

export default Application
