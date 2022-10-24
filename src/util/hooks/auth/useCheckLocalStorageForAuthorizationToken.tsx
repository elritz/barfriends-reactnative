import { AUTHORIZATION } from '@constants/StorageConstants'
import { CREATE_DEVICE_MANAGER_MUTATION } from '@graphql/DM/managing/devicemanager/index.mutation'
import { DeviceManager } from '@graphql/generated'
import client from '@library/gateway-apollo-server'
import { AuthorizationReactiveVar } from '@reactive'
import { AuthorizationDecoded } from '@types'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'

const useCheckLocalStorageForAuthorizationToken = async (): Promise<boolean> => {
	try {
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		if (!getAuthorization) {
			return false
		}

		const parsedAuthorization = JSON.parse(getAuthorization.devicemanager) as DeviceManager
		console.log(
			'🚀 ~ file: useCheckLocalStorageForAuthorizationToken.tsx ~ line 21 ~ useCheckLocalStorageForAuthorizationToken ~ parsedAuthorization',
			parsedAuthorization,
		)
		AuthorizationReactiveVar(parsedAuthorization)
		return true
	} catch (e) {
		return false
	}
}

export default useCheckLocalStorageForAuthorizationToken
