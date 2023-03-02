import nativebasecolors from '@constants/theme/themes/barstool/nativebase/palette/colors'
import { extendTheme } from 'native-base'

const NativeBaseTheme = extendTheme({
	colors: nativebasecolors,
	config: {
		useSystemColorMode: true,
	},
})

export default NativeBaseTheme
