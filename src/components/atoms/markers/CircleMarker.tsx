import { useNavigation } from '@react-navigation/native'
import { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import { Image, Dimensions } from 'react-native'
import { Marker } from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0692
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

interface LatLng {
	latitude: number
	longitude: number
}
interface CircleProps {
	marker: {
		id: string
		geometry: LatLng
		image_url: string
	}
	main_navigation_screen: string
	sub_navigation_screen: string
}

const BasicCircleMarker = ({
	marker,
	main_navigation_screen,
	sub_navigation_screen,
}: CircleProps) => {
	const markerRef = useRef()
	const navigation = useNavigation()
	const [loading, setLoading] = useState(true)

	const stopTrackViewChanges = () => {
		setLoading(false)
	}

	useEffect(() => {}, [])

	const onPressMarker = () => {
		navigation.navigate(main_navigation_screen, {
			screen: sub_navigation_screen,
			params: { item: marker },
		})
	}

	return (
		<Marker
			ref={markerRef}
			coordinate={marker.geometry}
			identifier={marker.id}
			tracksInfoWindowChanges={false}
			onPress={() => onPressMarker()}
		>
			<Image
				style={{
					zIndex: 100,
					alignSelf: 'center',
					width: 58,
					height: 58,
					borderRadius: 27,
					marginTop: 3,
				}}
				onLoad={stopTrackViewChanges}
				source={{ uri: marker.image_url }}
			/>
		</Marker>
	)
}

BasicCircleMarker.sharedElements = (route: any, otherRoute: any, showing: any) => {
	const { item } = route.params
	return [{ id: `item.${item.id}.photo` }]
}

export default BasicCircleMarker
