import { Config } from '../../gluestack-ui.config'
import { makeVar } from '@apollo/client'
import { ThemeColorSchemeOptionsType } from '@preferences'
import { DefaultTheme as RNDefaultTheme } from '@react-navigation/native'
import { ColorSchemeName } from 'react-native'

export type IBFSTheme = {
	reactnavigation: typeof RNDefaultTheme
	gluestack: Config
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeOptionsType | null
	colorScheme: ColorSchemeName
	deviceColorScheme: ColorSchemeName
	theme: IBFSTheme | null
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	deviceColorScheme: 'dark',
	colorScheme: 'dark',
	theme: null,
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)
