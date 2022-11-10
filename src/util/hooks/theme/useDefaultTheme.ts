import createTheme from './createTheme'
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE } from '@constants/StorageConstants'
import { darktheme, lighttheme } from '@constants/theme/themes/default'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthorizationReactiveVar, ThemeInterface, ThemeReactiveVar } from '@reactive'
import useColorScheme from '@util/hooks/device/useColorScheme'
import { useEffect, useState } from 'react'
import { useColorScheme as _useColorScheme } from 'react-native'

function useDefaultTheme() {
	const colorScheme = useColorScheme()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [loading, setLoading] = useState<boolean>(true)

	const dataTheme = rAuthorizationVar.DeviceProfile.Profile.ThemeManager.activeTheme.mobile[0]

	const themeDefault = async () => {
		const getLocalStorageTheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
		)
		const parseLocalStorageTheme: ThemeInterface = JSON.parse(getLocalStorageTheme)

		switch (rThemeVar.colorScheme) {
			case 'system':
				const sTheme = createTheme({ themeScheme: colorScheme, theme: dataTheme })
				ThemeReactiveVar({
					colorScheme: parseLocalStorageTheme.colorScheme,
					theme: sTheme,
				})
				break
			case 'light':
				const lTheme = createTheme({ themeScheme: 'light', theme: dataTheme })
				ThemeReactiveVar({
					colorScheme: parseLocalStorageTheme.colorScheme,
					theme: lTheme,
				})
				break
			case 'dark':
				const dTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
				ThemeReactiveVar({
					colorScheme: parseLocalStorageTheme.colorScheme,
					theme: dTheme,
				})
				break
			default:
				const defaultTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
				ThemeReactiveVar({
					...rThemeVar,
					colorScheme: parseLocalStorageTheme.colorScheme,
					theme: defaultTheme,
				})
		}
		setLoading(false)
	}

	useEffect(() => {
		themeDefault()
	}, [])

	return { loading, theme: rThemeVar.theme }
}

export default useDefaultTheme
