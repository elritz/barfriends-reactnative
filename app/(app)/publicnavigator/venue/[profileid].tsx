import { useSearchParams } from 'expo-router'
import { Box, Text } from 'native-base'

export default () => {
	const params = useSearchParams()

	console.log('🚀 ~ file: (profileid).tsx:7 ~ params:', params.profileid)

	return (
		<Box flex={1} justifyContent={'center'} alignItems={'center'}>
			<Text>{params.profileid}</Text>
		</Box>
	)
}
