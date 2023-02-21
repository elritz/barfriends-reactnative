import AnimatedAppLoader from './screens/Splashscreen/AnimatedAppLoader'
import { useReactiveVar } from '@apollo/client'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	AUTHORIZATION,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
} from '@constants/StorageConstants'
import {
	DeviceManager,
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
	ClientDeviceManager,
} from '@graphql/generated'
import Navigator from '@navigation/navigators/Navigator'
import {
	SearchAreaReactiveVar,
	AuthorizationReactiveVar,
	PermissionCameraReactiveVar,
	PermissionMicrophoneReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionMediaReactiveVar,
	ThemeReactiveVar,
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	searchAreaInitialState,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useAssets } from 'expo-asset'
import { Camera } from 'expo-camera'
import * as Contacts from 'expo-contacts'
import { getForegroundPermissionsAsync, getBackgroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { AuthorizationDecoded } from 'src/types/app'

const Navigation = () => {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
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
				console.log(
					'error REFRESH DEVICE MANANGER ERRROR:>> ',
					error,
					'error REFRESH DEVICE MANANGER ERRROR:>>',
				)
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.refreshDeviceManager as ClientDeviceManager
					console.log('ME ID :>> ', deviceManager.DeviceProfile?.Profile.id)
					console.log('ME PROFILE TYPE :>> ', deviceManager.DeviceProfile?.Profile.ProfileType)
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
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		if (!getAuthorization) {
			// console.log('create GUET')
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
