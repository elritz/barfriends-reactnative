import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { SERVER_ENDPOINT } from '@env'
import { createClient } from 'graphql-ws'

const WSLink = new GraphQLWsLink(
	createClient({
		url: SERVER_ENDPOINT,
	}),
)
export default WSLink
