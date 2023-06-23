// import { config } from '../../gluestack-ui.config'
import { useReactiveVar } from '@apollo/client'
import { GluestackUIProvider } from '@components/core'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { LocalStoragePreferenceThemeType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider as ReactNavigationThemeProvider } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { SplashScreen, Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { useRef, useState, useEffect, useMemo } from 'react'
import { AppState, useColorScheme, Appearance, StatusBar } from 'react-native'

export default () => {
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
			const currentDeviceAppearance = Appearance.getColorScheme()
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setTheme()
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
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

	if (!memTheme || memTheme === null || !memTheme.theme?.nb) {
		return <SplashScreen />
	}

	return (
		<ReactNavigationThemeProvider value={memTheme.theme?.rn}>
			<GluestackUIProvider
				config={memTheme.theme.gluestack}
				colorMode={memTheme.colorScheme === 'light' ? 'light' : 'dark'}
			>
				{/* <GluestackUIProvider config={config}> */}
				{/* <NativeBaseProvider theme={memTheme.theme.nb}> */}
				<NativeBaseProvider theme={memTheme.theme.nb}>
					<StatusBar
						animated
						barStyle={memTheme.colorScheme === 'light' ? 'dark-content' : 'light-content'}
					/>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name={'hometab'} />
						<Stack.Screen name={'modal'} />
						<Stack.Screen name={'public'} />
						<Stack.Screen name={'searcharea'} options={{ presentation: 'fullScreenModal' }} />
						<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
						<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
					</Stack>
				</NativeBaseProvider>
			</GluestackUIProvider>
		</ReactNavigationThemeProvider>
	)
}
