import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'

const ReactNavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: themeContext.palette.primary.background,
		primary: themeContext.palette.company.primary,
		card: themeContext.palette.secondary.background,
		text: themeContext.palette.primary.color.primary,
		border: themeContext.palette.primary.color.secondary,
		notification: themeContext.palette.company.tertiary,
	},
}

export default Navigator
