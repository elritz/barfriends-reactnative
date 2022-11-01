import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION, LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { LOCATION_TASK_NAME, GEOFENCING_LOCATION_TASK_NAME } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	BackgroundLocationPermissionReactiveVar,
	ForegroundLocationPermissionReactiveVar,
	searchAreaInitialState,
	SearchAreaReactiveVar,
} from '@reactive'
import { secureStorageItemDelete } from '@util/hooks/local/useSecureStorage'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'
import { Box, Heading } from 'native-base'
import { ScrollView, Button, Text, Divider, VStack } from 'native-base'
import { useCallback, useState } from 'react'
import { Platform, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(Change theme functionality with database and local storage save)

let foregroundSubscription = null

const ChangeThemeScreen = () => {
	const insets = useSafeAreaInsets()
	const [currentPosition, setCurrentPosition] = useState<LocationObject>()
	const [venues, setVenues] = useState([])

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_OPS_SETTINGS)
		}
	}

	const startForegroundUpdate = async () => {
		const { granted } = await Location.getForegroundPermissionsAsync()
		if (!granted) {
			console.log('location tracking denied')
			return
		}

		// Make sure that foreground location tracking is not running
		foregroundSubscription?.remove()

		// Start watching position in real-time
		foregroundSubscription = await Location.watchPositionAsync(
			{
				// For better logs, we set the accuracy to the most sensitive option
				accuracy: Location.Accuracy.BestForNavigation,
			},
			location => {
				setCurrentPosition(location)
			},
		)
	}

	// Stop location tracking in foreground
	const stopForegroundUpdate = () => {
		foregroundSubscription?.remove()
		setCurrentPosition(null)
	}

	// Start location tracking in background
	const startBackgroundUpdate = async () => {
		// Don't track position if permission is not granted
		const { granted } = await Location.getBackgroundPermissionsAsync()
		if (!granted) {
			console.log('location tracking denied')
			return
		}

		// Make sure the task is defined otherwise do not start tracking
		const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
		if (!isTaskDefined) {
			console.log('Task is not defined')
			return
		}

		// Don't track if it is already running in background
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
		if (hasStarted) {
			console.log('Already started')
			return
		}

		await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
			// For better logs, we set the accuracy to the most sensitive option
			accuracy: Location.Accuracy.BestForNavigation,
			// Make sure to enable this notification if you want to consistently track in the background
			showsBackgroundLocationIndicator: true,
			deferredUpdatesInterval: ENVIRONMENT === 'development' ? 1000 : 5000,
			distanceInterval: ENVIRONMENT === 'development' ? 0 : 20,
			foregroundService: {
				notificationTitle: 'Location',
				notificationBody: 'Location tracking in background',
				notificationColor: '#fff',
			},
		})
	}

	// Stop location tracking in background
	const stopBackgroundUpdate = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
		if (hasStarted) {
			await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
			console.log('Location tacking stopped')
		}
	}

	const onReloadPress = useCallback(() => {
		if (Platform.OS === 'web') {
			location.reload()
		} else {
			Updates.reloadAsync()
		}
	}, [])

	return (
		<Box flex={1}>
			<ScrollView flex={1} mx={3} contentInset={{ bottom: insets.bottom + 50 }}>
				<Heading
					my={5}
					adjustsFontSizeToFit
					fontSize={'3xl'}
					textAlign={'center'}
					textTransform={'capitalize'}
					fontWeight={'black'}
				>
					{String.fromCharCode(60)}
					{ENVIRONMENT} {String.fromCharCode(47, 62)}
					Change Theme
				</Heading>
			</ScrollView>
		</Box>
	)
}
export default ChangeThemeScreen
