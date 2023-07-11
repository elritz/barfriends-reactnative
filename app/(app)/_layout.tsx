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
			<Stack.Screen name={'explore'} options={{ animation: 'fade' }} />
			<Stack.Screen name={'modal'} />
			<Stack.Screen name={'public'} />
			<Stack.Screen name={'searcharea'} options={{ animation: 'fade' }}  />
			<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
			<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
		</Stack>
	)
}
