// authorization
import { useReactiveVar } from '@apollo/client';
import { AUTHORIZATION } from '@constants/StorageConstants';
import { AuthorizationDecoded } from '@ctypes/app';
import { useRefreshDeviceManagerMutation, useCreateGuestProfileMutation, AuthorizationDeviceManager } from '@graphql/generated';
import { AuthorizationReactiveVar } from '@reactive';
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect } from 'react';


export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error) {
				console.log('error REFRESH DEVICEMANAGER:>> ', error)
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.refreshDeviceManager as AuthorizationDeviceManager

					console.log('🚀 ~ file: index.tsx:28 ~ deviceManager:', deviceManager)

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
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.createGuestProfile as AuthorizationDeviceManager
					if (deviceManager) {
						AuthorizationReactiveVar(deviceManager)
					}
				}
			},
		})

	const applicationAuthorization = async () => {
		// const removeLocalSearchArea = await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		console.log(
			'=== getAuthorization LOCALSTORAGE ===',
			JSON.stringify(getAuthorization, null, 4),
			'=== getAuthorization LOCALSTORAGE ===',
		)

		if (!getAuthorization) {
			console.log('CREATE GUEST')
			createGuestProfileMutation()
		} else {
			// const removeLocalAuhtorizationToken = await secureStorageItemDelete({
			// 	key: AUTHORIZATION,
			// })

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