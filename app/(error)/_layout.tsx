import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { LocalStoragePreferenceThemeType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { SplashScreen, Stack } from 'expo-router'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { AppState, useColorScheme, Appearance, StatusBar } from 'react-native'

// import { config } from '../../gluestack-ui.config'

export default function _layout() {
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)

	const [toggleThemes] = useToggleTheme()
	const colorScheme = useThemeColorScheme()
	const deviceColorScheme = useColorScheme()

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

	if (!memTheme || memTheme === null || !memTheme.theme?.nativebase) {
		return null
	}
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'index'} />
		</Stack>
	)
}
