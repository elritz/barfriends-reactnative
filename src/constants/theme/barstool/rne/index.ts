import { lightCompanyColors, darkCompanyColors } from '@constants/theme/barstool'
import { createTheme } from '@rneui/themed'

const ReactNativeElementsTheme = createTheme({
	lightColors: {
		primary: lightCompanyColors.primary,
		secondary: lightCompanyColors.secondary,
	},
	darkColors: {
		primary: darkCompanyColors.primary,
		secondary: darkCompanyColors.secondary,
	},
	mode: 'light',
})

export default ReactNativeElementsTheme
