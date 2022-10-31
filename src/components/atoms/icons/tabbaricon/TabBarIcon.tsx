import { Pressable, View } from 'native-base'
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
		height={containerStyle?.height || '100%'}
		width={containerStyle?.width || '100%'}
		hitSlop={{ top: 20, bottom: 30, left: 20, right: 20 }}
		alignItems={'center'}
		justifyContent={'center'}
	>
		{/* {badge} */}
		{icon}
	</View>
)

export default TabBarIcon
