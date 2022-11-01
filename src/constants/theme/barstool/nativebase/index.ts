import colors from './palette/colors'
import { extendTheme } from 'native-base'

const NativeBaseTheme = extendTheme({
	colors,
	config: {
		useSystemColorMode: true,
	},
})

export default NativeBaseTheme
