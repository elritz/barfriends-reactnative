import { InMemoryCache } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
	typePolicies: {
		// LiveOutVenue: {
		// 	fields: {
		// 		Out: {
		// 			merge(existing, incoming) {
		// 				console.log(incoming)
		// 				return incoming
		// 			},
		// 		},
		// 	},
		// },
	},
})
