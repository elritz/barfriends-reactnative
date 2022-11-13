import { DefaultTheme } from '@react-navigation/native'
import { AuthorizationReactiveVar, IBFSTheme } from '@reactive'
import { extendTheme } from 'native-base'

type Props = {
	themeScheme: 'light' | 'dark'
}

const createTheme = ({ themeScheme }: Props): IBFSTheme => {
	const theme =
		AuthorizationReactiveVar().DeviceProfile.Profile.ThemeManager.ProfileTheme.Theme.mobile[0]
	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.dark.rn.colors : theme.light.rn.colors
		return rn
	}

	const createNewNativeBaseTheme = () => {
		const NativeBaseTheme = extendTheme({
			colors: themeScheme === 'dark' ? theme.dark.nativebase.colors : theme.light.nativebase.colors,
			config: {
				useSystemColorMode: false,
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
