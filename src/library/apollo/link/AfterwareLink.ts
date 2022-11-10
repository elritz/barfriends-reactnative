import { ApolloLink } from '@apollo/client'
import { asyncMap } from '@apollo/client/utilities'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { DeviceManager } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemCreate, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { AuthorizationDecoded } from 'src/types/app'

// TODO FN(How can i set the profile here, currently only getting Profile.id)

const afterwareLink = new ApolloLink((operation, forward) =>
	asyncMap(forward(operation), async response => {
		const {
			response: { headers },
		} = operation.getContext()
		if (headers) {
			const authorization = headers.get('authorization')
			if (authorization) {
				await secureStorageItemCreate({
					value: authorization,
					key: AUTHORIZATION,
				})
				// const getAuthorization = (await secureStorageItemRead({
				// 	key: AUTHORIZATION,
				// 	decode: true,
				// })) as AuthorizationDecoded

				// const parsedAuthorization = JSON.parse(getAuthorization.devicemanager) as DeviceManager
				// console.log(
				// 	'🚀 ~ file: AfterwareLink.ts ~ line 28 ~ asyncMap ~ parsedAuthorization',
				// 	parsedAuthorization.DeviceProfile.Profile,
				// )

				// AuthorizationReactiveVar(parsedAuthorization)
			}
		}
		return response
	}),
)

export default afterwareLink
