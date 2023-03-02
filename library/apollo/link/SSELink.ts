// import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client/core'
// import { print, GraphQLError } from 'graphql'
// import { createClient, ClientOptions, Client } from 'graphql-sse'

// class SSELink extends ApolloLink {
// 	private client: Client

// 	constructor(options: ClientOptions) {
// 		super()
// 		this.client = createClient(options)
// 	}

// 	public request(operation: Operation): Observable<FetchResult> {
// 		return new Observable(sink => {
// 			return this.client.subscribe<FetchResult>(
// 				{ ...operation, query: print(operation.query) },
// 				{
// 					next: sink.next.bind(sink),
// 					complete: sink.complete.bind(sink),
// 					error: sink.error.bind(sink),
// 				},
// 			)
// 		})
// 	}
// }

// export const sseLink = new SSELink({
// 	url: 'https://192.168.86.23:5004',
// 	// url: 'https://localhost:5004/graphql/stream',
// })
