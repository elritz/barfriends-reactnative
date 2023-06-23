import nativebasecolors from '@constants/theme/default/nativebase/palette/colors'
import { theme, extendTheme } from 'native-base'

const NativeBaseTheme = extendTheme({
	colors: nativebasecolors,
	config: {
		useSystemColorMode: false,
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
