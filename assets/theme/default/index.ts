import { darkCompanyColors, lightCompanyColors } from './colors'
import gluestack from './gluestack'
import { DarkReactNavigationTheme, LightReactNavigationTheme } from './reactnavigation'

export const defaulttheme = {
	barfriends: {
		light: lightCompanyColors,
		dark: darkCompanyColors,
	},
	gluestack,
	reactnavigation: {
		light: LightReactNavigationTheme,
		dark: DarkReactNavigationTheme,
	},
} as const
