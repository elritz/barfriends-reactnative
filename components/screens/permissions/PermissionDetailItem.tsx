import { Box, Text } from '@components/core'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default function PermissionDetailItem({ title, detail, icon }) {
	return (
		<Box px={'$1'} my={'$1'} style={{ flexDirection: 'row' }}>
			<Box justifyContent={'flex-start'} width={10}>
				{icon}
			</Box>
			<Box justifyContent={'flex-start'} flexDirection={'column'} width={wp(95)} flex={1}>
				<Text style={{ marginVertical: 5, fontSize: 18, fontWeight: '700' }}>{title}</Text>
				<Text fontSize={'$md'}>{detail}</Text>
			</Box>
		</Box>
	)
}
