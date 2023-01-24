import JoinCard from '../../joincard/JoinCard'
import SignupCard from '../../signupcard/SignupCard'
import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { useAddPersonalTotalsVenueMutation, useProfileQuery } from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { LocationAccuracy, LocationObjectCoords, LocationSubscription } from 'expo-location'
import { getDistance } from 'geolib'
import { Box, Heading, Icon, Spinner } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(When a useris joined to a venue action must be different)
const CurrentLocationFromVenueDistance = () => {
	let foregroundSubscription: LocationSubscription | null = null
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const route = useRoute<VenueScreenRouteProp>()
	const [isLoading, setLoading] = useState<boolean>(true)
	const [distance, setDistance] = useState<number | undefined>()
	const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')
	const [coords, setCoords] = useState<LocationObjectCoords | undefined>()

	console.log(
		'rAuthorizationVar?.DeviceProfile?.Profile.Personal?.LiveOutPersonal?.joined',
		JSON.stringify(
			rAuthorizationVar?.DeviceProfile?.Profile.Personal?.LiveOutPersonal?.joined,
			null,
			4,
		),
	)

	const [
		addPersonalTotalsVenueMutation,
		{ data: APTVData, loading: APTVLoading, error: APTVError },
	] = useAddPersonalTotalsVenueMutation({
		variables: {
			profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
			profileIdVenue: route.params.profileId,
		},
	})

	const { data, loading, error } = useProfileQuery({
		skip: !route.params.profileId,
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
		},
		onCompleted: async data => {
			const currentPosition = await Location.getCurrentPositionAsync({
				accuracy: LocationAccuracy.BestForNavigation,
			})
			const dist = getDistance(
				{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
				{
					latitude: Number(data?.profile?.Venue?.Location?.Geometry?.latitude),
					longitude: Number(data?.profile?.Venue?.Location?.Geometry?.longitude),
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

	const watchPositionChanges = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync()

		if (status !== 'granted') {
			return
		}

		//let location = await Location.getCurrentPositionAsync({});
		foregroundSubscription?.remove()
		const currentLocation = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
			timeInterval: 5000,
			distanceInterval: 20,
		})

		foregroundSubscription = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				distanceInterval: 50,
				timeInterval: 20000,
			},
			location => {
				setCoords(location.coords)
			},
		)
	}

	useEffect(() => {
		watchPositionChanges()
		return function cleanup() {
			if (foregroundSubscription) foregroundSubscription.remove()
		}
	}, [])

	useEffect(() => {
		if (coords) {
			const dist = getDistance(
				{ latitude: coords.latitude, longitude: coords.longitude },
				{
					latitude: Number(data?.profile?.Venue?.Location?.Geometry?.latitude),
					longitude: Number(data?.profile?.Venue?.Location?.Geometry?.longitude),
				},
			)
			if (dist > 1000) {
				setDistance(parseInt((dist / 1000).toFixed(1)))
				setMetric('km')
				setLoading(false)
			} else {
				if (distance < 20) {
					if (rAuthorizationVar?.DeviceProfile) {
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
				<>{rAuthorizationVar?.DeviceProfile?.Profile ? <JoinCard /> : <SignupCard />}</>
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
					{isLoading ? (
						<Spinner accessibilityLabel='Loading distance' />
					) : (
						<Box paddingBottom={1} alignSelf={'center'} flexDirection={'row'} alignItems={'center'}>
							<Icon size={'xl'} name='location-pin' as={MaterialIcons} />
							<Heading fontWeight={'900'}>
								{distance}&nbsp;{metric}
							</Heading>
						</Box>
					)}
				</Box>
			)}
		</>
	)
}

export default CurrentLocationFromVenueDistance
