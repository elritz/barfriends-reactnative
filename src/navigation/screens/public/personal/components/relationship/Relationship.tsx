import { Box, Heading } from 'native-base'
import { View, Text } from 'react-native'

export default function Relationship() {
	return (
		<Box
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
			borderRadius={'xl'}
			flex={1}
			p={3}
		>
			<Heading>Relationship</Heading>
		</Box>
	)
}
