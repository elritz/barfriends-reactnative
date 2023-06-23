import NativeBaseTheme from './nativebase'
import { DarkReactNavigationTheme, LightReactNavigationTheme } from './reactnavigation'
import { DarkStyledTheme, LightStyledTheme } from './styled'

export const lighttheme = {
	styled: {
		...LightStyledTheme,
	},
	nativebase: {
		...NativeBaseTheme,
	},
	rn: {
		colors: LightReactNavigationTheme,
	},
} as const

export const darktheme = {
	styled: {
		...DarkStyledTheme,
	},
	nativebase: {
		...NativeBaseTheme,
	},
	rn: {
		colors: DarkReactNavigationTheme,
	},
} as const
