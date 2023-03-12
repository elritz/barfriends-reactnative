import { AUTHORIZATION } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { DeviceManager } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
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

		AuthorizationReactiveVar(parsedAuthorization)
		return true
	} catch (e) {
		return false
	}
}

export default useCheckLocalStorageForAuthorizationToken
