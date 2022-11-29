import { makeVar } from '@apollo/client'
import { ThemeColorSchemeOptionsType } from '@preferences'
import { DefaultTheme as RNDefaultTheme } from '@react-navigation/native'
import { ITheme } from 'native-base'
import { ColorSchemeName } from 'react-native'
import { DefaultTheme } from 'styled-components/native'

export type IBFSTheme = {
	styled: DefaultTheme
	rn: typeof RNDefaultTheme
	nb: ITheme
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeOptionsType
	colorScheme: ColorSchemeName
	theme: IBFSTheme | null
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	colorScheme: 'dark',
	theme: null,
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)
