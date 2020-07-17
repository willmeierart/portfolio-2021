import gql from 'graphql-tag'

const HOME_QUERY = gql`
  query Home {
		pageMetadata(where: {page: "Home"}) {
			metaTitle
			metaDescription
			metaImage {
				url
			}
		}
	}
`

export default HOME_QUERY
