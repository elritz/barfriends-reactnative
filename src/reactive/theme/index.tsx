import { makeVar } from '@apollo/client'
import { darktheme, lighttheme } from '@constants/theme/themes/default'
import { DefaultTheme as RNDefaultTheme } from '@react-navigation/native'
import { ICustomTheme, ITheme } from 'native-base'
import { DefaultTheme } from 'styled-components/native'

export enum ThemeColorScheme {
	light = 'light',
	dark = 'dark',
	system = 'system',
}

type TLightTheme = typeof lighttheme
type TDarkTheme = typeof darktheme

export type IBFSTheme = {
	styled: DefaultTheme
	rn: typeof RNDefaultTheme
	nb: ITheme
}

export interface ThemeInterface {
	colorScheme: 'light' | 'dark' | 'system'
	theme: IBFSTheme | null
}

export const ThemeEmptyState: ThemeInterface = {
	colorScheme: 'system',
	theme: null,
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)
