import { useSearchParams } from 'expo-router'
import { Box, ScrollView, Text } from 'native-base'

export default () => {
	const params = useSearchParams()
	return (
		<ScrollView>
			<Box safeAreaTop h={200} bg={'dark.50'}>
				<Text fontSize={'lg'} color={'warmGray.100'}>
					{params.profileid}
				</Text>
			</Box>
		</ScrollView>
	)
}