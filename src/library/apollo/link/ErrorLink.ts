import { onError } from '@apollo/client/link/error'

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			switch (err.extensions.code) {
				case 'UNAUTHENTICATED':
					const oldHeaders = operation.getContext().headers
					operation.setContext({
						headers: {
							...oldHeaders,
						},
					})

					return forward(operation)
			}
		}
	}
	if (networkError) {
		switch (networkError.name) {
			case 'TypeError':
				console.log('TypeError network error')
				return forward(operation)
			case '500':
				console.log('500 network error')
				return forward(operation)
			case undefined:
				console.log('undefined network error')
				return forward(operation)
			default:
				console.log('default apollo network error')
				return forward(operation)
		}
	}
})
export default errorLink

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       // show some popup or any global related handling to your errors
//     });
//   }
//   if (networkError) {

//     return new Observable(obs => {
//       obs.error(
//         new ApolloError({
//           errorMessage: networkError.message,
//           graphQLErrors,
//           networkError
//         })
//       );
//     });
//   }
// });
