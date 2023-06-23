import { config, Config } from './../../../gluestack-ui.config'
import { defaulttheme } from '@assets/theme/default'
import { DefaultTheme as ReactNavigationDefaultTheme } from '@react-navigation/native'
import { IBFSTheme } from '@reactive'
import { extendTheme } from 'native-base'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
	useSystemColorMode: Boolean
}

const createLocalDefaultTheme = ({ themeScheme }: Props): IBFSTheme => {
	const createNewNativeBaseTheme = () => {
		return extendTheme({
			colors:
				themeScheme === 'dark'
					? defaulttheme.mobile.dark.nativebase.colors
					: defaulttheme.mobile.light.nativebase.colors,

			config: {
				useSystemColorMode: themeScheme !== 'dark' && themeScheme !== 'light' ? true : false,
				initialColorMode: themeScheme,
			},
		})
	}

	const reactNavigationTheme =
		themeScheme === 'dark' ? defaulttheme.mobile.dark.rn.colors : defaulttheme.mobile.light.rn.colors
		
	const createGlueStackTheme: Config = {
		...config,
		aliases: {
			...config.theme.aliases,
		},
		tokens: {
			...config.theme.tokens,
			colors: {
				...config.theme.tokens.colors,
				...defaulttheme.mobile.dark.gluestack,
			},
		},
	}

	return {
		rn: {
			...ReactNavigationDefaultTheme,
			dark: themeScheme === 'dark' ? true : false,
			colors: {
				...ReactNavigationDefaultTheme.colors,
				...reactNavigationTheme,
			},
		},
		gluestack: createGlueStackTheme,
		nb: { ...createNewNativeBaseTheme() },
	}
}

export default createLocalDefaultTheme
