import { Box, Icon, Text } from 'native-base'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function PermissionDetailItem({ title, detail, iconName, iconType }) {
	return (
		<Box marginY={1} style={{ flexDirection: 'row', height: 'auto' }}>
			<Box justifyContent={'flex-start'} width={60}>
				<Icon size={25} as={iconType} name={iconName} />
			</Box>
			<Box justifyContent={'flex-start'} flexDirection={'column'} width={wp(95) - 60} height={'auto'}>
				<Text style={{ marginVertical: 5, fontSize: 18, fontWeight: '700' }}>{title}</Text>
				<Text style={{ fontSize: 17 }}>{detail}</Text>
			</Box>
		</Box>
	)
}
