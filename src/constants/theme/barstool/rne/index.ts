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
	components: {
		Button: {
			buttonStyle: {
				borderRadius: 13,
				height: 45,
			},
			containerStyle: {
				borderRadius: 13,
			},
		},
	},
	mode: 'light',
})

export default ReactNativeElementsTheme
