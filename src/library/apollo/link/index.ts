import afterwareLink from './AfterwareLink'
import authLink from './AuthorizationLink'
import errorLink from './ErrorLink'
import httpLink from './HttpLink'
import retryLink from './RetryLink'
import WSLink from './WebSocketLink'
import { ApolloLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
	},
	WSLink,
	ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, httpLink]),
)

export default link
