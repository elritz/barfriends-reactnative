import createTheme from './createTheme'
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeReactiveVar, AuthorizationReactiveVar } from '@reactive'
import { useColorMode } from 'native-base'
import { useCallback } from 'react'
import { Appearance } from 'react-native'

type Props = {
	colorScheme?: 'light' | 'system' | 'dark' | undefined
}

export const useToggleTheme = () => {
	const { setColorMode } = useColorMode()

	const setTheme = ({ colorScheme }) => {
		switch (colorScheme) {
			case 'system':
				const deviceColorScheme = Appearance.getColorScheme()
				setColorMode(deviceColorScheme)
				const sTheme = createTheme({ themeScheme: deviceColorScheme, useSystemColorMode: true })
				ThemeReactiveVar({
					localStorageColorScheme: 'system',
					colorScheme: deviceColorScheme,
					theme: sTheme,
				})
				return { localStorageColorScheme: 'system', colorScheme: deviceColorScheme, theme: sTheme }
			case 'light':
				setColorMode('light')
				const lTheme = createTheme({ themeScheme: 'light', useSystemColorMode: false })
				ThemeReactiveVar({
					localStorageColorScheme: 'light',
					colorScheme: 'light',
					theme: lTheme,
				})
				return { localStorageColorScheme: 'light', colorScheme: 'light', theme: lTheme }
			case 'dark':
				setColorMode('dark')
				const dTheme = createTheme({ themeScheme: 'dark', useSystemColorMode: false })
				ThemeReactiveVar({
					localStorageColorScheme: 'dark',
					colorScheme: 'dark',
					theme: dTheme,
				})
				return {
					localStorageColorScheme: 'dark',
					colorScheme: 'dark',
					theme: dTheme,
				}
			default:
				setColorMode('dark')
				const defaultTheme = createTheme({ themeScheme: 'dark', useSystemColorMode: false })
				ThemeReactiveVar({
					localStorageColorScheme: 'dark',
					colorScheme: 'dark',
					theme: defaultTheme,
				})
				return {
					localStorageColorScheme: 'dark',
					colorScheme: 'dark',
					theme: defaultTheme,
				}
		}
	}

	const toggleTheme = useCallback(async (props: Props) => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)

		const valueLocalStorageColorScheme = JSON.parse(String(localStorageColorScheme))

		if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
			const initialThemeColorSchemeState = JSON.stringify({
				colorScheme: 'system',
			})

			await AsyncStorage.setItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
				initialThemeColorSchemeState,
			)
		}
		const { theme, colorScheme } = setTheme({ colorScheme: props.colorScheme })
		return { theme, colorScheme }
	}, [])

	return [toggleTheme]
}
