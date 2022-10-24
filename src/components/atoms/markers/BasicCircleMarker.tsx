import { useNavigation } from '@react-navigation/native'
import { useEffect, useState, useContext, useRef } from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

export const LATITUDE_DELTA = 0.0692
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

interface LatLng {
	latitude: number
	longitude: number
}
interface CircleProps {
	marker: {
		geometry: LatLng
		image_url: string
	}
	// main_navigation_screen: string;
	// sub_navigation_screen: string;
}

const BasicMarker = ({
	marker,
}: // main_navigation_screen,
// sub_navigation_screen,
CircleProps) => {
	const markerRef = useRef()
	const navigation = useNavigation()
	const [loading, setLoading] = useState(true)

	const stopTrackViewChanges = () => {
		setLoading(false)
	}

	useEffect(() => {}, [])

	const onPressMarker = () => {
		navigation.navigate('VenueStack', {
			screen: 'VenueScreen',
		})

		// navigation.navigate(main_navigation_screen, {
		//   screen: sub_navigation_screen,
		//   params: { item: marker },
		// });
	}

	return (
		<Marker
			ref={markerRef}
			coordinate={marker.geometry}
			identifier={marker.id}
			tracksInfoWindowChanges={false}
			onPress={() => onPressMarker()}
		>
			{/* <SharedElement id={`item.${marker.id}.photo`}> */}
			<Image
				style={{
					zIndex: 100,
					alignSelf: 'center',
					width: 50,
					height: 50,
					borderRadius: 13,
					marginTop: 3,
				}}
				onLoad={stopTrackViewChanges}
				source={{ uri: marker.image_url }}
			/>
			{/* </SharedElement> */}
		</Marker>
	)
}

// BasicCircleMarker.sharedElements = (route: any, otherRoute: any, showing: any) => {
//   const { item } = route.params;
//   return [{ id: `item.${item.id}.photo` }];
// };

export default BasicMarker
