import AnimatedAppLoader from './screens/Splashscreen/AnimatedAppLoader'
import { useReactiveVar } from '@apollo/client'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	AUTHORIZATION,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
} from '@constants/StorageConstants'
import {
	DeviceManager,
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import Navigator from '@navigation/navigators/Navigator'
import {
	LocalStoragePreferenceNotificationPermissionType,
	LocalStoragePreferenceSearchAreaType,
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
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useAssets } from 'expo-asset'
import { Camera } from 'expo-camera'
import { getForegroundPermissionsAsync, getBackgroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
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

	const setLocalStorageData = async () => {
		try {
			// SEARCH AREA
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)
			if (getLocalStorageSearchArea !== null) {
				const values: LocalStoragePreferenceSearchAreaType = JSON.parse(getLocalStorageSearchArea)
				if (values) {
					if (values.useCurrentLocation) {
						await useSetSearchAreaWithLocation()
					} else {
						SearchAreaReactiveVar({
							...rSearchAreaVar,
							useCurrentLocation: false,
							city: values.city,
							country: values.country,
							isoCode: values.isoCode,
							state: values.state,
							coords: {
								latitude: Number(values.coords.latitude),
								longitude: Number(values.coords.longitude),
							},
							distance: values.distance,
							kRing: 2,
						})
					}
				}
			} else {
				const newSearchAreaValue = JSON.stringify({
					...rSearchAreaVar,
					useCurrentLocation: false,
					country: '',
					distance: 60,
					kRing: 2,
					state: '',
					isoCode: '',
					city: '',
					coords: {
						latitude: 0,
						longitude: 0,
					},
				} as LocalStoragePreferenceSearchAreaType)
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
				const values: LocalStoragePreferenceNotificationPermissionType = JSON.parse(
					getLocalStorageNotificationPermissionsPreference,
				)
				PreferencePermissionNotificationReactiveVar({
					...values,
				})
			}
		} catch (e) {}
	}

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'DeviceManager') {
					const deviceManager = data.refreshDeviceManager as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}

				if (data.refreshDeviceManager?.__typename === 'Error') {
					createADeviceManagerMutation()
				}
			},
		})

	const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
		onCompleted: async data => {
			if (data?.createGuestProfile?.__typename === 'CreateProfileResponse') {
				createADeviceManagerMutation({
					variables: {
						profileId: String(data.createGuestProfile.Profile?.id),
					},
				})
			}
		},
	})

	const [createADeviceManagerMutation, { data: CDMData, loading: CDMLoading, error: CDMError }] =
		useCreateADeviceManagerMutation({
			onCompleted: async data => {
				if (data.createADeviceManager?.__typename === 'DeviceManager') {
					const deviceManager = data.createADeviceManager as DeviceManager
					AuthorizationReactiveVar(deviceManager)
					updateOneProfileMutation({
						variables: {
							where: {
								id: deviceManager?.DeviceProfile?.Profile?.id,
							},
							data: {
								DeviceManager: {
									push: deviceManager.id,
								},
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
			createGuestProfileMutation()
		} else {
			refreshDeviceManagerMutation()
		}
	}

	useEffect(() => {
		setPermissions()
		setLocalStorageData()
		applicationAuthorization()
	}, [])

	useEffect(() => {
		const subscription = Notifications.addPushTokenListener(e => {
			console.log('e =======>', e, 'e =======>')
		})
		return () => subscription.remove()
	}, [])

	if (!RDMData || RDMLoading || CDMLoading || !rAuthorizationVar) {
		return null
	}

	if (!assets) {
		return null
	}

	return (
		<AnimatedAppLoader assets={assets}>
			<Navigator />
		</AnimatedAppLoader>
	)
}

export default Navigation
