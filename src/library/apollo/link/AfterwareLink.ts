import { ApolloLink } from '@apollo/client'
import { asyncMap } from '@apollo/client/utilities'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { secureStorageItemCreate } from '@util/hooks/local/useSecureStorage'

const afterwareLink = new ApolloLink((operation, forward) =>
	asyncMap(forward(operation), async response => {
		const {
			response: { headers },
		} = operation.getContext()
		if (headers) {
			const authorization = headers.get('authorization')
			// console.log('AUTHORIZATION 🚀 ~ file: AfterwareLink.ts ~ line 13 ~ asyncMap ~ authorization', authorization)
			if (authorization) {
				await secureStorageItemCreate({
					value: authorization,
					key: AUTHORIZATION,
				})
			}
		}
		return response
	}),
)

export default afterwareLink
