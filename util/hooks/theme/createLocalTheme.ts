import { defaulttheme } from '@assets/theme/default'
import { config, Config } from 'gluestack-ui.config'
import { DefaultTheme as ReactNavigationDefaultTheme } from '@react-navigation/native'
import { IBFSTheme } from '@reactive'
import { extendTheme } from 'native-base'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
}

const createLocalDefaultTheme = ({ themeScheme }: Props): IBFSTheme => {
	const createNewNativeBaseTheme = () => {
		return extendTheme({
			colors: themeScheme === 'dark' ? defaulttheme.nativebase : defaulttheme.nativebase,

			config: {
				useSystemColorMode: themeScheme !== 'dark' && themeScheme !== 'light' ? true : false,
				initialColorMode: themeScheme,
			},
		})
	}

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
		nativebase: { ...createNewNativeBaseTheme() },
	}
}

export default createLocalDefaultTheme
