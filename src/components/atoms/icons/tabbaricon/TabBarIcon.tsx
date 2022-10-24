import { useEffect } from 'react'
import * as React from 'react'
import styled from 'styled-components/native'

interface OuterViewStyleProps {
	height?: number
	width?: number
}

export interface TabBarIconProps {
	color: string
	value?: number
	icon?: React.ReactNode
	badge?: React.ReactNode
	containerStyle?: OuterViewStyleProps
}

export interface TabProps {
	color: string
}

const TabBarIcon = ({ icon, badge, containerStyle }: TabBarIconProps) => (
	<OuterView
		height={containerStyle?.height}
		width={containerStyle?.width}
		hitSlop={{ top: 10, bottom: 20, left: 20, right: 20 }}
	>
		{badge}
		{icon}
	</OuterView>
)

export default TabBarIcon

const OuterView = styled.View<OuterViewStyleProps>`
	height: ${props => (props.height ? `${props.height}px` : '100%')};
	width: ${props => (props.width ? `${props.width}px` : '100%')};
	justify-content: center;
	align-items: center;
`
