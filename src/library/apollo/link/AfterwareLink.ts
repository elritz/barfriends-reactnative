import { ApolloLink } from '@apollo/client'
import { asyncMap } from '@apollo/client/utilities'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { DeviceManager } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemCreate, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { AuthorizationDecoded } from 'src/types/app'

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
				const getAuthorization = (await secureStorageItemRead({
					key: AUTHORIZATION,
					decode: true,
				})) as AuthorizationDecoded

				const deviceManager = getAuthorization as unknown as DeviceManager
				AuthorizationReactiveVar(deviceManager)
			}
		}
		return response
	}),
)

export default afterwareLink
