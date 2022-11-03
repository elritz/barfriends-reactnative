import colors from './palette/colors'
import { theme, extendTheme } from 'native-base'

const NativeBaseTheme = extendTheme({
	...theme,
	colors,
	config: {
		useSystemColorMode: true,
	},

	components: {
		Button: {
			baseStyle: {
				rounded: 13,
			},
		},
	},
})

export default NativeBaseTheme
