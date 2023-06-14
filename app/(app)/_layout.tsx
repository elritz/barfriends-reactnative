import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { LocalStoragePreferenceThemeType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeProvider } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { SplashScreen, Stack } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { useRef, useState, useEffect, useMemo } from 'react'
import { AppState, useColorScheme, Appearance, StatusBar } from 'react-native'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

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
		return rThemeVar.theme
	}, [rThemeVar.theme, rThemeVar.colorScheme, colorScheme, deviceColorScheme])

	if (!memTheme || memTheme === null) {
		return <SplashScreen />
	}

	return (
		<ThemeProvider
			value={{
				...memTheme.rn,
				colors: {
					...memTheme.rn.colors,
				},
			}}
		>
			<StyledThemeProvider theme={memTheme.styled}>
				<NativeBaseProvider theme={memTheme.nb}>
					<StatusBar animated style={memTheme.styled.theme === 'light' ? 'dark' : 'light'} />
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
			</StyledThemeProvider>
		</ThemeProvider>
	)
}
