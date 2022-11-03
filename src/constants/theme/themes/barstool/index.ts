import NativeBaseTheme from './nativebase'
import { LightStyledTheme, DarkStyledTheme } from './styled'
import { DefaultTheme } from '@react-navigation/native'

export const lighttheme = {
	styled: {
		...LightStyledTheme,
	},
	nativebase: {
		...NativeBaseTheme,
	},
	rn: {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: DarkStyledTheme.palette.primary.background.default,
			primary: DarkStyledTheme.palette.company.primary,
			card: DarkStyledTheme.palette.secondary.background.default,
			text: DarkStyledTheme.palette.primary.color.default,
			border: DarkStyledTheme.palette.primary.color.default,
			notification: DarkStyledTheme.palette.company.tertiary,
		},
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
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: LightStyledTheme.palette.primary.background.default,
			primary: LightStyledTheme.palette.company.primary,
			card: LightStyledTheme.palette.secondary.background.default,
			text: LightStyledTheme.palette.primary.color.default,
			border: LightStyledTheme.palette.primary.color.default,
			notification: LightStyledTheme.palette.company.tertiary,
		},
	},
} as const
