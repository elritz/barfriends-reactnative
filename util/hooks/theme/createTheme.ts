import { Config, config } from '../../../gluestack-ui.config'
import { defaulttheme } from '@assets/theme/default'
import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, IBFSTheme } from '@reactive'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
}

const createTheme = ({ themeScheme }: Props): IBFSTheme => {
	const theme =
		AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].Theme.theme ||
		defaulttheme

	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.reactnavigation.dark : theme.reactnavigation.light
		return rn
	}

	const createGlueStackTheme: Config = {
		...config,
		aliases: {
			...config.theme.aliases,
		},
		tokens: {
			...config.theme.tokens,
			colors: {
				...config.theme.tokens.colors,
				...defaulttheme.gluestack,
			},
		},
	}

	const newTheme = {
		reactnavigation: {
			...DefaultTheme,
			dark: themeScheme === 'dark' ? true : false,
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		gluestack: createGlueStackTheme,
	}

	return newTheme
}

export default createTheme
