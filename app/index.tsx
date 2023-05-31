// authorization
import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION, LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	AuthorizationDeviceManager,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { Redirect, SplashScreen, useRouter } from 'expo-router'
import { useEffect } from 'react'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const router = useRouter()

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError: async error => {
				console.log('🚀 ~ file: index.ts========+>x:40 ~ error:', error)
				// await secureStorageItemDelete({
				// 	key: AUTHORIZATION,
				// })
				// createGuestProfileMutation()
				// router.push({
				// 	pathname: '(error)',
				// })
			},
			onCompleted: data => {
				// console.log('data REFRESH AUTHORIZATION ============>', JSON.stringify(data, null, 2))
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.refreshDeviceManager as AuthorizationDeviceManager
					console.log('🚀 ~ file: index.tsx:40 ~ deviceManager:', JSON.stringify(deviceManager, null, 4))
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error: CGPMError }] =
		useCreateGuestProfileMutation({
			onError: error => {
				console.log('🚀 ~ file: index.tsx:41 ~ error:', error)

				// router.push({
				// 	pathname: '(error)',
				// })
			},

			onCompleted: async data => {
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.createGuestProfile as AuthorizationDeviceManager
					console.log(
						'🚀 ~ file: index.tsx:60 ~ deviceManager:',
						deviceManager.DeviceProfile?.ProfileType,
					)
					if (deviceManager) {
						AuthorizationReactiveVar(deviceManager)
					}
				}
			},
		})

	const applicationAuthorization = async () => {
		// await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })

		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		if (!getAuthorization) {
			createGuestProfileMutation()
		} else {
			// await secureStorageItemDelete({
			// 	key: AUTHORIZATION,
			// })
			refreshDeviceManagerMutation()
		}
	}

	useEffect(() => {
		applicationAuthorization()
	}, [])

	if (
		!RDMData ||
		RDMLoading ||
		CGLoading ||
		!rAuthorizationVar ||
		RDMError?.message ||
		CGPMError?.message
	) {
		return <SplashScreen />
	}

	return <Redirect href={'(app)/hometab'} />
	// return <Redirect href={'(app)/credential/logincredentialstack/loginpassword?profileid="RAMDPM'} />
}
