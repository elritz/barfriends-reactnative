import dtheme from '@constants/theme/default/dark'
import ltheme from '@constants/theme/default/light'
import 'styled-components/native'

export type ThemeType = typeof ltheme.styled

declare module 'styled-components/native' {
	export interface DefaultTheme extends ThemeType {
		ltheme
	}
}

export type SoftType = {
	primary?: string
	secondary?: string
	tertiary?: string
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
