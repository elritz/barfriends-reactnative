import NativeBaseTheme from './nativebase'
import ReactNativeElementsTheme from './rne'
import StyledTheme from './styled/light'

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
} as const

export default theme
