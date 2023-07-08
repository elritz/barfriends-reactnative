import createTheme from './createTheme'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { LocalStoragePreferenceThemeType, ThemeColorSchemeOptionsType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeReactiveVar, IBFSTheme, ThemeInterface } from '@reactive'
import { useCallback } from 'react'
import { Appearance, ColorSchemeName } from 'react-native'

type Props = {
	colorScheme?: ThemeColorSchemeOptionsType
}

type ToggleThemeReturnType = {
	localStorageColorScheme: 'system'
	colorScheme: ColorSchemeName
	theme: IBFSTheme
}

export const useToggleTheme = () => {
	// const { setColorMode } = useColorMode()

	const setTheme = ({ colorScheme }: Props): ThemeInterface => {
		switch (colorScheme) {
			case 'system':
				const deviceColorScheme = Appearance.getColorScheme()
				// setColorMode(deviceColorScheme)
				const sTheme = createTheme({ themeScheme: deviceColorScheme })
				ThemeReactiveVar({
					localStorageColorScheme: 'system',
					colorScheme: deviceColorScheme,
					theme: sTheme,
				})
				return { localStorageColorScheme: 'system', colorScheme: deviceColorScheme, theme: sTheme }
			case 'light':
				// setColorMode('light')
				const lTheme = createTheme({ themeScheme: 'light' })

				ThemeReactiveVar({
					localStorageColorScheme: 'light',
					colorScheme: 'light',
					theme: lTheme,
				})

				return { localStorageColorScheme: 'light', colorScheme: 'light', theme: lTheme }
			case 'dark':
				// setColorMode('dark')
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
				// setColorMode('dark')
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

	const toggleTheme = useCallback(async (props: Props): Promise<ThemeInterface> => {
		const getLocalStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)

		if (!getLocalStorageColorScheme) {
			const initialThemeColorSchemeState = JSON.stringify({
				colorScheme: 'system',
			} as LocalStoragePreferenceThemeType)

			await AsyncStorage.setItem(
				LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
				initialThemeColorSchemeState,
			)

			const { theme, colorScheme, localStorageColorScheme } = setTheme({
				colorScheme: 'system',
			})
			return { theme, colorScheme, localStorageColorScheme }
		} else {
			const valueLocalStorageColorScheme = JSON.parse(String(getLocalStorageColorScheme))
			// check if we need to update local storage with new ColorScheme value
			if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
				const initialThemeColorSchemeState = JSON.stringify({
					colorScheme: props.colorScheme,
				})

				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
					initialThemeColorSchemeState,
				)
			}

			const { theme, colorScheme, localStorageColorScheme } = setTheme({
				colorScheme: props.colorScheme,
			})
			return { theme, colorScheme, localStorageColorScheme }
		}
	}, [])

	return [toggleTheme]
}
