import { Stack } from 'expo-router'

export default function _layout() {
	return (
		<Stack
			initialRouteName='termsandservicescreen'
			screenOptions={{
				headerShown: true,
				headerTransparent: true,
			}}
		>
			<Stack.Screen name={'getstarted'} />
		</Stack>
	)
}
