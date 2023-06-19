// authorization
import { useReactiveVar } from '@apollo/client'
import {
	AUTHORIZATION,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
	LOCAL_STORAGE_SEARCH_AREA,
} from '@constants/StorageConstants'
import { AuthorizationDecoded } from '@ctypes/app'
import { LocalStoragePreferenceThemeType } from '@ctypes/preferences'
import {
	useRefreshDeviceManagerMutation,
	useCreateGuestProfileMutation,
	AuthorizationDeviceManager,
} from '@graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { Redirect, SplashScreen, useRouter } from 'expo-router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AppState, Appearance, StatusBar, useColorScheme } from 'react-native'

export default () => {
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const colorScheme = useThemeColorScheme()
	const deviceColorScheme = useColorScheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const router = useRouter()

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onError: async error => {
				// await secureStorageItemDelete({
				// 	key: AUTHORIZATION,
				// })
				// createGuestProfileMutation()
				// router.push({
				// 	pathname: '(error)',
				// })
			},
			onCompleted: data => {
				if (data.refreshDeviceManager?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.refreshDeviceManager as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const [createGuestProfileMutation, { data, loading: CGLoading, error: CGPMError }] =
		useCreateGuestProfileMutation({
			onError: error => {
				router.push({
					pathname: '(error)',
				})
			},

			onCompleted: async data => {
				if (data?.createGuestProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.createGuestProfile as AuthorizationDeviceManager
					if (deviceManager) {
						AuthorizationReactiveVar(deviceManager)
					}
				}
			},
		})

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
		setTheme()
	}, [])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			const currentDeviceAppearance = Appearance.getColorScheme()
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setTheme()
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
				if (currentDeviceAppearance !== rThemeVar.colorScheme) {
					setTheme()
				}
			}
			appState.current = nextAppState
		})

		return () => {
			subscription.remove()
		}
	}, [])

	useEffect(() => {
		applicationAuthorization()
	}, [])

	const memTheme = useMemo(() => {
		return rThemeVar
	}, [rThemeVar.colorScheme, colorScheme, deviceColorScheme])

	if (
		!RDMData ||
		RDMLoading ||
		CGLoading ||
		!rAuthorizationVar ||
		RDMError?.message ||
		CGPMError?.message ||
		!memTheme ||
		memTheme === null
	) {
		return <SplashScreen />
	}

	return <Redirect href={'(app)/hometab'} />
	// return <Redirect href={'(app)/settings/profilesettings/personal/interests'} />
}
