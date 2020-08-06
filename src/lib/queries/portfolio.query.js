import gql from 'graphql-tag'

const PORTFOLIO = gql`
  query Portfolio {
		pageMetadata(where: {page: "Portfolio"}) {
			metaTitle
			metaDescription
			metaImage {
				url
			}
		}
		techProjects {
			id
			title
			description
			url
			githubLink
			images {
				url
			}
			slug
		}
	}
`

export default PORTFOLIO
