// !! TODO: Can remove this function because app is not using a map
import { makeVar } from '@apollo/client'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { LocationGeocodedAddress, LocationObject } from 'expo-location'
import { Dimensions } from 'react-native'

// !TODO: Clean up - can remove this from the application

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0692
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

type MapType = {
	centerOnVenueLocation: boolean | null
	centerOnUserCurrentLocation: boolean | null
	longitudeDelta: number | null
	latitudeDelta: number | null
	range: number | null
	useCustomLocation: boolean | null
	current: LocationObject | null
	reverseGeocoded: LocationGeocodedAddress | null
}

export const mapInitialState: MapType = {
	centerOnVenueLocation: false,
	centerOnUserCurrentLocation: true,
	range: 40,
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA,
	useCustomLocation: false,
	current: {
		coords: {
			accuracy: null,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			// latitude: 43.449925,
			// longitude: -80.4570971,
			latitude: null,
			longitude: null,
			speed: null,
		},
		timestamp: 0,
	},
	reverseGeocoded: {
		city: null,
		country: null,
		district: null,
		isoCountryCode: null,
		name: null,
		postalCode: null,
		region: null,
		street: null,
		streetNumber: null,
		subregion: null,
		timezone: null,
	},
}

export const MapReactiveVar = makeVar<MapType | null>(mapInitialState)
export const MapBottomSheetRefVar = makeVar<React.RefObject<BottomSheetModalMethods> | null>(null)
