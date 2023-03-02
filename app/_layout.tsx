import { ApolloProvider, useReactiveVar } from '@apollo/client'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
	AUTHORIZATION,
} from '@constants/StorageConstants'
import { BACKGROUND_NOTIFICATION_TASK } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import {
	useRefreshDeviceManagerMutation,
	ClientDeviceManager,
	useCreateGuestProfileMutation,
	useCreateADeviceManagerMutation,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import gateaWayClient from '@library/gateway-apollo-server'
import AnimatedAppLoader from '@navigation/screens/Splashscreen/AnimatedAppLoader'
import {
	LocalStoragePreferenceSearchAreaType2,
	LocalStoragePreferenceThemeType,
	LocalStoragePreferenceNotificationPermissionType,
} from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	AuthorizationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionCameraReactiveVar,
	PermissionForegroundLocationReactiveVar,
	PermissionMediaReactiveVar,
	PermissionMicrophoneReactiveVar,
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { SearchAreaReactiveVar, searchAreaInitialState } from '@reactive'
import { ThemeReactiveVar } from '@reactive'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useAssets } from 'expo-asset'
import * as Camera from 'expo-camera'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

export default () => {
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

	useEffect(() => {
		setPermissions()
	}, [])

	// useEffect(() => {
	// 	const subscription = Notifications.addPushTokenListener(e => {
	// 		console.log('e NOTIFICATION EVENT SUBSCRIPTION  =======>', e, 'e =======>')
	// 	})
	// 	return () => subscription.remove()
	// }, [])

	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [assets, Aerror] = useAssets([
		require(`../assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`../assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
	])

	const setPreferencesLocalStorageData = async () => {
		try {
			// SEARCH AREA
			// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
			const getLocalStorageSearchArea = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)

			if (getLocalStorageSearchArea !== null) {
				const values: LocalStoragePreferenceSearchAreaType2 = JSON.parse(getLocalStorageSearchArea)
				if (values && values.useCurrentLocation) {
					await useSetSearchAreaWithLocation()
				} else {
					SearchAreaReactiveVar({
						...rSearchAreaVar,
						...values,
					})
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
				PreferencePermissionNotificationReactiveVar({
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

	useEffect(() => {
		setPreferencesLocalStorageData()
	}, [])

	if (!assets) {
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
