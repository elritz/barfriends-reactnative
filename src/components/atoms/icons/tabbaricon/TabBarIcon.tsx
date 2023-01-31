import { View } from 'native-base'
import * as React from 'react'

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
	<View
		height={'45px'}
		width={containerStyle?.width || '100%'}
		alignItems={'center'}
		justifyContent={'center'}
	>
		{/* {badge} */}
		{icon}
	</View>
)

export default TabBarIcon
