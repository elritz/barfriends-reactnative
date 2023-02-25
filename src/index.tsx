import { PreferencePermissionNotificationReactiveVar } from './reactive/preferences'
import { SearchAreaReactiveVar, searchAreaInitialState } from './reactive/recommendation'
import { ThemeReactiveVar } from './reactive/theme'
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
} from '@constants/StorageConstants'
import { BACKGROUND_NOTIFICATION_TASK } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import gateaWayClient from '@library/gateway-apollo-server'
import Navigation from '@navigation/index'
import AnimatedAppLoader from '@navigation/screens/Splashscreen/AnimatedAppLoader'
import {
	LocalStoragePreferenceSearchAreaType2,
	LocalStoragePreferenceThemeType,
	LocalStoragePreferenceNotificationPermissionType,
} from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useAssets } from 'expo-asset'
import 'expo-dev-client'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Appearance, Linking } from 'react-native'
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

export default function App() {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [assets, Aerror] = useAssets([
		require(`./assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`./assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
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

	// useEffect(() => {
	// 	const subscription = Notifications.addNotificationResponseReceivedListener(response => {
	// 		const url = response.notification.request.content.data.url
	// 		console.log('🚀 -------------------------------------------------🚀')
	// 		console.log('🚀 ~ file: index.tsx:112 ~ subscription ~ url', url)
	// 		console.log('🚀 -------------------------------------------------🚀')

	// 		Linking.openURL(url)
	// 	})
	// 	return () => subscription.remove()
	// }, [])
	if (!assets) {
		return null
	}

	return (
		<AnimatedAppLoader assets={assets}>
			<SafeAreaProvider>
				<KeyboardProvider statusBarTranslucent>
					<ApolloProvider client={gateaWayClient}>
						<Navigation />
					</ApolloProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</AnimatedAppLoader>
	)
}
