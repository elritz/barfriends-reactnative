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
	LocalStoragePreferenceNotificationPermissionType,
	LocalStoragePreferenceSearchAreaType2,
	LocalStoragePreferenceThemeType,
} from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
	PreferenceNotificationPermissionReactiveVar,
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

	const [assets, Aerror] = useAssets([
		require('../assets/images/splash/splash.light.png'),
		require('../assets/images/splash/splash.dark.png'),
	])

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

	const setPreferencesLocalStorageData = async () => {
		try {
			// SEARCH AREA
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)
			if (getLocalStorageSearchArea !== null) {
				const values: LocalStoragePreferenceSearchAreaType2 = JSON.parse(getLocalStorageSearchArea)

				if (values) {
					if (values.useCurrentLocation) {
						await useSetSearchAreaWithLocation()
					} else {
						SearchAreaReactiveVar({
							...rSearchAreaVar,
							...values,
						})
					}
				}
			} else {
				const newSearchAreaValue = JSON.stringify({
					...searchAreaInitialState,
				} as LocalStoragePreferenceSearchAreaType2)

				await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
			}
			// THEME
			const getLocalStorageTheme = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
			)

			if (!getLocalStorageTheme) {
				const initialThemeColorSchemeState = JSON.stringify({
					colorScheme: 'system',
				} as LocalStoragePreferenceThemeType)

				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
					initialThemeColorSchemeState,
				)

				ThemeReactiveVar({
					theme: null,
					localStorageColorScheme: 'system',
					colorScheme: Appearance.getColorScheme(),
				})
			} else {
				const values: LocalStoragePreferenceThemeType = JSON.parse(getLocalStorageTheme)

				ThemeReactiveVar({
					theme: null,
					localStorageColorScheme: values.colorScheme,
					colorScheme:
						values.colorScheme === 'system' ? Appearance.getColorScheme() : values.colorScheme,
				})
			}
			// NOTIFICATION_PERMISSION_PREFERENCE
			const getLocalStorageNotificationPermissionsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
			)

			if (!getLocalStorageNotificationPermissionsPreference) {
				const initialNotificationPermissionPreferenceState = JSON.stringify({
					canShowAgain: true,
					dateToShowAgain: Date.now(),
				} as LocalStoragePreferenceNotificationPermissionType)

				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
					initialNotificationPermissionPreferenceState,
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceNotificationPermissionType = JSON.parse(
					getLocalStorageNotificationPermissionsPreference,
				)
				PreferenceNotificationPermissionReactiveVar({
					...values,
				})
			}
			const getLocalStorageSystemOfUnitsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
			)

			// if (!getLocalStorageSystemOfUnitsPreference) {
			// 	const initialSystemOfUnits = JSON.stringify({
			// 		system: SystemsOfUnits.Metric,
			// 	} )

			// 	await AsyncStorage.setItem(
			// 		LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
			// 		initialSystemOfUnits,
			// 	)
			// } else {
			// 	const values: LocalStoragePreferenceNotificationPermissionType = JSON.parse(
			// 		getLocalStorageSystemOfUnitsPreference,
			// 	)
			// 	// PreferenceSystemsOfUnitsReactiveVar({
			// 	// 	...values,
			// 	// })
			// }
		} catch (e) {}
	}

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
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
				console.log('error', error)
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
		setPreferencesLocalStorageData()
		applicationAuthorization()
	}, [])

	// useEffect(() => {
	// 	const subscription = Notifications.addPushTokenListener(e => {
	// 		console.log('e NOTIFICATION EVENT SUBSCRIPTION  =======>', e, 'e =======>')
	// 	})
	// 	return () => subscription.remove()
	// }, [])

	if (!RDMData || RDMLoading || CDMLoading || !rAuthorizationVar || !assets) {
		return null
	}

	return (
		<AnimatedAppLoader assets={assets}>
			<Navigator />
		</AnimatedAppLoader>
	)
}

export default Navigation
