import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const API_VERSION = 'v2'
const APP_ID = 'ckclbexld648t01xu2wled12t'

const GRAPHQL_ENDPOINT = `https://api-us-west-2.graphcms.com/${API_VERSION}/${APP_ID}/master`

const link = createHttpLink({
	fetch,
	uri: GRAPHQL_ENDPOINT
})

export default withApollo(({ initialState }) =>
	new ApolloClient({
		link,
		cache: new InMemoryCache().restore(initialState || {})
	})
)
