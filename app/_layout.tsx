//TODO: Add notfication listener
import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { GluestackUIProvider } from '@components/core'
import AnimatedAppLoader from '@components/screens/splash/AnimatedAppLoader'
import {
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
	LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS,
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	AUTHORIZATION,
} from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { ENVIRONMENT } from '@env'
import {
	useRefreshDeviceManagerMutation,
	AuthorizationDeviceManager,
	useCreateGuestProfileMutation,
} from '@graphql/generated'
import {
	LocalStoragePreferenceSearchAreaType2,
	LocalStoragePreferenceThemeType,
	LocalStoragePreferenceAskBackgroundLocationPermissionType,
	LocalStoragePreferenceAskNotificationPermissionType,
	LocalStoragePreferenceSystemsOfUnitsType,
} from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as ReactNavigationThemeProvider } from '@react-navigation/native'
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
	AuthorizationReactiveVar,
} from '@reactive'
import { SearchAreaReactiveVar, searchAreaInitialState } from '@reactive'
import { ThemeReactiveVar } from '@reactive'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useAssets } from 'expo-asset'
import * as Camera from 'expo-camera'
import * as Contacts from 'expo-contacts'
import 'expo-dev-client'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync as getMeidaPermissionAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { getPermissionsAsync as getNotificiationPermissionAsync } from 'expo-notifications'
import { Slot, SplashScreen, useRouter } from 'expo-router'
import * as sq from 'expo-sqlite'
import { NativeBaseProvider } from 'native-base'
import { useEffect, useMemo, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import { AppState, Appearance, useColorScheme } from 'react-native'
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

export default () => {
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)

	const [toggleThemes] = useToggleTheme()
	const colorScheme = useThemeColorScheme()
	const deviceColorScheme = useColorScheme()

	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [assets, Aerror] = useAssets([
		require(`../assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`../assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
	])
	const setAsyncPreferencesLocalStorageData = async () => {
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

			// // THEME_PREFERENCE ~ START
			// const getLocalStorageTheme = await AsyncStorage.getItem(
			// 	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
			// )

			// console.log("🚀 ~ file: _layout.tsx:128 ~ setAsyncPreferencesLocalStorageData ~ getLocalStorageTheme:", getLocalStorageTheme)


			// if (!getLocalStorageTheme) {
			// 	const initialThemeColorSchemeState = JSON.stringify({
			// 		colorScheme: 'system',
			// 	} as LocalStoragePreferenceThemeType)

			// 	await AsyncStorage.setItem(
			// 		LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
			// 		initialThemeColorSchemeState,
			// 	)

			// 	ThemeReactiveVar({
			// 		theme: null,
			// 		localStorageColorScheme: 'system',
			// 		colorScheme: Appearance.getColorScheme(),
			// 	})
			// } else {
			// 	const localStorageTheme: LocalStoragePreferenceThemeType = JSON.parse(getLocalStorageTheme)

			// 	ThemeReactiveVar({
			// 		theme: null,
			// 		localStorageColorScheme: localStorageTheme.colorScheme,
			// 		colorScheme:
			// 			localStorageTheme.colorScheme === 'system'
			// 				? Appearance.getColorScheme()
			// 				: localStorageTheme.colorScheme,
			// 	})
			// }
			// // THEME_PREFERENCE ~ END

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
				setTheme()
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
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.createGuestProfile as AuthorizationDeviceManager
					if (deviceManager) {
						AuthorizationReactiveVar(deviceManager)
					}
				}
				setTheme()
			},
		})

	useEffect(() => {
		setAsyncPreferencesLocalStorageData()
		setPermissions()
	}, [])

	useEffect(() => {
		applicationAuthorization()
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

	const setTheme = async () => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)

		console.log(
			'🚀 ~ file: _layout.tsx:367 ~ setTheme ~ localStorageColorScheme:',
			localStorageColorScheme,
		)

		const valueLocalStorageColorScheme: LocalStoragePreferenceThemeType = JSON.parse(
			String(localStorageColorScheme),
		)

		console.log(
			'🚀 ~ file: _layout.tsx:374 ~ setTheme ~ valueLocalStorageColorScheme:',
			valueLocalStorageColorScheme,
		)

		await toggleThemes({ colorScheme: valueLocalStorageColorScheme.colorScheme })
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setTheme()
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
				const currentDeviceAppearance = Appearance.getColorScheme()
				if (currentDeviceAppearance !== rThemeVar.colorScheme) {
					setTheme()
				}
			}
			/// beef yaki noodles
			/// 40 guiza

			appState.current = nextAppState
		})

		return () => {
			subscription.remove()
		}
	}, [])

	const memTheme = useMemo(() => {
		return rThemeVar
	}, [rThemeVar, rThemeVar.colorScheme, colorScheme, deviceColorScheme])

	if (
		!assets ||
		!memTheme ||
		memTheme === null ||
		!memTheme.theme?.nativebase ||
		!RDMData ||
		RDMLoading ||
		CGLoading ||
		!rAuthorizationVar ||
		RDMError?.message ||
		CGPMError?.message
	) {
		return <SplashScreen />
	}

	return (
		<AnimatedAppLoader assets={assets}>
			<ReactNavigationThemeProvider value={memTheme.theme?.reactnavigation}>
				{/* <ReactNavigationThemeProvider value={DefaultTheme}> */}
				<GluestackUIProvider
					config={memTheme.theme.gluestack}
					colorMode={memTheme.colorScheme === 'light' ? 'light' : 'dark'}
				>
					<NativeBaseProvider theme={memTheme.theme.nativebase}>
						<StatusBar
							animated
							barStyle={memTheme.colorScheme === 'light' ? 'dark-content' : 'light-content'}
						/>
						<SafeAreaProvider>
							<KeyboardProvider statusBarTranslucent>
								<Slot />
							</KeyboardProvider>
						</SafeAreaProvider>
					</NativeBaseProvider>
				</GluestackUIProvider>
			</ReactNavigationThemeProvider>
		</AnimatedAppLoader>
	)
}
