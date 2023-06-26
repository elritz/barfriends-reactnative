import gluestack from './gluestack'
import nativebase from './nativebase'
import { DarkReactNavigationTheme, LightReactNavigationTheme } from './reactnavigation'

export const defaulttheme = {
	gluestack,
	nativebase,
	reactnavigation: {
		light: LightReactNavigationTheme,
		dark: DarkReactNavigationTheme,
	},
} as const
