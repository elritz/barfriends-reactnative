import { defaulttheme } from '@assets/theme/default'
import { DefaultTheme as ReactNavigationDefaultTheme } from '@react-navigation/native'
import { IBFSTheme } from '@reactive'
import { config, Config } from 'gluestack-ui.config'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
}

const createLocalDefaultTheme = ({ themeScheme }: Props): IBFSTheme => {
	const reactNavigationTheme =
		themeScheme === 'dark' ? defaulttheme.reactnavigation.dark : defaulttheme.reactnavigation.light

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

	return {
		reactnavigation: {
			...ReactNavigationDefaultTheme,
			dark: themeScheme === 'dark' ? true : false,
			colors: {
				...ReactNavigationDefaultTheme.colors,
				...reactNavigationTheme,
			},
		},
		gluestack: createGlueStackTheme,
	}
}

export default createLocalDefaultTheme
