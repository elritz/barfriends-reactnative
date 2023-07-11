import { config } from '../../gluestack-ui.config'
import { useReactiveVar } from '@apollo/client'
import AnimatedAppLoader from '@components/screens/splash/AnimatedAppLoader'
import {
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	AUTHORIZATION,
} from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { LocalStoragePreferenceThemeType } from '@ctypes/preferences'
import { ENVIRONMENT } from '@env'
import { StyledProvider } from '@gluestack-style/react'
import {
	AuthorizationDeviceManager,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
} from '@graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as ReactNavigationThemeProvider } from '@react-navigation/native'
import { ThemeReactiveVar, AuthorizationReactiveVar } from '@reactive'
import { secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useAssets } from 'expo-asset'
import { Redirect, useRouter } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AppState, Appearance, StatusBar, useColorScheme } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Theme({ children }) {
	const appState = useRef(AppState.currentState)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const colorScheme = useThemeColorScheme()
	const deviceColorScheme = useColorScheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [assets, Aerror] = useAssets([
		require(`../../assets/images/splash/splash.${ENVIRONMENT}.light.png`),
		require(`../../assets/images/splash/splash.${ENVIRONMENT}.dark.png`),
	])

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError(error, clientOptions) {
				console.log('🚀 ~ file: Theme.tsx:51 ~ onError ~ error:', error)

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
				console.log('🚀 ~ file: Theme.tsx:70 ~ onError ~ error:', error)

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

	const memTheme = useMemo(() => {
		return rThemeVar
	}, [rThemeVar, rThemeVar.colorScheme, colorScheme, deviceColorScheme])

	if (
		!assets ||
		!memTheme ||
		!memTheme.theme ||
		!memTheme.theme.gluestack ||
		!memTheme.theme.reactnavigation ||
		!rAuthorizationVar
	) {
		return null
	}

	return (
		<AnimatedAppLoader assets={assets}>
			<ReactNavigationThemeProvider value={memTheme.theme.reactnavigation}>
				<StyledProvider
					config={memTheme.theme.gluestack || config}
					colorMode={memTheme.colorScheme === 'light' ? 'light' : 'dark'}
				>
					<StatusBar
						animated
						barStyle={memTheme.colorScheme === 'light' ? 'dark-content' : 'light-content'}
					/>
					<SafeAreaProvider>
						<KeyboardProvider statusBarTranslucent>{children}</KeyboardProvider>
					</SafeAreaProvider>
				</StyledProvider>
			</ReactNavigationThemeProvider>
		</AnimatedAppLoader>
	)
}
