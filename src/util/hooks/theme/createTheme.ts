import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, IBFSTheme } from '@reactive'
import { extendTheme } from 'native-base'
import { ColorSchemeName } from 'react-native'

type Props = {
	themeScheme: ColorSchemeName
	useSystemColorMode: Boolean
}

const createTheme = ({ themeScheme, useSystemColorMode }: Props): IBFSTheme => {
	const theme =
		AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme?.Theme.mobile[0]

	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.dark.rn.colors : theme.light.rn.colors
		return rn
	}

	const createNewNativeBaseTheme = () => {
		const NativeBaseTheme = extendTheme({
			colors: themeScheme === 'dark' ? theme.dark.nativebase.colors : theme.light.nativebase.colors,
			config: {
				useSystemColorMode: useSystemColorMode,
				initialColorMode: themeScheme,
			},
			components: {
				Button: {
					baseStyle: {
						rounded: 13,
					},
				},
			},
		})

		return NativeBaseTheme
	}

	return {
		styled: themeScheme === 'dark' ? theme.dark.styled : theme.light.styled,
		rn: {
			...DefaultTheme,
			dark: themeScheme === 'dark',
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		nb: { ...createNewNativeBaseTheme() },
	}
}

export default createTheme
