import { Box, Icon, Text } from 'native-base'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function PermissionDetailItem({ title, detail, iconName, iconType }) {
	return (
		<Box px={1} my={1} style={{ flexDirection: 'row' }}>
			<Box justifyContent={'flex-start'} width={10}>
				<Icon size={25} as={iconType} name={iconName} />
			</Box>
			<Box justifyContent={'flex-start'} flexDirection={'column'} width={wp(95)} flex={1}>
				<Text style={{ marginVertical: 5, fontSize: 18, fontWeight: '700' }}>{title}</Text>
				<Text fontSize={'md'}>{detail}</Text>
			</Box>
		</Box>
	)
}
