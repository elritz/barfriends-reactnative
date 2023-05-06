// authorization
import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
	ClientDeviceManager,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { Redirect, SplashScreen } from 'expo-router'
import { useEffect } from 'react'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error) {
				console.log('error REFRESH DEVICEMANAGER:>> ', error)
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.refreshDeviceManager as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error }] =
		useCreateGuestProfileMutation({
			onError: error => {
				console.log('🚀 ~ file: index.tsx:39 ~ error:', error)
			},

			onCompleted: async data => {
				console.log('🚀 ~ file: index.tsx:53 ~ data:', data)
				if (data?.createGuestProfile.__typename === 'Profile') {
					const deviceManager = data.createGuestProfile as ClientDeviceManager
					if (!deviceManager) {
					} else {
						AuthorizationReactiveVar(deviceManager)
					}
				}
			},
		})

	const applicationAuthorization = async () => {
		// const removeLocalAuhtorizationToken = await secureStorageItemDelete({
		// 	key: AUTHORIZATION,
		// })
		// const removeLocalSearchArea = await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		console.log('getAuthorization', JSON.stringify(getAuthorization, null, 4))

		if (!getAuthorization) {
			console.log('CREATE GUEST')
			createGuestProfileMutation()
		} else {
			console.log('REFRESH AUTHORIZATION')
			refreshDeviceManagerMutation()
		}
	}

	useEffect(() => {
		applicationAuthorization()
	}, [])

	if (!RDMData || RDMLoading || CGLoading || !rAuthorizationVar) {
		return <SplashScreen />
	}

	return <Redirect href={'(app)/hometab'} />
}
