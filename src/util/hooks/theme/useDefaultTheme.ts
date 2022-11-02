// import darkTheme from '@constants/theme/default/dark'
import { darktheme, lighttheme } from '@constants/theme/themes/default'
// import { darktheme, lighttheme } from '@constants/theme/themes/barstool'
import useColorScheme from '@util/hooks/device/useColorScheme'
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native'

type TLightTheme = typeof lighttheme
type TDarkTheme = typeof darktheme

type ThemeReturnType = {
	themes: TDarkTheme | TLightTheme
}

export default function useDefaultTheme(): NonNullable<ColorSchemeName> {
	return _useColorScheme()
}

const useCustomTheme = (): boolean => {
	return false
}

const setDefaultTheme = (): ThemeReturnType => {
	const isCustomTheme = useCustomTheme()
	const colorScheme = useColorScheme()

	let DefaultTheme = ''

	if (!isCustomTheme) {
		if (colorScheme === 'dark') {
			DefaultTheme = 'DEFAULT-dark'
		} else {
			DefaultTheme = 'DEFAULT-light'
		}
	} else {
		if (colorScheme === 'dark') {
			DefaultTheme = 'CUSTOM-dark'
		} else {
			DefaultTheme = 'CUSTOM-light'
		}
	}

	switch (DefaultTheme) {
		case 'CUSTOM-light':
			return {
				themes: lighttheme,
			}
		case 'CUSTOM-dark':
			return {
				themes: darktheme,
			}
		case 'DEFAULT-light':
			return {
				themes: lighttheme,
			}
		case 'DEFAULT-dark':
			return {
				themes: darktheme,
			}
		default:
			return {
				themes: lighttheme,
			}
	}
}

export { setDefaultTheme }
