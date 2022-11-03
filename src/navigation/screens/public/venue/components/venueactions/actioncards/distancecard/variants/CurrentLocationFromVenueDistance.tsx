import JoinCard from '../../joincard/JoinCard'
import SignupCard from '../../signupcard/SignupCard'
import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { useAddPersonalTotalsVenueMutation, useProfileQuery } from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { LocationAccuracy, LocationObjectCoords } from 'expo-location'
import { getDistance } from 'geolib'
import { Box, Heading, Icon } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(When a useris joined to a venue action must be different)

const CurrentLocationFromVenueDistance = () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const themeContext = useContext(ThemeContext)
	const route = useRoute<VenueScreenRouteProp>()
	const [distance, setDistance] = useState<number | undefined>()
	const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')
	const [coords, setCoords] = useState<LocationObjectCoords | undefined>()

	const [
		addPersonalTotalsVenueMutation,
		{ data: APTVData, loading: APTVLoading, error: APTVError },
	] = useAddPersonalTotalsVenueMutation({
		variables: {
			profileIdPersonal: rAuthorizationVar.DeviceProfile.Profile?.id,
			profileIdVenue: route.params.profileId,
		},
	})

	const { data, loading, error } = useProfileQuery({
		skip: !route.params.profileId,
		variables: {
			where: {
				id: route.params.profileId,
			},
		},
		onCompleted: async data => {
			const currentPosition = await Location.getCurrentPositionAsync({
				accuracy: LocationAccuracy.BestForNavigation,
			})
			const dist = getDistance(
				{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
				{
					latitude: data.profile.Venue.Location.Geometry.latitude,
					longitude: data.profile.Venue.Location.Geometry.longitude,
				},
			)

			if (dist > 1000) {
				setDistance(parseInt((dist / 1000).toFixed(1)))
				setMetric('km')
			} else {
				setDistance(dist)
				setMetric('m')
			}
		},
	})

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()

			if (status !== 'granted') {
				console.log('Permission to access location was denied')
				return
			}

			//let location = await Location.getCurrentPositionAsync({});

			let foregroundSubscrition = Location.watchPositionAsync(
				{
					// Tracking options
					accuracy: Location.Accuracy.High,
					distanceInterval: 5,
					timeInterval: 1000,
				},

				location => {
					setCoords(location.coords)
				},
			)
		})()
	}, [])

	useEffect(() => {
		if (coords) {
			const dist = getDistance(
				{ latitude: coords.latitude, longitude: coords.longitude },
				{
					latitude: data.profile.Venue.Location.Geometry.latitude,
					longitude: data.profile.Venue.Location.Geometry.longitude,
				},
			)
			if (dist > 1000) {
				setDistance(parseInt((dist / 1000).toFixed(1)))
				setMetric('km')
			} else {
				if (distance < 20) {
					if (rAuthorizationVar.DeviceProfile) {
						addPersonalTotalsVenueMutation()
					}
				}
				setDistance(dist)
				setMetric('m')
			}
		}
	}, [coords])

	if (!data || loading) {
		return null
	}

	return (
		<>
			{metric === 'm' && distance > 10 ? (
				<>{rAuthorizationVar.DeviceProfile?.Profile ? <JoinCard /> : <SignupCard />}</>
			) : (
				<Box height={'100%'} justifyContent={'space-around'}>
					<Heading
						textAlign={'center'}
						textTransform={'uppercase'}
						fontWeight={'800'}
						size={'lg'}
						lineHeight={'xs'}
					>
						{metric === 'km' ? `We are in your area` : `You're super close!`}
					</Heading>
					<Box paddingBottom={1} alignSelf={'center'} flexDirection={'row'} alignItems={'center'}>
						<Icon size={'xl'} name='location-pin' as={MaterialIcons} />
						<Heading fontWeight={'900'}>
							{distance}&nbsp;{metric}
						</Heading>
					</Box>
				</Box>
			)}
		</>
	)
}

export default CurrentLocationFromVenueDistance
