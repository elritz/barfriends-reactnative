import { cache } from './apollo/cache'
import link from './apollo/link'
import { ApolloClient } from '@apollo/client'

const client = new ApolloClient({
	link,
	cache,
	defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default client
