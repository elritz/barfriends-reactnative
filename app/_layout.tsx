//TODO: Add notfication listener
import { ApolloProvider } from '@apollo/client'
import Theme from '@components/layouts/Theme'
import client from '@library/gateway-apollo-server'
import { Logs } from 'expo'
import 'expo-dev-client'
import { Slot, SplashScreen } from 'expo-router'
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
			<Theme>
				<Slot />
			</Theme>
		</ApolloProvider>
	)
}
