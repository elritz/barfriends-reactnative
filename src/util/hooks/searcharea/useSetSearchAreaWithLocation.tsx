import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { Alert, Linking, Platform } from 'react-native'

const useSetSearchAreaWithLocation = async () => {
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
				isoCode: reverseGeocode[0].isoCountryCode,
				distance: 30,
				kRing: 3,
				city: reverseGeocode[0].city,
				coords: {
					latitude: currentLastKnownLocation.coords.latitude,
					longitude: currentLastKnownLocation.coords.longitude,
				},
			})

			const valueSearchArea: LocalStoragePreferenceSearchAreaType2 = {
				...rSearchAreaVar,
				useCurrentLocation: true,
				country: reverseGeocode[0].country,
				state: reverseGeocode[0].region,
				city: reverseGeocode[0].city,
				isoCode: reverseGeocode[0].isoCountryCode,
				distance: 30,
				kRing: 3,
				coords: {
					latitude: currentLastKnownLocation.coords.latitude,
					longitude: currentLastKnownLocation.coords.longitude,
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

		const valueSearchArea: LocalStoragePreferenceSearchAreaType2 = {
			useCurrentLocation: true,
			kRing: {
				value: 2,
				distance: 60,
			},
			searchArea: {
				country: {
					name: String(reverseGeocode[0].country),
					coords: {
						latitude: currentLocation.coords.latitude,
						longitude: currentLocation.coords.longitude,
					},
					isoCode: String(reverseGeocode[0].isoCountryCode),
				},
				state: {
					name: String(reverseGeocode[0].country),
					coords: {
						latitude: currentLocation.coords.latitude,
						longitude: currentLocation.coords.longitude,
					},
					isoCode: String(reverseGeocode[0].region),
				},
				city: {
					name: String(reverseGeocode[0].city),
					coords: {
						latitude: currentLocation.coords.latitude,
						longitude: currentLocation.coords.longitude,
					},
					isoCode: '',
				},
				coords: {
					latitude: currentLocation.coords.latitude,
					longitude: currentLocation.coords.longitude,
				},
			},
		}

		SearchAreaReactiveVar({
			...valueSearchArea,
		})

		await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(valueSearchArea))

		return true
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Location Permission Status',
			`Currently you location permission is${rPermissionLocationVar?.status}. Go to settings to change this.`,
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
