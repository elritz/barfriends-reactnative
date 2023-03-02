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
				background: {
					default: string
					dark: string
					light: string
					accent: string
				}
				color: {
					default: string
					dark: string
					light: string
					accent: string
				}
			}
			secondary: {
				background: {
					default: string
					dark: string
					light: string
					accent: string
				}
				color: {
					default: string
					dark: string
					light: string
					accent: string
				}
			}
			tertiary: {
				background: {
					default: string
					dark: string
					light: string
					accent: string
				}
				color: {
					default: string
					dark: string
					light: string
					accent: string
				}
			}
			quaternary: {
				background: {
					default: string
					dark: string
					light: string
					accent: string
				}
				color: {
					default: string
					dark: string
					light: string
					accent: string
				}
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
