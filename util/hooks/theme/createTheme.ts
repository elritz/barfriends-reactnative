import { DefaultTheme } from '@react-navigation/native';
import { AuthorizationReactiveVar, IBFSTheme } from '@reactive';
import { extendTheme } from 'native-base';
import { ColorSchemeName } from 'react-native';


type Props = {
	themeScheme: ColorSchemeName
	useSystemColorMode: Boolean
}

const createTheme = ({ themeScheme, useSystemColorMode }: Props): IBFSTheme => {
	const theme =
		AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0].Theme.mobile[0]
	const rnColors = () => {
		const rn = themeScheme === 'dark' ? theme.dark.rn.colors : theme.light.rn.colors

		console.log("🚀 ~ file: createTheme.ts:17 ~ rnColors ~ rn:", rn)

		return rn
	}

	const createNewNativeBaseTheme = () => {
		console.log(
			'🚀 ~ file: createTheme.ts:26 ~ createNewNativeBaseTheme ~ theme:',
			JSON.stringify(theme.light, null, 4),
		)
		const NativeBaseTheme = extendTheme({
			colors: themeScheme === 'dark' ? theme.dark.nativebase.colors : theme.light.nativebase.colors,




			config: {
				useSystemColorMode: useSystemColorMode,
				initialColorMode: themeScheme,
			},
		})

		console.log("🚀 ~ file: createTheme.ts:28 ~ createNewNativeBaseTheme ~ NativeBaseTheme:", NativeBaseTheme)


		return NativeBaseTheme
	}

	return {
		// styled: themeScheme === 'dark' ? theme.dark.styled : theme.light.styled,
		rn: {
			...DefaultTheme,
			dark: themeScheme === 'dark' ? true : false,
			colors: {
				...DefaultTheme.colors,
				...rnColors(),
			},
		},
		nb: { ...createNewNativeBaseTheme() },
	}
}

export default createTheme