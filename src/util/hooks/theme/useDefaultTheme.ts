import darkTheme from '@constants/theme/default/dark'
import lightTheme from '@constants/theme/default/light'
// import darkTheme from '@constants/theme/barstool/dark'
// import lightTheme from '@constants/theme/barstool/light'
import useColorScheme from '@util/hooks/device/useColorScheme'
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native'

type TLightTheme = typeof lightTheme
type TDarkTheme = typeof darkTheme

type ThemeReturnType = {
	themes: TDarkTheme | TLightTheme
}

export default function useDefaultTheme(): NonNullable<ColorSchemeName> {
	return _useColorScheme()
}

const useCustomTheme = (): boolean => {
	// if (localStorage.theme.length > 1) {
	// delete the theme in first of the array use the second one
	// setDefaultTheme(secindar theme in the array)
	// } else {
	// if(localStoreageTheme) {
	// check db for same theme and compare updatedAt values
	// query theme  {
	//   updateAt
	// }
	// if db.theme is newer then local storage then query rest of the theme and save it to local storage and set theme to app theme
	// }
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
				themes: lightTheme,
			}
		case 'CUSTOM-dark':
			return {
				themes: darkTheme,
			}
		case 'DEFAULT-light':
			return {
				themes: lightTheme,
			}
		case 'DEFAULT-dark':
			return {
				themes: darkTheme,
			}
		default:
			return {
				themes: lightTheme,
			}
	}
}

export { setDefaultTheme }
