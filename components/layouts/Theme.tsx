import { useReactiveVar } from '@apollo/client'
import AnimatedSplashScreen from '@components/screens/splash/AnimatedSplashScreen'
import {
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	AUTHORIZATION,
} from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { LocalStoragePreferenceThemeType } from '@ctypes/preferences'
import { StyledProvider } from '@gluestack-style/react'
import {
	AuthorizationDeviceManager,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
} from '@graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as ReactNavigationThemeProvider } from '@react-navigation/native'
import { ThemeReactiveVar, AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useEffect, useRef } from 'react'
import { AppState, Appearance, StatusBar } from 'react-native'

export default function Theme({ children }) {
	const appState = useRef(AppState.currentState)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error, clientOptions) {
				// router.push({
				// 	pathname: '(error)/network',
				// })
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
			onError(error, clientOptions) {
				// router.push({
				// 	pathname: '(error)/network',
				// })
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

	const applicationAuthorization = async () => {
		// await secureStorageItemDelete({
		// 	key: LOCAL_STORAGE_SEARCH_AREA,
		// })
		// await secureStorageItemDelete({
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
		applicationAuthorization()
	}, [])

	const setTheme = async () => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)
		const valueLocalStorageColorScheme: LocalStoragePreferenceThemeType = JSON.parse(
			String(localStorageColorScheme),
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
	if (
		!rAuthorizationVar ||
		RDMLoading ||
		CGLoading ||
		!rThemeVar ||
		!rThemeVar.theme ||
		(!rThemeVar.theme.gluestack && !rThemeVar.theme.reactnavigation)
	) {
		return null
	}


	return (
		<ReactNavigationThemeProvider value={rThemeVar.theme.reactnavigation}>
			<StyledProvider
				config={rThemeVar.theme?.gluestack}
				colorMode={rThemeVar.colorScheme === 'light' ? 'light' : 'dark'}
			>
				<StatusBar
					animated
					barStyle={rThemeVar.colorScheme === 'light' ? 'dark-content' : 'light-content'}
				/>
				<AnimatedSplashScreen>{children}</AnimatedSplashScreen>
			</StyledProvider>
		</ReactNavigationThemeProvider>
	)
}
