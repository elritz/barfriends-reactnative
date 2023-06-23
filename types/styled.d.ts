import ltheme from '@constants/theme/themes/default'
import dtheme from '@constants/theme/themes/default/dark'
import 'styled-components/native'

export type ThemeType = typeof ltheme.styled

declare module 'styled-components/native' {
	export interface DefaultTheme {
		theme: 'dark' | 'light'
		palette: {
			bfscompany: {
				primary: string
				secondary: string
				tertiary: string
				accent: string
				soft: {
					primary: string
					secondary: string
					tertiary: string
				}
			}
			company: {
				primary: string
				secondary: string
				tertiary: string
				accent: string
				soft: {
					primary: string
					secondary: string
					tertiary: string
				}
			}
			background: {
				paper: string
			}
			primary: {
				background: string
				color: string
			}
			secondary: {
				background: string
				color: string
			}
			tertiary: {
				background: string
				color: string
			}
		}
	}
}
export interface DynamicIllustrationProps {
	width?: number
	height?: number
	primary?: string
	secondary?: string
	tertiary?: string
	sPrimary?: string
	sSecondary?: string
	sTertiary?: string
	accent?: string
}
