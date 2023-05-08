import { ApolloLink } from '@apollo/client'
import { asyncMap } from '@apollo/client/utilities'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { DeviceManager } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemCreate, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'

// TODO FN(How can i set the profile here, currently only getting Profile.id)

const afterwareLink = new ApolloLink((operation, forward) =>
	asyncMap(forward(operation), async response => {
		const {
			response: { headers },
		} = operation.getContext()
		if (headers) {
			const authorization = headers.get('authorization')

			// console.log("🚀 ~ file: AfterwareLink.ts:19 ~ asyncMap ~ authorization:", authorization)

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
