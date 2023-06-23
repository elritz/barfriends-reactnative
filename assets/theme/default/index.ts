import gluestack from './gluestack'
import nativebase from './nativebase'
import { DarkReactNavigationTheme, LightReactNavigationTheme } from './reactnavigation'

export const lighttheme = {
	gluestack: {
		colors: gluestack,
	},
	nativebase: {
		colors: nativebase,
	},
	rn: {
		colors: LightReactNavigationTheme,
	},
} as const

export const darktheme = {
	gluestack: {
		colors: gluestack,
	},
	nativebase: {
		colors: nativebase,
	},
	rn: {
		colors: DarkReactNavigationTheme,
	},
} as const

export const defaulttheme = {
	mobile: {
		light: lighttheme,
		dark: darktheme,
	},
}
