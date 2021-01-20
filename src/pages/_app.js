import '@babel/polyfill'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import Layout from 'layout/Layout'
import * as theme from 'styles/theme.style'
import GlobalStyles from 'styles/global.style'

const titlePhrase = 'Hi! My name is Will and I like to create fun experiences of various kinds, like the one you\'re having now :)'

class Application extends App {
	componentDidMount () {

		this.scrollTitle()

		console.log('%cMade with 💖 with next and three by Will Meier 2021', 'color: yellow; font-size: 20px')
		console.log('...under construction')
	}

	state = {
		activeTitle: 'Hi!'
	}

	scrollTitle = () => {
		const size = 30
		let i = 0
		setInterval(() => {
			if (i > titlePhrase.length) {
				this.setState({ activeTitle: titlePhrase.substring(0, size) })
				i = 0
			} else {
				const activeTitle = titlePhrase.substring(i).substring(0, size)
				this.setState({ activeTitle })
			}
			i++
		}, 80)
	}

	render () {
		const {
			Component,
			pageProps,
			router,
		} = this.props

		return (
			<Layout router={router}>
				<Head>
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-GZ7H5KZ3H0" />
					<script dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '[G-GZ7H5KZ3H0]');
						`
					}} />
					<script dangerouslySetInnerHTML={{
						__html: `
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-5QD8BV4');
						`
					}} />
					<meta property="og:type" content="website" />
					<meta property="og:site_name" content="will meier" />
					<meta property="og:locale" content="en_US" />
					<meta property="og:title" content="will meier" />
					<meta property="og:description" content="a super cool website" />
					<meta property="og:image" content="/static/images/og.jpg" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="og:url" content="https://willmeier.cool" />
					<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
					<title>{this.state.activeTitle}</title>
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
