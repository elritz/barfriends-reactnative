import colors from './palette/colors'
import { extendTheme } from 'native-base'

const NativeBaseTheme = extendTheme({
	config: {
		useSystemColorMode: true,
	},
	colors,
})

export default NativeBaseTheme
