import { DEVICE_TOKEN } from '@constants/StorageConstants'
import { APP_TYPE, DEVICE_TOKEN_SECRET } from '@env'
import { useDeviceType } from '@util/hooks/device/useDeviceType'
import { createToken } from '@util/hooks/encryption/useJwt'
import { secureStorageItemCreate } from '@util/hooks/local/useSecureStorage'

interface DeiveTokenProps {
	birthday?: Date | undefined
}

type DeviceTokenReturn = {
	success: boolean
}

// TODO: FN() This does NOT work
const createDeviceTokenInSecureStorage = async ({
	birthday,
}: DeiveTokenProps): Promise<DeviceTokenReturn> => {
	// TODO: UX() Add signed in ProfileId
	const deviceId = null
	const appType = APP_TYPE
	const { deviceType } = await useDeviceType()
	const values = {
		birthday,
		deviceId,
		appType,
		deviceType,
	}
	const createdAccountToken = createToken({
		values,
		key: DEVICE_TOKEN_SECRET,
	})
	if (createdAccountToken) {
		await secureStorageItemCreate({
			key: DEVICE_TOKEN,
			value: createdAccountToken,
		})
		return {
			success: true,
		}
	}
	return {
		success: false,
	}
}

export default createDeviceTokenInSecureStorage
