import Head from 'next/head'

export const defaultDescription = '';
export const defaultImage = '/static/images/logo.png';
export const defaultTitle = '';

const PageHead = ({ metadata }) => {
	const description = metadata?.metaDescription || defaultDescription
	const image = metadata?.metaImage?.url || defaultImage
	const title = metadata?.metaTitle || defaultTitle
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content="" />
			<meta key="og:title" property="og:title" content={title} />
			<meta key="og:description" property="og:description" content={description} />
			<meta key="og:image" property="og:image" content={image} />
			<meta key="twitter:description" name="twitter:description" content={description} />
			<meta key="twitter:title" name="twitter:title" content={title} />
			<meta key="twitter:image" name="twitter:image" content={image} />
			<meta name="robots" content="index,follow" />
		</Head>
	)
}

export default PageHead
