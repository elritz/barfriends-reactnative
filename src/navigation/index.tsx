import AnimatedAppLoader from './screens/Splashscreen/AnimatedAppLoader'
import { useReactiveVar } from '@apollo/client'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	AUTHORIZATION,
	LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
} from '@constants/StorageConstants'
import {
	DeviceManager,
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import Navigator from '@navigation/navigators/Navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	SearchAreaReactiveVar,
	AuthorizationReactiveVar,
	SearchAreaType,
	PermissionCameraReactiveVar,
	PermissionMicrophoneReactiveVar,
	ForegroundLocationPermissionReactiveVar,
	BackgroundLocationPermissionReactiveVar,
	PermissionMediaReactiveVar,
	ThemeColorScheme,
	ThemeReactiveVar,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useAssets } from 'expo-asset'
import { Camera } from 'expo-camera'
import { getForegroundPermissionsAsync, getBackgroundPermissionsAsync } from 'expo-location'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync } from 'expo-notifications'
import { useEffect } from 'react'
import { AuthorizationDecoded } from 'src/types/app'

const Navigation = () => {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const setLocalStorageData = async () => {
		try {
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)
			if (getLocalStorageSearchArea !== null) {
				const values: SearchAreaType = JSON.parse(getLocalStorageSearchArea)
				if (values.useCurrentLocation) {
					await useSetSearchAreaWithLocation()
				} else {
					SearchAreaReactiveVar({
						...rSearchAreaVar,
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
			} else {
				const newSearchAreaValue = JSON.stringify(emptyStateSearchArea)
				await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
			}

			const getLocalStorageTheme = await AsyncStorage.getItem(
				LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
			)
			if (getLocalStorageTheme === null) {
				const initialThemeColorSchemeState = {
					colorScheme: ThemeColorScheme.system,
				}
				const newThemeColorScheme = JSON.stringify(initialThemeColorSchemeState)
				await AsyncStorage.setItem(LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE, newThemeColorScheme)
			} else {
				const values = JSON.parse(getLocalStorageTheme)
				ThemeReactiveVar({
					theme: null,
					colorScheme: values.colorScheme,
				})
				// there is a setting for theme
			}
		} catch (e) {
			// error reading value
		}
	}

	const setPermissions = async () => {
		const cameraPermission = await Camera.getCameraPermissionsAsync()
		const microphonePermission = await Camera.getMicrophonePermissionsAsync()
		const foregroundLocationPermission = await getForegroundPermissionsAsync()
		const backgroundLocationPermission = await getBackgroundPermissionsAsync()
		const mediaLibraryPermission = await getPermissionsAsync()

		PermissionCameraReactiveVar(cameraPermission)
		PermissionMicrophoneReactiveVar(microphonePermission)
		ForegroundLocationPermissionReactiveVar(foregroundLocationPermission)
		BackgroundLocationPermissionReactiveVar(backgroundLocationPermission)
		PermissionMediaReactiveVar(mediaLibraryPermission)
	}

	const setExpo = async () => {
		const cameraPermission = await Camera.getCameraPermissionsAsync()
	}

	const emptyStateSearchArea: SearchAreaType = {
		...rSearchAreaVar,
		useCurrentLocation: false,
		country: '',
		distance: 60,
		kRing: 2,
		state: '',
		isoCode: '',
		city: '',
		coords: {
			latitude: undefined,
			longitude: undefined,
		},
	}

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (data.refreshDeviceManager.__typename === 'DeviceManager') {
					const deviceManager = data.refreshDeviceManager as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}

				if (data.refreshDeviceManager.__typename === 'Error') {
					createADeviceManagerMutation()
				}
			},
		})

	const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
		onCompleted: async data => {
			if (data.createGuestProfile.__typename === 'CreateProfileResponse') {
				createADeviceManagerMutation({
					variables: {
						profileId: data.createGuestProfile.Profile.id,
					},
				})
			}
		},
	})

	const [createADeviceManagerMutation, { data: CDMData, loading: CDMLoading, error: CDMError }] =
		useCreateADeviceManagerMutation({
			onCompleted: async data => {
				if (data.createADeviceManager.__typename === 'DeviceManager') {
					const deviceManager = data.createADeviceManager as DeviceManager
					AuthorizationReactiveVar(deviceManager)
					updateOneProfileMutation({
						variables: {
							where: {
								id: deviceManager.DeviceProfile.Profile.id,
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
		const subscription = Notifications.addPushTokenListener(e => {})
		return () => subscription.remove()
	}, [])
	const [assets, Aerror] = useAssets([
		require('../assets/images/splash/splash.light.png'),
		require('../assets/images/splash/splash.dark.png'),
	])
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
