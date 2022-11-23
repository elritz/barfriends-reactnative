import { onError } from '@apollo/client/link/error'

// TODO: FN(Errorlink should resetted by UI func)

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//     );

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
		console.log(networkError.name)
		switch (networkError.name) {
			case 'ServerError':
				console.log('TODO:💽 Server Error network error')
				return forward(operation)
			case 'TypeError':
				console.log('TODO:TypeError network error')
				return forward(operation)
			case '500':
				console.log('TODO:500 network error')
				return forward(operation)
			case undefined:
				console.log('TODO:undefined network error')
				return forward(operation)
			default:
				console.log('TODO:default apollo network error')
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
