import { setContext } from '@apollo/client/link/context'
import { BARFRIENDS, AUTHORIZATION } from '@constants/StorageConstants'
import { useDeviceType } from '@util/hooks/device/useDeviceType'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'

const authLink = setContext(async (_, { headers }) => {
	const authorization = await secureStorageItemRead({ key: AUTHORIZATION })
	// console.log('AUTHORIZATION 🚀 ~ file: AuthorizationLink.ts ~ line 8 ~ authLink ~ authorization', authorization)

	const { deviceType } = await useDeviceType()

	// const { activeprofile } = await authorizationParseToken()

	// if (!activeprofile) {
	// 	return {
	// 		headers: {
	// 			...headers,
	// 		},
	// 	}
	// }

	return {
		headers: {
			...headers,
			authorization: authorization ? authorization : '',
			deviceType,
			appType: BARFRIENDS,
		},
	}
})

export default authLink
