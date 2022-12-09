import afterwareLink from './AfterwareLink'
import authLink from './AuthorizationLink'
import errorLink from './ErrorLink'
import httpLink from './HttpLink'
import retryLink from './RetryLink'
import { sseLink } from './SSELink'
import WSLink from './WebSocketLink'
import { ApolloLink, HttpLink, split } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { getMainDefinition } from '@apollo/client/utilities'

const directionalLink = new RetryLink().split(
	operation => operation.getContext().server === 'subscription',
	sseLink,
	httpLink,
)

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
	},
	WSLink,
	// ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, directionalLink]),
	ApolloLink.from([retryLink, authLink, errorLink, afterwareLink, httpLink]),
)

export default link
