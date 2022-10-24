import { markers } from './Config'
import { useReactiveVar } from '@apollo/client'
import TrackingMarker from '@components/molecules/list/TrackingMarker'
import DarkMapStyle from '@components/molecules/maps/GoogleMapsStyleDark'
import LightMapStyle from '@components/molecules/maps/GoogleMapsStyleLight'
import HorizontalVenuesNearRegionBottomSheet from '@components/organisms/bottomsheet/component/VenuesBottomSheet/HorizontalVenuesNearRegionBottomSheet'
import MapLocationFillteringBottomSheet from '@components/organisms/bottomsheet/modal/MapLocationFilteringBottomSheet'
import { useNavigation } from '@react-navigation/native'
import {
	CurrentLocationReactiveVar,
	MapReactiveVar,
	ThemeReactiveVar,
	ForegroundLocationPermissionReactiveVar,
} from '@reactive'
import { Text } from '@rneui/base'
import * as Location from 'expo-location'
import { createRef, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Platform, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const SPACING_FOR_CARD_INSET = width * 0.1 - 10
const LATITUDE_DELTA = 0.0692
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export const CARD_HEIGHT = 200
export const CARD_WIDTH = width * 0.7

const initialMapState = {
	markers,
	region: {
		latitude: null,
		longitude: null,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	},
}

let mapIndex = 0
const mapAnimation = new Animated.Value(0)

interface MapScreenProps {}

const MapScreen = () => {
	const navigation = useNavigation()
	const _map = useRef()
	const _flatListView = useRef(null)
	const theme = useReactiveVar(ThemeReactiveVar)
	const rMap = useReactiveVar(MapReactiveVar)
	const rCurrentLocation = useReactiveVar(CurrentLocationReactiveVar)
	const [loading, setLoading] = useState(true)
	const [state, setState] = useState(initialMapState)

	useEffect(() => {
		mapAnimation.addListener(({ value }) => {
			let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item
			if (index >= state.markers.length) {
				index = state.markers.length - 1
			}

			clearTimeout(regionTimeout)
			if (index <= 0) {
				index = 0
			}

			const regionTimeout = setTimeout(() => {
				if (mapIndex !== index) {
					mapIndex = index
					const { coordinate } = state.markers[index]
					_map.current.animateToRegion(
						{
							...coordinate,
							latitudeDelta: state.region.latitudeDelta,
							longitudeDelta: state.region.longitudeDelta,
						},
						350,
					)
				}
			}, 10)
		})
	}, [])

	useEffect(() => {
		reverseGeocode()
	}, [])

	const reverseGeocode = async () => {
		if (rMap.useCustomLocation && rMap.current.coords.latitude && rMap.current.coords.longitude) {
			const permissions = await Location.getForegroundPermissionsAsync()
			const geocodedLocation = await Location.reverseGeocodeAsync({
				latitude: rMap.current.coords.latitude,
				longitude: rMap.current.coords.longitude,
			})

			MapReactiveVar({
				...rMap,
				reverseGeocoded: { ...geocodedLocation[0] },
			})
		} else {
			const geocodedLocation = await Location.reverseGeocodeAsync({
				latitude: rCurrentLocation.current.coords.latitude,
				longitude: rCurrentLocation.current.coords.longitude,
			})
			MapReactiveVar({
				...rMap,
				reverseGeocoded: { ...geocodedLocation[0] },
			})
		}
	}

	const onPressProfileMarker = () => {
		reverseGeocode()
	}

	const interpolations = state.markers.map((marker, index) => {
		const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH]

		const scale = mapAnimation.interpolate({
			inputRange,
			outputRange: [1, 1, 1],
			extrapolate: 'clamp',
		})

		return { scale }
	})

	const onMarkerPress = mapEventData => {
		const index = mapEventData._targetInst.return.key
		let x = index * CARD_WIDTH + index * 20
		if (Platform.OS === 'ios') {
			x -= SPACING_FOR_CARD_INSET
		}
		_flatListView.current.scrollToIndex({ index, animated: true })
	}

	return (
		<OuterView>
			<MapView
				ref={_map}
				style={StyleSheet.absoluteFillObject}
				provider={PROVIDER_GOOGLE}
				customMapStyle={theme === 'dark' ? DarkMapStyle : LightMapStyle}
				region={{
					latitude: rMap.useCustomLocation
						? rMap.current.coords.latitude
						: rCurrentLocation.current.coords.latitude,
					longitude: rMap.useCustomLocation
						? rMap.current.coords.longitude
						: rCurrentLocation.current.coords.longitude,
					latitudeDelta: rMap.latitudeDelta,
					longitudeDelta: rMap.longitudeDelta,
				}}
			>
				<TrackingMarker onPress={() => onPressProfileMarker()} loading={loading} />
				{state.markers.map((marker, index) => {
					const scaleStyle = {
						transform: [
							{
								scale: interpolations[index].scale,
							},
						],
					}
					return (
						<Marker key={index} coordinate={marker.coordinate} onPress={e => onMarkerPress(e)}>
							<Animated.View
								style={[
									scaleStyle,
									{
										alignItems: 'center',
										justifyContent: 'center',
										height: 50,
										width: 50,
										backgroundColor: 'pink',
										borderRadius: 8,
										overflow: 'hidden',
									},
								]}
							>
								<Text style={{ fontSize: 10 }}>{index}</Text>
							</Animated.View>
						</Marker>
					)
				})}
			</MapView>

			{Platform.OS === 'ios' && (
				<HorizontalVenuesNearRegionBottomSheet
					_flatListView={_flatListView}
					markers={state.markers}
					SPACING_FOR_CARD_INSET={SPACING_FOR_CARD_INSET}
					CARD_WIDTH={CARD_WIDTH}
					CARD_HEIGHT={CARD_HEIGHT}
					mapAnimation={mapAnimation}
				/>
			)}
			<MapLocationFillteringBottomSheet />
		</OuterView>
	)
}

export default MapScreen

const OuterView = styled.View`
	flex: 1;
`

// const setUpLocation = async () => {
//   const { granted } = await Location.getForegroundPermissionsAsync();
//   const lSerice = await Location.hasServicesEnabledAsync()
//   if (lSerice && granted) {
//     const lastKnown = await Location.getLastKnownPositionAsync({ requiredAccuracy: 100 })
//     const currentLocation = Location.reverseGeocodeAsync({
//       latitude: lastKnown.coords.latitude,
//       longitude: lastKnown.coords.longitude
//     })
//     // MapReactiveVar({
//     //   ...rMap,
//     //   current: {
//     //     ...rMap.current,
//     //     coords: {
//     //       ...rMap.current.coords,
//     //       latitude: lastKnown.coords.latitude,
//     //       longitude: lastKnown.coords.longitude,
//     //     }
//     //   },
//     //   reverseGeocoded: { ...currentLocation[0] }
//     // })
//   } else {
//     navigation.navigate('PermissionNavigator', {
//       screen: 'ForegroundLocationPermissionScreen'
//     })
//   }
// }
