import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION, LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
	ClientDeviceManager,
} from '@graphql/generated'
import Navigator from '@navigation/navigators/Navigator'
import {
	AuthorizationReactiveVar,
	PermissionCameraReactiveVar,
	PermissionMicrophoneReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionMediaReactiveVar,
	PermissionNotificationReactiveVar,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { Camera } from 'expo-camera'
import * as Contacts from 'expo-contacts'
import { getForegroundPermissionsAsync, getBackgroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import { useEffect } from 'react'
import { AuthorizationDecoded } from 'src/types/app'

const Navigation = () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const setPermissions = async () => {
		const contactsPermission = await Contacts.getPermissionsAsync()
		const cameraPermission = await Camera.getCameraPermissionsAsync()
		const microphonePermission = await Camera.getMicrophonePermissionsAsync()
		const foregroundLocationPermission = await getForegroundPermissionsAsync()
		const backgroundLocationPermission = await getBackgroundPermissionsAsync()
		const mediaLibraryPermission = await getMeidaPermissionAsync()
		const notificationPermission = await getNotificiationPermissionAsync()

		PermissionCameraReactiveVar(cameraPermission)
		PermissionMicrophoneReactiveVar(microphonePermission)
		PermissionForegroundLocationReactiveVar(foregroundLocationPermission)
		PermissionBackgroundLocationReactiveVar(backgroundLocationPermission)
		PermissionMediaReactiveVar(mediaLibraryPermission)
		PermissionNotificationReactiveVar(notificationPermission)
	}

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error) {
				console.log('🚀 ~ file: index.tsx:54 ~ onError ~ error:', error)
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.refreshDeviceManager as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
				if (data.refreshDeviceManager?.__typename === 'ErrorManaging') {
					createADeviceManagerMutation()
				}
			},
		})

	const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
		onError: error => {
			console.log('error createGuestProfileMutation :>> ', error)
		},
		onCompleted: async data => {
			console.log('data :>> ', data)
			if (data?.createGuestProfile.__typename === 'Profile') {
				createADeviceManagerMutation({
					variables: {
						profileId: String(data.createGuestProfile.id),
					},
				})
			}
		},
	})

	const [createADeviceManagerMutation, { data: CDMData, loading: CDMLoading, error: CDMError }] =
		useCreateADeviceManagerMutation({
			onError: error => {
				console.log('error =====>', error)
			},
			onCompleted: async data => {
				const deviceManager = data.createADeviceManager as ClientDeviceManager
				if (!deviceManager) {
					console.log('What to do about no device manager!')
				} else {
					AuthorizationReactiveVar(deviceManager)
					updateOneProfileMutation({
						variables: {
							where: {
								id: deviceManager.DeviceProfile?.Profile.id,
							},
							data: {
								DeviceManager: [deviceManager.id],
							},
						},
					})
				}
			},
		})

	const [updateOneProfileMutation, { data: UOPData, loading: UOPLoading, error: UOPError }] =
		useUpdateOneProfileMutation()

	const applicationAuthorization = async () => {
		// const removeLocalAuhtorizationToken = await secureStorageItemDelete({
		// 	key: AUTHORIZATION,
		// })
		// const removeLocalAuhtorizationToken = await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		if (!getAuthorization) {
			createGuestProfileMutation()
		} else {
			refreshDeviceManagerMutation()
		}
	}

	useEffect(() => {
		setPermissions()
		applicationAuthorization()
	}, [])

	// useEffect(() => {
	// 	const subscription = Notifications.addPushTokenListener(e => {
	// 		console.log('e NOTIFICATION EVENT SUBSCRIPTION  =======>', e, 'e =======>')
	// 	})
	// 	return () => subscription.remove()
	// }, [])

	if (!RDMData || RDMLoading || CDMLoading || !rAuthorizationVar) {
		return null
	}

	return <Navigator />
}

export default Navigation
