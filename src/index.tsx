import { ApolloProvider } from '@apollo/client'
import {
	BACKGROUND_NOTIFICATION_TASK,
	DEVELOPMENT_FOREGROUND_GEOFENCING_TASK_NAME,
} from '@constants/TaskManagerConstants'
import gateaWayClient from '@library/gateway-apollo-server'
import Navigation from '@navigation/index'
import 'expo-dev-client'
import { GeofencingEventType } from 'expo-location'
import * as Notifications from 'expo-notifications'
import * as TaskManager from 'expo-task-manager'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

export default function App() {
	// useEffect(() => {
	// 	const subscription = Notifications.addNotificationResponseReceivedListener(response => {
	// 		const url = response.notification.request.content.data.url
	// 		console.log('🚀 -------------------------------------------------🚀')
	// 		console.log('🚀 ~ file: index.tsx:112 ~ subscription ~ url', url)
	// 		console.log('🚀 -------------------------------------------------🚀')

	// 		Linking.openURL(url)
	// 	})
	// 	return () => subscription.remove()
	// }, [])

	return (
		<SafeAreaProvider>
			<KeyboardProvider statusBarTranslucent>
				<ApolloProvider client={gateaWayClient}>
					<Navigation />
				</ApolloProvider>
			</KeyboardProvider>
		</SafeAreaProvider>
	)
}
