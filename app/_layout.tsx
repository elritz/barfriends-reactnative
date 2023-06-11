//TODO: Add notfication listener
import { ApolloProvider, InMemoryCache } from '@apollo/client'
import AnimatedAppLoader from '@components/screens/splash/AnimatedAppLoader'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
} from '@constants/StorageConstants'
import { ENVIRONMENT } from '@env'
import gateaWayClient from '@library/gateway-apollo-server'
import {
	LocalStoragePreferenceSearchAreaType2,
	LocalStoragePreferenceThemeType,
	LocalStoragePreferenceAskBackgroundLocationPermissionType,
	LocalStoragePreferenceAskNotificationPermissionType,
	LocalStoragePreferenceSystemsOfUnitsType,
} from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionBackgroundLocationReactiveVar,
	PermissionCameraReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionMediaReactiveVar,
	PermissionMicrophoneReactiveVar,
	PermissionNotificationReactiveVar,
	PreferenceBackgroundLocationPermissionReactiveVar,
	NowPreferencePermissionInitialState,
	PreferenceForegroundLocationPermissionReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	PreferenceSystemsOfUnitsInitialState,
	PreferenceSystemsOfUnitsReactiveVar,
	PermissionContactsReactiveVar,
} from '@reactive'
import { SearchAreaReactiveVar, searchAreaInitialState } from '@reactive'
import { ThemeReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { persistCache } from 'apollo3-cache-persist'
import { useAssets } from 'expo-asset'
import * as Camera from 'expo-camera'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import { Slot, SplashScreen, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Appearance, Linking } from 'react-native'
import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: true,
	}),
})

const cache = new InMemoryCache()

export default () => {
	const router = useRouter()
	const notificationListener = useRef()
	const responseListener = useRef()

	const setPermissions = async () => {
		const contactsPermission = await Contacts.getPermissionsAsync()
		const cameraPermission = await Camera.getCameraPermissionsAsync()
		const microphonePermission = await Camera.getMicrophonePermissionsAsync()
		const foregroundLocationPermission = await getForegroundPermissionsAsync()
		const backgroundLocationPermission = await getBackgroundPermissionsAsync()
		const mediaLibraryPermission = await getMeidaPermissionAsync()
		const notificationPermission = await getNotificiationPermissionAsync()

		PermissionContactsReactiveVar(contactsPermission)
		PermissionCameraReactiveVar(cameraPermission)
		PermissionMicrophoneReactiveVar(microphonePermission)
		PermissionForegroundLocationReactiveVar(foregroundLocationPermission)
		PermissionBackgroundLocationReactiveVar(backgroundLocationPermission)
		PermissionMediaReactiveVar(mediaLibraryPermission)
		PermissionNotificationReactiveVar(notificationPermission)
	}

	useEffect(() => {
		setPermissions()
	}, [])

	const [assets, Aerror] = useAssets([
		require(`../assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`../assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
	])

	const setPreferencesLocalStorageData = async () => {
		try {
			// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)
			// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION)

			// SEARCHAREA_PREFERENCE ~ START
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)

			if (getLocalStorageSearchArea !== null) {
				const values: LocalStoragePreferenceSearchAreaType2 = JSON.parse(getLocalStorageSearchArea)
				if (values && values.useCurrentLocation) {
					await useSetSearchAreaWithLocation()
				} else {
					SearchAreaReactiveVar({
						...values,
					})
				}
			} else {
				const newSearchAreaValue = JSON.stringify({
					...searchAreaInitialState,
				} as LocalStoragePreferenceSearchAreaType2)

				await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
			}
			// SEARCHARE_PREFERENCE ~ END

			// THEME_PREFERENCE ~ START
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
				const localStorageTheme: LocalStoragePreferenceThemeType = JSON.parse(getLocalStorageTheme)

				ThemeReactiveVar({
					theme: null,
					localStorageColorScheme: localStorageTheme.colorScheme,
					colorScheme:
						localStorageTheme.colorScheme === 'system'
							? Appearance.getColorScheme()
							: localStorageTheme.colorScheme,
				})
			}
			// THEME_PREFERENCE ~ END

			// NOTIFICATION_PREFERENCE ~ START
			const getLocalStorageNotificationPermissionsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
			)

			if (!getLocalStorageNotificationPermissionsPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceAskNotificationPermissionType = JSON.parse(
					getLocalStorageNotificationPermissionsPreference,
				)
				PreferencePermissionNotificationReactiveVar({
					...values,
				})
			}
			// NOTIFICATION_PREFERENCE ~ END

			// BACKGROUNDLOCATION_PREFERENCE ~ START
			const getLocalStoragePreferenceBackgroundLocationPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
			)

			if (!getLocalStoragePreferenceBackgroundLocationPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceAskBackgroundLocationPermissionType = JSON.parse(
					getLocalStoragePreferenceBackgroundLocationPreference,
				)

				PreferenceBackgroundLocationPermissionReactiveVar({
					...values,
				})
			}
			// BACKGROUNDLOCATION_PREFERENCE ~ END

			// FOREGROUNDLOCATION_PREFERENCE ~ START
			const getLocalStoragePreferenceForegroundLocationPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
			)

			if (!getLocalStoragePreferenceForegroundLocationPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
					JSON.stringify(NowPreferencePermissionInitialState),
				)
			} else {
				// using local_storage values set the correct information
				const values: LocalStoragePreferenceAskBackgroundLocationPermissionType = JSON.parse(
					getLocalStoragePreferenceForegroundLocationPreference,
				)

				PreferenceForegroundLocationPermissionReactiveVar({
					...values,
				})
			}
			// FOREGROUNDLOCATION_PREFERENCE ~ END

			// SYSTEM_OF_UNITS_PREFERENCE ~ START
			const getLocalStorageSystemOfUnitsPreference = await AsyncStorage.getItem(
				LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
			)

			if (!getLocalStorageSystemOfUnitsPreference) {
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
					JSON.stringify(PreferenceSystemsOfUnitsInitialState),
				)
			} else {
				const values: LocalStoragePreferenceSystemsOfUnitsType = JSON.parse(
					getLocalStorageSystemOfUnitsPreference,
				)

				PreferenceSystemsOfUnitsReactiveVar({
					...values,
				})
			}
			// BACKGROUNDLOCATION_PREFERENCE ~ START ~ END
		} catch (e) {}
	}

	useEffect(() => {
		setPreferencesLocalStorageData()
	}, [])

	const [loadingCache, setLoadingCache] = useState(true)

	useEffect(() => {
		persistCache({
			cache,
			storage: AsyncStorage,
		}).then(() => setLoadingCache(false))
	}, [])

	// useEffect(() => {
	// 	//NOTE: This only works if the notification happens in the foreground
	// 	notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
	// 		if (notification.request.content.data.route) {
	// 			router.push({
	// 				pathname: notification.request.content.data.route,
	// 			})
	// 		}
	// 	})

	// 	responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {})

	// 	return () => {
	// 		Notifications.removeNotificationSubscription(notificationListener.current)
	// 		Notifications.removeNotificationSubscription(responseListener.current)
	// 	}
	// 	//NOTE: This only works if the notification happens in the foreground
	// }, [])

	if (!assets || loadingCache) {
		return <SplashScreen />
	}

	return (
		<ApolloProvider client={gateaWayClient}>
			<AnimatedAppLoader assets={assets}>
				<SafeAreaProvider>
					<KeyboardProvider statusBarTranslucent>
						<Slot />
					</KeyboardProvider>
				</SafeAreaProvider>
			</AnimatedAppLoader>
		</ApolloProvider>
	)
}
