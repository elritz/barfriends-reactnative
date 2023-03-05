import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name={'personalstack'} />
			<Stack.Screen name={'venuestack'} />
		</Stack>
	)
}
