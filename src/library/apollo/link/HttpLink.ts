import { HttpLink } from '@apollo/client'
import { SERVER_ENDPOINT } from '@env'

const httpLink = new HttpLink({
	uri: `http://${SERVER_ENDPOINT}`,
	// uri: 'http://127.0.0.1:4000/graphql',
	// uri: `http://localhost:4000/graphql`,
	// uri: `http://192.168.86.23:4000/graphql`,
})
export default httpLink
