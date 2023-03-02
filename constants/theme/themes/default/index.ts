import NativeBaseTheme from './nativebase'
import { DarkStyledTheme, LightStyledTheme } from './styled'
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
			background: LightStyledTheme.palette.primary.background.default,
			primary: LightStyledTheme.palette.company.primary,
			card: LightStyledTheme.palette.secondary.background.default,
			text: LightStyledTheme.palette.primary.color.default,
			border: LightStyledTheme.palette.primary.color.default,
			notification: LightStyledTheme.palette.company.tertiary,
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
			background: DarkStyledTheme.palette.primary.background.default,
			primary: DarkStyledTheme.palette.company.primary,
			card: DarkStyledTheme.palette.secondary.background.default,
			text: DarkStyledTheme.palette.primary.color.default,
			border: DarkStyledTheme.palette.primary.color.default,
			notification: DarkStyledTheme.palette.company.tertiary,
		},
	},
} as const

export const theme = ({ theme }) => {
	return {
		nativebase: {
			...NativeBaseTheme,
		},
		styled: theme === 'dark' ? { ...DarkStyledTheme } : { ...LightStyledTheme },
		rn: {
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				background:
					theme === 'dark'
						? DarkStyledTheme.palette.primary.background.default
						: LightStyledTheme.palette.primary.background.default,
				primary:
					theme === 'dark'
						? DarkStyledTheme.palette.company.primary
						: LightStyledTheme.palette.company.primary,
				card:
					theme === 'dark'
						? DarkStyledTheme.palette.secondary.background.default
						: LightStyledTheme.palette.secondary.background.default,
				text:
					theme === 'dark'
						? DarkStyledTheme.palette.primary.color.default
						: LightStyledTheme.palette.primary.color.default,
				border:
					theme === 'dark'
						? DarkStyledTheme.palette.primary.color.default
						: LightStyledTheme.palette.primary.color.default,
				notification:
					theme === 'dark'
						? DarkStyledTheme.palette.company.tertiary
						: LightStyledTheme.palette.company.tertiary,
			},
		},
	}
}
