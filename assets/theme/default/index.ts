import { darkCompanyColors, lightCompanyColors } from './colors'
import gluestack from './gluestack'
import nativebase from './nativebase'
import { DarkReactNavigationTheme, LightReactNavigationTheme } from './reactnavigation'

export const defaulttheme = {
	barfriends: {
		light: lightCompanyColors,
		dark: darkCompanyColors,
	},
	gluestack,
	nativebase,
	reactnavigation: {
		light: LightReactNavigationTheme,
		dark: DarkReactNavigationTheme,
	},
} as const
