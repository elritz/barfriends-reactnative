import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
	SearchAreaType,
} from '@reactive'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { Alert, Linking, Platform } from 'react-native'

const useSetSearchAreaWithLocation = async (): Promise<Boolean> => {
	const status = await Location.getForegroundPermissionsAsync()
	const rSearchAreaVar = SearchAreaReactiveVar()
	const rPermissionLocationVar = PermissionForegroundLocationReactiveVar()

	const useLocationToSetSearchArea = async (): Promise<Boolean> => {
		const currentLocation = await Location.getCurrentPositionAsync({
			accuracy: 3,
		})

		if (!currentLocation) {
			const currentLastKnownLocation = await Location.getLastKnownPositionAsync({
				requiredAccuracy: 3,
			})
			if (!currentLastKnownLocation) {
				return false
			}

			const reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: currentLastKnownLocation.coords.latitude,
				longitude: currentLastKnownLocation.coords.longitude,
			})

			SearchAreaReactiveVar({
				...rSearchAreaVar,
				useCurrentLocation: true,
				country: reverseGeocode[0].country,
				state: reverseGeocode[0].region,
				city: reverseGeocode[0].city,
				coords: {
					latitude: currentLastKnownLocation.coords.latitude,
					longitude: currentLastKnownLocation.coords.longitude,
				},
			})

			const valueSearchArea: SearchAreaType = {
				...rSearchAreaVar,
				country: reverseGeocode[0].country,
				state: reverseGeocode[0].region,
				city: reverseGeocode[0].city,
				coords: {
					latitude: currentLocation.coords.latitude,
					longitude: currentLocation.coords.longitude,
				},
			}

			const newSearchArea = JSON.stringify(valueSearchArea)

			await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchArea)
			return true
		}

		const reverseGeocode = await Location.reverseGeocodeAsync({
			latitude: currentLocation.coords.latitude,
			longitude: currentLocation.coords.longitude,
		})

		const valueSearchArea: SearchAreaType = {
			...rSearchAreaVar,
			useCurrentLocation: true,
			country: reverseGeocode[0].country,
			state: reverseGeocode[0].region,
			city: reverseGeocode[0].city,
			coords: {
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			},
		}

		SearchAreaReactiveVar({
			...rSearchAreaVar,
			...valueSearchArea,
		})

		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(valueSearchArea))

		return true
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Location Permission Status',
			`Currently you location permission is${rPermissionLocationVar.status}. Go to settings to change this.`,
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	if (status.granted) {
		return useLocationToSetSearchArea()
	} else if (status.canAskAgain) {
		const status = await Location.requestForegroundPermissionsAsync()
		PermissionForegroundLocationReactiveVar(status)
		if (status.granted) {
			return useLocationToSetSearchArea()
		} else {
			createTwoButtonAlert()
		}
	}
}

export default useSetSearchAreaWithLocation
