import { useReactiveVar } from '@apollo/client'
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '@components/atoms/markers/BasicCircleMarker'
import { PermissionForegroundLocationReactiveVar, CurrentLocationReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Marker } from 'react-native-maps'

export default function index(props: any) {
	const rPermissionLocation = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rCurrentLocation = useReactiveVar(CurrentLocationReactiveVar)

	const [markerCurrentLocation, setLocation] = useState({
		latitude: rCurrentLocation.current.coords.latitude,
		longitude: rCurrentLocation.current.coords.longitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	})

	const watchPosition = async () => {
		await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.Balanced,
				distanceInterval: 10,
				timeInterval: 5000,
			},
			newLocation => {
				setLocation({
					...markerCurrentLocation,
					latitude: newLocation.coords.latitude,
					longitude: newLocation.coords.longitude,
				})
			},
		)
	}

	useEffect(() => {
		if (rPermissionLocation.granted) {
			watchPosition()
		}
	}, [])

	return (
		<Marker
			onPress={() => props.onPress}
			coordinate={markerCurrentLocation}
			tracksInfoWindowChanges={false}
			tracksViewChanges={!!props.loading}
		>
			<View
				style={{
					height: 40,
					width: 40,
					borderRadius: 7,
				}}
			/>
		</Marker>
	)
}
