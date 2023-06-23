// authorization
import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION } from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	AuthorizationDeviceManager,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { Redirect, SplashScreen, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

export default () => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError: async error => {
				console.log('🚀 ~ file: index.tsx:37 ~ error:', error)
				// await secureStorageItemDelete({
				// 	key: AUTHORIZATION,
				// })
				router.push({
					pathname: '(error)/network',
				})
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.refreshDeviceManager as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error: CGPMError }] =
		useCreateGuestProfileMutation({
			onError: async error => {
				router.push({
					pathname: '(error)/network',
				})
			},

			onCompleted: async data => {
				console.log('data :🐶>> ', data)
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.createGuestProfile as AuthorizationDeviceManager
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
}
