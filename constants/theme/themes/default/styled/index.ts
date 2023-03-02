import { bfsCompanyColors } from '@constants/theme/barfriends'
import * as colors from '@constants/theme/colors'
import { darkCompanyColors, lightCompanyColors } from '@constants/theme/themes/default/colors'
import { DefaultTheme } from 'styled-components/native'

export const LightStyledTheme: DefaultTheme = {
	theme: 'light',
	palette: {
		bfscompany: {
			...bfsCompanyColors,
		},
		company: {
			...lightCompanyColors,
		},
		background: {
			paper: colors.grey[50],
		},
		primary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
		secondary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
		tertiary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
		quaternary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
	},
}

export const DarkStyledTheme: DefaultTheme = {
	theme: 'dark',
	palette: {
		bfscompany: {
			...bfsCompanyColors,
		},
		company: {
			...darkCompanyColors,
		},
		background: {
			paper: colors.grey[900],
		},
		primary: {
			background: {
				default: colors.grey[800],
				dark: colors.grey[900],
				light: colors.grey[300],
				accent: '#FF7000',
			},
			color: {
				default: colors.grey[100],
				dark: colors.grey[300],
				light: colors.grey[50],
				accent: '#FF7000',
			},
		},
		secondary: {
			background: {
				default: colors.grey[400],
				dark: colors.grey[800],
				light: colors.grey[300],
				accent: colors.blue.A400,
			},
			color: {
				default: colors.grey[100],
				dark: colors.grey[300],
				light: colors.grey[50],
				accent: '#FF7000',
			},
		},
		tertiary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
		quaternary: {
			background: {
				default: colors.grey[300],
				dark: colors.grey[300],
				light: colors.grey[300],
				accent: colors.grey[300],
			},
			color: {
				default: colors.grey[800],
				dark: colors.grey[800],
				light: colors.grey[800],
				accent: colors.grey[800],
			},
		},
	},
} as const
