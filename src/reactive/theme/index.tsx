import { makeVar } from '@apollo/client'
import { darktheme, lighttheme } from '@constants/theme/themes/default'
import { DefaultTheme as RNDefaultTheme } from '@react-navigation/native'
import { ICustomTheme, ITheme } from 'native-base'
import { ColorSchemeName } from 'react-native'
import { DefaultTheme } from 'styled-components/native'

export type ThemeColorSchemeType = 'light' | 'dark' | 'system'

type TLightTheme = typeof lighttheme
type TDarkTheme = typeof darktheme

export type IBFSTheme = {
	styled: DefaultTheme
	rn: typeof RNDefaultTheme
	nb: ITheme
}

export type ThemeColorSchemeParseType = {
	colorScheme: ThemeColorSchemeType
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeType
	colorScheme: ColorSchemeName
	theme: IBFSTheme | null
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	colorScheme: 'dark',
	theme: null,
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)
