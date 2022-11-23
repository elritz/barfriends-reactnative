import { ApolloProvider, useReactiveVar } from '@apollo/client'
import { LOCATION_TASK_NAME, BACKGROUND_NOTIFICATION_TASK } from '@constants/TaskManagerConstants'
import gateaWayClient from '@library/gateway-apollo-server'
import Navigation from '@navigation/index'
import AnimatedAppLoader from '@navigation/screens/Splashscreen/AnimatedAppLoader'
import { ThemeReactiveVar } from '@reactive'
import useDeviceNetwork from '@util/hooks/device/useDeviceNetwork'
import usePermission from '@util/hooks/device/usePermission'
import useCachedResources from '@util/hooks/local/useCachedResources'
import { useCurrentTheme } from '@util/hooks/theme/useCurrentTheme'
import Constants from 'expo-constants'
import 'expo-dev-client'
import * as Device from 'expo-device'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as TaskManager from 'expo-task-manager'
import { identity } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { View, useColorScheme, Alert, Platform } from 'react-native'
import 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

SplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
})
// TODO: FN(Background or foreground location tracking) - need to setup the application to optimize around apps fn performance

// Define the background task for location tracking
// TaskManager.defineTask(GEOFENCING_LOCATION_TASK_NAME, async ({ data, error }: any) => {
// 	console.log('reun')
// 	if (error) {
// 		console.error(error)
// 		return
// 	}
// 	if (data.eventType === GeofencingEventType.Enter) {
// 		// console.log(TODO:"You've entered region:", data.region)
// 		// console.log("TODO:You've entered region:", data)
// 		Alert.alert('You have entered a region', `${data.region.identifier}`, [
// 			{
// 				text: 'Cancel',
// 				onPress: () => null,
// 				style: 'cancel',
// 			},
// 			{ text: 'ok', style: 'destructive' },
// 		])
// 	} else if (data.eventType === GeofencingEventType.Exit) {
// 		console.log('🚀 ~ file: index.tsx ~ line 40 ~ TaskManager.defineTask ~ data', data)
// 		// console.log("TODO:You've left region:")
// 		Alert.alert('You have Left a region', `SOMETHING HAS TO BE DONE${data.region.identifier}`, [
// 			{
// 				text: 'Cancel',
// 				onPress: () => null,
// 				style: 'cancel',
// 			},
// 			{ text: 'ok', style: 'destructive' },
// 		])
// 	}
// })

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }: any) => {
	if (error) {
		console.error(error)
		return
	}
	if (data) {
		// console.log('🚀 ~ file: index.tsx ~ line 59 ~ TaskManager.defineTask ~ data', data)
		// Extract location coordinates from data
		const { locations }: any = data
		const location = locations[0]
		if (location) {
			console.log('Location in background', location.coords)
		}
	}
})

// TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
// 	console.log('TODO: Received a notification in the background!')
// 	// Do something with the notification data
// 	console.log('TODO:🚀 ~ file: index.tsx ~ line 80 ~ TaskManager.defineTask ~ data', data)
// })

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
})

export default function App() {
	const isDeviceNetworkComplete = useDeviceNetwork()
	const isPermissionComplete = usePermission()
	const colorScheme = useColorScheme()

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(notification => {
			// console.log('TODO:',notification)
			// ============> Object {
			// 	"date": 1666290510.895539,
			// 	"request": Object {
			// 		"content": Object {
			// 			"attachments": Array [],
			// 			"badge": null,
			// 			"body": "What is up go to the route",
			// 			"categoryIdentifier": "",
			// 			"data": Object {
			// 				"messageroomId": 12323312,
			// 			},
			// 			"launchImageName": "",
			// 			"sound": "default",
			// 			"subtitle": "awesome",
			// 			"summaryArgument": null,
			// 			"summaryArgumentCount": 0,
			// 			"targetContentIdentifier": null,
			// 			"threadIdentifier": "",
			// 			"title": "Hey CHritian",
			// 		},
			// 		"identifier": "5657D80B-6919-492E-838C-9A28E54FBFC9",
			// 		"trigger": Object {
			// 			"class": "UNPushNotificationTrigger",
			// 			"payload": Object {
			// 				"aps": Object {
			// 					"alert": Object {
			// 						"body": "What is up go to the route",
			// 						"launch-image": "",
			// 						"subtitle": "awesome",
			// 						"title": "Hey CHritian",
			// 					},
			// 					"category": "",
			// 					"sound": "default",
			// 					"thread-id": "",
			// 				},
			// 				"body": Object {
			// 					"messageroomId": 12323312,
			// 				},
			// 				"experienceId": "@barfriends/barfriends",
			// 				"projectId": "7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4",
			// 				"scopeKey": "@barfriends/barfriends",
			// 			},
			// 			"type": "push",
			// 		},
			// 	},
			// }
		})
		return () => subscription.remove()
	}, [])

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(notification => {
			// console.log('TODO:============>', notification)
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
