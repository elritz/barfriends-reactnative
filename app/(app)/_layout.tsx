// import { config } from '../../gluestack-ui.config'
import { Stack } from 'expo-router'

export default () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name={'hometab'} />
			<Stack.Screen name={'modal'} />
			<Stack.Screen name={'public'} />
			<Stack.Screen name={'searcharea'} options={{ presentation: 'fullScreenModal' }} />
			<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
			<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
		</Stack>
	)
}
