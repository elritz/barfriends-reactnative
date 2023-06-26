import { Config } from '../../assets/theme/default/gluestack-ui.config'
import { makeVar } from '@apollo/client'
import { ThemeColorSchemeOptionsType } from '@preferences'
import { DefaultTheme as RNDefaultTheme } from '@react-navigation/native'
import { ITheme } from 'native-base'
import { ColorSchemeName } from 'react-native'

export type IBFSTheme = {
	reactnavigation: typeof RNDefaultTheme
	nativebase: ITheme
	gluestack: Config
}

export interface ThemeInterface {
	localStorageColorScheme: ThemeColorSchemeOptionsType | null
	colorScheme: ColorSchemeName
	theme: IBFSTheme | null
}

export const ThemeEmptyState: ThemeInterface = {
	localStorageColorScheme: 'system',
	colorScheme: 'dark',
	theme: null,
}

export const ThemeReactiveVar = makeVar<ThemeInterface>(ThemeEmptyState)
