import { useReactiveVar } from '@apollo/client'
// import darkTheme from '@constants/theme/default/dark'
import { LOCAL_STORAGE_DEFAULT_THEME, LOCAL_STORAGE_THEME } from '@constants/StorageConstants'
import { bfsCompanyColors } from '@constants/theme/barfriends'
import * as colors from '@constants/theme/colors'
import { lightCompanyColors } from '@constants/theme/themes/barstool/colors'
import { darktheme, lighttheme } from '@constants/theme/themes/default'
import { darkCompanyColors } from '@constants/theme/themes/default/colors'
import nativebasecolors from '@constants/theme/themes/default/nativebase/palette/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme, Theme } from '@react-navigation/native'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
// import { darktheme, lighttheme } from '@constants/theme/themes/barstool'
import useColorScheme from '@util/hooks/device/useColorScheme'
import { extendTheme, ICustomTheme, ITheme, theme as nativeBaseTheme } from 'native-base'
import { useState, useEffect } from 'react'
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native'
import { DefaultTheme as SCDefaultTheme } from 'styled-components/native'

const dataNativeBaseColors = {
	primary: {
		50: '#ffefdb',
		100: '#ffd3ae',
		200: '#ffb77e',
		300: '#ff9b4c',
		400: '#ff7e1a',
		500: '#ff8111',
		600: '#ff7000',
		700: '#813700',
		800: '#4f2100',
		900: '#200800',
	},
	secondary: {
		50: '#f2f2f2',
		100: '#d9d9d9',
		200: '#bfbfbf',
		300: '#a6a6a6',
		400: '#8c8c8c',
		500: '#737373',
		600: '#595959',
		700: '#404040',
		800: '#262626',
		900: '#0d0d0d',
	},
	tertiary: {
		50: '#def0ff',
		100: '#afcfff',
		200: '#7dafff',
		300: '#4b8fff',
		400: '#1a6fff',
		500: '#0056e6',
		600: '#0043b4',
		700: '#003082',
		800: '#001d51',
		900: '#000a21',
	},
}

type TLightTheme = typeof lighttheme
type TDarkTheme = typeof darktheme

type ThemeReturnType = {
	themes: TDarkTheme | TLightTheme
}

enum ThemeScheme {
	LIGHT = 'light',
	DARK = 'dark',
	SYSTEM = 'system',
}

type SCDEfaultT = {
	light: SCDefaultTheme
	dark: SCDefaultTheme
}

type LocalStorageThemeType = {
	colorScheme: 'light' | 'dark' | 'system'
	theme: {
		themeId: string
		nb: ITheme
		styled: SCDEfaultT
		rn: Theme
	}
	createdAt: string
	updatedAt: string
	startDate?: string
	endDate?: string
}

type DataThemeType = {
	appVersion: string
	themeId: string
	nb: { colors: ICustomTheme }
	styled: SCDEfaultT
	rn: Theme
	createdAt: string
	updatedAt: string
	startDate?: string
	endDate?: string
}

const useCurrentTheme = () => {
	const defaultThemeScheme = 'dark'
	const [currentThemes, setCurrentThemes] = useState<ThemeReturnType>()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	useEffect(() => {}, [rAuthorizationVar])

	return currentThemes
}

export { useCurrentTheme }
