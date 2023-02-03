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

// import { QueryClient, QueryClientProvider } from 'react-query'

// TODO: FN(Background or foreground location tracking) - need to setup the application to optimize around apps fn performance

// const queryClient = new QueryClient()
// Define the background task for location tracking
// TaskManager.defineTask(
// 	DEVELOPMENT_FOREGROUND_GEOFENCING_TASK_NAME,
// 	async ({ data, error }: any) => {
// 		if (error) {
// 			console.error(error)
// 			return
// 		}
// 		if (data.eventType === GeofencingEventType.Enter) {
// 			// console.log(TODO:"You've entered region:", data.region)
// 			// console.log("TODO:You've entered region:", data)
// 			// Alert.alert('You have entered a region', `${data.region.identifier}`, [
// 			// 	{
// 			// 		text: 'Cancel',
// 			// 		onPress: () => null,
// 			// 		style: 'cancel',
// 			// 	},
// 			// 	{ text: 'ok', style: 'destructive' },
// 			// ])
// 			console.log('🚀 ~ file: index.tsx ~ line 40 ~ TaskManager.defineTask ~ data', data)
// 		} else if (data.eventType === GeofencingEventType.Exit) {
// 			console.log('🚀 ~ file: index.tsx ~ line 40 ~ TaskManager.defineTask ~ data', data)
// 			// console.log("TODO:You've left region:")
// 			// Alert.alert('You have Left a region', `SOMETHING HAS TO BE DONE${data.region.identifier}`, [
// 			// 	{
// 			// 		text: 'Cancel',
// 			// 		onPress: () => null,
// 			// 		style: 'cancel',
// 			// 	},
// 			// 	{ text: 'ok', style: 'destructive' },
// 			// ])
// 		}
// 	},
// )

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
// 	console.log('TODO: Received a notification in the background!')
// 	// Do something with the notification data
// 	if (error) {
// 		console.log('error occurred')
// 	}
// 	if (data) {
// 		console.log('Received a notification in the background!')
// 		console.log(
// 			'TODO:🚀 ~ file: index.tsx ~ line 80 ~ TaskManager.defineTask ~ data',
// 			JSON.stringify(data, null, 4),
// 		)
// 	}
// })

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
	// 	const subscription = Notifications.addNotificationReceivedListener(notification => {
	// 		console.log('🚀 ~ file: index.tsx ~ line 84 ~ subscription ~ notification', notification)
	// 	})

	// 	return () => subscription.remove()
	// }, [])

	useEffect(() => {
		const subscription = Notifications.addNotificationResponseReceivedListener(response => {
			const url = response.notification.request.content.data.url
			console.log('🚀 -------------------------------------------------🚀')
			console.log('🚀 ~ file: index.tsx:112 ~ subscription ~ url', url)
			console.log('🚀 -------------------------------------------------🚀')

			Linking.openURL(url)
		})
		return () => subscription.remove()
	}, [])

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

// // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
// 	const message = {
// 		to: expoPushToken,
// 		sound: 'default',
// 		title: 'Original Title',
// 		body: 'And here is the body!',
// 		data: { someData: 'goes here' },
// 	}

// 	await fetch('https://exp.host/--/api/v2/push/send', {
// 		method: 'POST',
// 		headers: {
// 			Accept: 'application/json',
// 			'Accept-encoding': 'gzip, deflate',
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(message),
// 	})
// }

// async function registerForPushNotificationsAsync() {
// 	let token
// 	if (Device.isDevice) {
// 		const { status: existingStatus } = await Notifications.getPermissionsAsync()
// 		let finalStatus = existingStatus
// 		if (existingStatus !== 'granted') {
// 			const { status } = await Notifications.requestPermissionsAsync()
// 			finalStatus = status
// 		}
// 		if (finalStatus !== 'granted') {
// 			alert('Failed to get push token for push notification!')
// 			return
// 		}
// 		token = (await Notifications.getExpoPushTokenAsync()).data
// 		console.log('TODO:',token)
// 	} else {
// 		alert('Must use physical device for Push Notifications')
// 	}

// 	if (Platform.OS === 'android') {
// 		Notifications.setNotificationChannelAsync('default', {
// 			name: 'default',
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: '#FF231F7C',
// 		})
// 	}

// 	return token
// }
