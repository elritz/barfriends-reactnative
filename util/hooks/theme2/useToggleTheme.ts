import createTheme from './createTheme'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeReactiveVar, AuthorizationReactiveVar } from '@reactive'
import { useColorMode } from 'native-base'
import { useCallback } from 'react'
import { Appearance } from 'react-native'

type Props = {
	colorScheme?: ThemeColorSchemeOptionsType
}

export const useToggleTheme = () => {
	const { setColorMode } = useColorMode()

	const setTheme = ({ colorScheme }: Props) => {
		switch (colorScheme) {
			case 'system':
				const deviceColorScheme = Appearance.getColorScheme()
				setColorMode(deviceColorScheme)
				const sTheme = createTheme({ themeScheme: deviceColorScheme })
				ThemeReactiveVar({
					localStorageColorScheme: 'system',
					colorScheme: deviceColorScheme,
					theme: sTheme,
				})
				return { localStorageColorScheme: 'system', colorScheme: deviceColorScheme, theme: sTheme }
			case 'light':
				setColorMode('light')
				const lTheme = createTheme({ themeScheme: 'light' })

				ThemeReactiveVar({
					localStorageColorScheme: 'light',
					colorScheme: 'light',
					theme: lTheme,
				})

				return { localStorageColorScheme: 'light', colorScheme: 'light', theme: lTheme }
			case 'dark':
				setColorMode('dark')
				const dTheme = createTheme({ themeScheme: 'dark' })
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
				const defaultTheme = createTheme({ themeScheme: 'dark' })
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

		// check if we need to update local storage with new ColorScheme value
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
	
	const toggleColorScheme = useCallback(async (props: Props) => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)

		const valueLocalStorageColorScheme = JSON.parse(String(localStorageColorScheme))

		// check if we need to update local storage with new ColorScheme value
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
