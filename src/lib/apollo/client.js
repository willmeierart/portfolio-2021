import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const APP_ID = 'ckclbexld648t01xu2wled12t'

const GRAPHQL_ENDPOINT = `https://api-uswest.graphcms.com/v1/${APP_ID}/master`

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
