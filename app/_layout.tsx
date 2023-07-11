//TODO: Add notfication listener
import { ApolloProvider } from '@apollo/client'
import client from '@library/gateway-apollo-server'
import { Logs } from 'expo'
import 'expo-dev-client'
import { SplashScreen, Stack } from 'expo-router'
import 'react-native-gesture-handler'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

SplashScreen.preventAutoHideAsync()

Logs.enableExpoCliLogging()

export default () => {
	return (
		<ApolloProvider client={client}>
			<Stack initialRouteName='(app)'>
				<Stack.Screen name='(error)' />
				<Stack.Screen name={'hometab'} />
				<Stack.Screen name={'explore'} options={{ animation: 'fade' }} />
				<Stack.Screen name={'modal'} />
				<Stack.Screen name={'public'} />
				<Stack.Screen name={'searcharea'} />
				<Stack.Screen name={'permission'} options={{ presentation: 'modal' }} />
				<Stack.Screen name={'settings'} options={{ presentation: 'fullScreenModal' }} />
			</Stack>
		</ApolloProvider>
	)
}
