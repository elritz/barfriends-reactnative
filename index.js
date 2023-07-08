import { ApolloProvider } from '@apollo/client'
import client from '@library/gateway-apollo-server'
import { Logs, registerRootComponent } from 'expo'
import { ExpoRoot, SplashScreen } from 'expo-router'
import { LogBox } from 'react-native'

SplashScreen.preventAutoHideAsync()

Logs.enableExpoCliLogging()
LogBox.ignoreLogs(['When server rendering'])

// Must be exported or Fast Refresh won't update the context
export function App() {
	const ctx = require.context('./app')
	return (
		<ApolloProvider client={client}>
			<ExpoRoot context={ctx} />
		</ApolloProvider>
	)
}

registerRootComponent(App)
