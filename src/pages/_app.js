import '@babel/polyfill'
import { useEffect, useState } from 'react'
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
	static async getInitialProps ({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps({ ...ctx })
			: {}

		return { pageProps }
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
						<meta property="og:type" content="website" />
						<meta property="og:site_name" content="will meier" />
						<meta property="og:locale" content="en_US" />
						<meta name="twitter:card" content="summary" />
						<meta name="theme-color" content="#676767" />
						<link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
						<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
						<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
						<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
						<link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
						<link rel="manifest" href="/static/site.webmanifest" />
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
