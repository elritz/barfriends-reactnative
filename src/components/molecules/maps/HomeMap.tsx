import DarkMapStyle from './GoogleMapsStyleDark'
import LightMapStyle from './GoogleMapsStyleLight'
import BasicCircleMarker from '@components/atoms/markers/BasicCircleMarker'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PropsWithChildren, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useTheme } from 'styled-components/native'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.0692
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const MapItems = [
	{
		id: '123',
		geometry: {
			latitude: 43.4616042,
			longitude: -80.5035944,
		},
		name: 'Dallas',
		image_url:
			'https://www.google.com/maps/uv?pb=!1s0x882bf4f4b9d215d7%3A0x6d27cf5b1b435555!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPM7abvRFGf-MN4VJXdVDJ60tkHO0QJuGPaZ8z_%3Dw213-h160-k-no!5sdallas%20nightclub%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipPM7abvRFGf-MN4VJXdVDJ60tkHO0QJuGPaZ8z_&hl=en&sa=X&ved=2ahUKEwisn-KivIDsAhVQHs0KHepwDNoQoiowCnoECB0QBg&cshid=1600905112707050#',
	},
	{
		id: '1234',
		geometry: {
			latitude: 43.463972,
			longitude: -80.49072,
		},
		name: 'Facebook',
		image_url: 'https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png',
	},
	{
		id: '1235',
		geometry: {
			latitude: 43.450639,
			longitude: -80.502049,
		},
		name: 'Instagram',
		image_url:
			'https://www.brandchannel.com/wp-content/uploads/2016/05/instagram-new-logo-may-2016.jpg',
	},
]

interface MapItem {
	id: string
	geometry: {
		latitude: number
		longitude: number
	}
	name: string
	image_url: string
}

interface Props extends PropsWithChildren<any> {
	markers: MapItem[]
}

const defaultProps: Props = {
	markers: MapItems,
}

export default function index() {
	// useNetworkConnection();
	// useSetDeviceCellular();
	// useSetDeviceBiometric();

	const map = useRef()
	const isFocused = useIsFocused()
	const colorScheme = useColorScheme()
	const themeContext = useTheme()

	const navigation = useNavigation()

	const [defaultInitialPosition, setDefaultInitialPosition] = useState({
		latitude: 43.478925,
		longitude: -80.5375971,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA,
	})

	return (
		<>
			<MapView
				ref={map}
				provider={PROVIDER_GOOGLE} // remove if not using Google Maps
				region={defaultInitialPosition}
				// showsUserCurrentLocation={true}
				tracksInfoWindowChanges={false}
				tracksViewChanges={false}
				customMapStyle={colorScheme === 'light' ? LightMapStyle : DarkMapStyle}
				style={styles.map}
			>
				{isFocused ? (
					<>
						{MapItems.map(marker => (
							<BasicCircleMarker
								key={marker.id}
								marker={marker}
								main_navigation_screen='venue'
								sub_navigation_screen='venuescreen'
							/>
						))}
					</>
				) : null}
			</MapView>

			<View style={{ marginTop: 50 }} />
		</>
	)
}

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#1d1d1d',
	},
})
