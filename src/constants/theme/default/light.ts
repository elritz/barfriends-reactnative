import NativeBaseTheme from './nativebase'
import ReactNativeElementsTheme from './rne'
import StyledTheme from './styled/light'
import { DefaultTheme } from '@react-navigation/native'

const theme = {
	styled: {
		...StyledTheme,
	},
	rne: {
		...ReactNativeElementsTheme,
	},
	nativebase: {
		...NativeBaseTheme,
	},
	rn: {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: StyledTheme.palette.primary.background,
			primary: StyledTheme.palette.company.primary,
			card: StyledTheme.palette.secondary.background,
			text: StyledTheme.palette.primary.color.primary,
			border: StyledTheme.palette.primary.color.secondary,
			notification: StyledTheme.palette.company.tertiary,
		},
	},
} as const

export default theme
