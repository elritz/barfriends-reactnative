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
		// background={'red.400'}
		// borderColor={'black'}
		// borderWidth={1}
		// height={containerStyle?.height || '100%'}
		height={'40px'}
		width={containerStyle?.width || '100%'}
		// hitSlop={{ top: 20, bottom: 30, left: 0, right: 0 }}
		// paddingBottom={10}
		alignItems={'center'}
		justifyContent={'center'}
	>
		{/* {badge} */}
		{icon}
	</View>
)

export default TabBarIcon
