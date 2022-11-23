import createTheme from './createTheme'
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemeReactiveVar, AuthorizationReactiveVar } from '@reactive'
import { useColorMode } from 'native-base'
import { useCallback } from 'react'
import { useColorScheme } from 'react-native'

interface Props {
	colorScheme?: 'light' | 'system' | 'dark' | undefined
}

export const useToggleTheme = () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const { setColorMode } = useColorMode()
	const systemColorScheme = useColorScheme()

	const setTheme = ({ colorScheme }) => {
		switch (colorScheme) {
			case 'system':
				setColorMode(systemColorScheme)
				const sTheme = createTheme({ themeScheme: systemColorScheme })
				ThemeReactiveVar({
					colorScheme: 'system',
					theme: sTheme,
				})
				return { colorScheme: 'light', theme: sTheme }
			case 'light':
				setColorMode('light')
				const lTheme = createTheme({ themeScheme: 'light' })
				ThemeReactiveVar({
					colorScheme: 'light',
					theme: lTheme,
				})
				return { colorScheme: 'light', theme: lTheme }
			case 'dark':
				setColorMode('dark')
				const dTheme = createTheme({ themeScheme: 'dark' })
				ThemeReactiveVar({
					colorScheme: 'dark',
					theme: dTheme,
				})
				return {
					colorScheme: 'dark',
					theme: dTheme,
				}
			default:
				setColorMode('dark')
				const defaultTheme = createTheme({ themeScheme: 'dark' })
				ThemeReactiveVar({
					colorScheme: 'dark',
					theme: defaultTheme,
				})
				return {
					colorScheme: 'dark',
					theme: defaultTheme,
				}
		}
	}

	const toggleTheme = useCallback(async (props: Props) => {
		if (props.colorScheme) {
			const localStorageColorScheme = await AsyncStorage.getItem(
				LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
			)

			const valueLocalStorageColorScheme = JSON.parse(localStorageColorScheme)

			if (props.colorScheme !== valueLocalStorageColorScheme.colorScheme) {
				const initialThemeColorSchemeState = {
					colorScheme: props.colorScheme,
				}

				const newLocalStorageColorScheme = JSON.stringify(initialThemeColorSchemeState)

				await AsyncStorage.setItem(
					LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
					newLocalStorageColorScheme,
				)
			}
			const { theme, colorScheme } = setTheme({ colorScheme: props.colorScheme })
			return { theme, colorScheme }
		} else {
			const { theme, colorScheme } = setTheme({ colorScheme: rThemeVar.colorScheme })
			return { theme, colorScheme }
		}
	}, [])

	return [toggleTheme]
}
