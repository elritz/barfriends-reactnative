import JoinCard from '../../joincard/JoinCard'
import SignupCard from '../../signupcard/SignupCard'
import { useReactiveVar } from '@apollo/client'
import { FOREGROUND_LOCATION_TASK_NAME } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useCurrentVenueLazyQuery, useCurrentVenueQuery } from '@graphql/generated'
import { cache } from '@library/apollo/cache'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { getDistance } from 'geolib'
import { MotiView } from 'moti'
import { Box, Button, Heading, Icon, Spinner, Text, View, useDisclose, useTheme } from 'native-base'
import { useEffect, useState } from 'react'
import { AppState, StyleSheet } from 'react-native'
import { Easing } from 'react-native-reanimated'

// TODO: FN(When a useris joined to a venue action must be different)

TaskManager.defineTask(FOREGROUND_LOCATION_TASK_NAME, async ({ data }: any) => {
	const now = Date.now()

	if (data) {
		if (data.locations) {
			console.log('data.locations FOREGROUND :>> ', JSON.stringify(data.locations, null, 4))
		}
	}
	return now
})

async function registerForegroundFetchAsync() {
	await Location.startLocationUpdatesAsync(FOREGROUND_LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Balanced,
		deferredUpdatesDistance: 25,
		timeInterval: 60000,
		showsBackgroundLocationIndicator: false,
		deferredUpdatesInterval: ENVIRONMENT === 'development' ? 1000 : 5000,
		distanceInterval: ENVIRONMENT === 'development' ? 0 : 20,
		foregroundService: {
			notificationTitle: 'Location',
			notificationBody: 'Location tracking in foreground',
			notificationColor: '#fff',
		},
	})
}

async function unregisterForegroundFetchAsync() {
	const hasStarted = await Location.hasStartedLocationUpdatesAsync(FOREGROUND_LOCATION_TASK_NAME)
	if (hasStarted) {
		return Location.stopLocationUpdatesAsync(FOREGROUND_LOCATION_TASK_NAME)
	}
}

const size = 50

const CurrentLocationFromVenueDistance = () => {
	const route = useRoute<VenueScreenRouteProp>()
	const theme = useTheme()
	const isFocused = useIsFocused()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const [isLoading, setLoading] = useState<boolean>(true)
	const [distance, setDistance] = useState<number | undefined>()
	const [metric, setMetric] = useState<'km' | 'm' | undefined>('km')
	const [appState, setAppState] = useState(AppState.currentState)
	const {
		isOpen: isForegroundLocationOn,
		onOpen: onOpenForegroundLocationOn,
		onClose: onCloseForegroundLocationOn,
		onToggle: onToggleForegroundLocationOn,
	} = useDisclose()

	const { data, loading, error } = useCurrentVenueQuery({
		fetchPolicy: 'cache-only',
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation ? rSearchAreaVar.searchArea.coords.latitude : 0,
				longitude: rSearchAreaVar.useCurrentLocation ? rSearchAreaVar.searchArea.coords.longitude : 0,
			},
		},
		onError(error) {
			console.log('error :>> ', error)
		},
		onCompleted: data => {
			if (Number(data?.currentVenue?.distanceInM) > 1000) {
				setDistance(parseInt((Number(data.currentVenue?.distanceInM) / 1000).toFixed(1)))
				setMetric('km')
			} else {
				setDistance(Number(data.currentVenue?.distanceInM))
				setMetric('m')
			}
			setTimeout(() => setLoading(false), 3000)
		},
	})

	const getDistanceFromVenue = async ({ vlat, vlng }) => {
		const getLastKnowPosition = await Location.getLastKnownPositionAsync({
			requiredAccuracy: 50,
			maxAge: 1200000,
		})

		if (vlat && vlng) {
			if (getLastKnowPosition && getLastKnowPosition.coords) {
				const dist = getDistance(
					{
						latitude: getLastKnowPosition.coords.latitude,
						longitude: getLastKnowPosition.coords.longitude,
					},
					{
						latitude: vlat,
						longitude: vlng,
					},
				)
				if (data?.currentVenue) {
					console.log('update', dist)
					// cache.modify({
					// 	id: cache.identify(data.currentVenue),
					// 	fields: {
					// 		distanceInM: (existingFieldData, { toReference }) => {
					// 			// return dist
					// 			return '55000'
					// 		},
					// 	},
					// })
				}
				if (dist > 1000) {
					setDistance(parseInt((dist / 1000).toFixed(1)))
					setMetric('km')
				} else {
					setDistance(dist)
					setMetric('m')
				}
			}
		} else {
			const currentPosition = await Location.getCurrentPositionAsync({
				accuracy: LocationAccuracy.High,
			})
			const dist = getDistance(
				{ latitude: currentPosition.coords.latitude, longitude: currentPosition.coords.longitude },
				{
					latitude: vlat,
					longitude: vlng,
				},
			)
			if (data?.currentVenue) {
				console.log('update', dist)
				// cache.modify({
				// 	id: cache.identify(data.currentVenue),
				// 	fields: {
				// 		distanceInM: (existingFieldData, { toReference }) => {
				// 			// return dist
				// 			return '55'
				// 		},
				// 	},
				// })
			}
			if (dist > 1000) {
				setDistance(parseInt((dist / 1000).toFixed(1)))
				setMetric('km')
			} else {
				setDistance(dist)
				setMetric('m')
			}
		}
		setTimeout(() => setLoading(false), 3000)
	}

	const appStateHandleForegroundLocation = async nextAppState => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(FOREGROUND_LOCATION_TASK_NAME)
		if (isForegroundLocationOn && isFocused) {
			if (!hasStarted && nextAppState === 'inactive') {
				// console.log('Background location stopped  in background...')
				await unregisterForegroundFetchAsync()
			}
			if (appState !== nextAppState) {
				if (appState.match(/inactive|background/) && nextAppState === 'active') {
					if (metric === 'm' && distance && distance < 50) {
						// console.log('Background Location started in foreground ...')
						await registerForegroundFetchAsync()
					}
					if (!hasStarted && nextAppState === 'inactive') {
						// console.log('Background location stopped  in background...')
						await unregisterForegroundFetchAsync()
					}
				}
			}
		}

		if ((!isForegroundLocationOn && hasStarted) || !isFocused) {
			await unregisterForegroundFetchAsync()
		}

		AppState.currentState = nextAppState
		setAppState(AppState.currentState)
	}

	useEffect(() => {
		if (rSearchAreaVar.useCurrentLocation) {
			if (AppState.currentState === 'active' && isFocused && distance && !isForegroundLocationOn) {
				if (metric === 'm' && distance < 50) {
					onToggleForegroundLocationOn()
				}
			} else {
				onToggleForegroundLocationOn()
				unregisterForegroundFetchAsync()
			}
		}
	}, [appState, isFocused])

	useEffect(() => {
		const appStateListen = AppState.addEventListener('change', appStateHandleForegroundLocation)
		return () => {
			appStateListen.remove()
		}
	}, [isForegroundLocationOn, appState, isFocused])

	const styles = StyleSheet.create({
		dot: {
			height: size,
			width: size,
			borderRadius: size / 2,
			backgroundColor: theme.colors.primary[500],
		},
	})

	return (
		<>
			{metric === 'm' && distance && distance > 10 ? (
				<>{rAuthorizationVar?.DeviceProfile?.Profile ? <JoinCard /> : <SignupCard />}</>
			) : (
				<>
					{loading || !data || isLoading ? (
						<View
							style={[
								styles.dot,
								{
									alignContent: 'center',
									justifyContent: 'center',
								},
							]}
						>
							{[...Array(3).keys()].map(index => {
								return (
									<MotiView
										from={{
											opacity: 0.5,
											scale: 1,
										}}
										animate={{
											opacity: 0,
											scale: 2,
										}}
										transition={{
											type: 'timing',
											duration: 2000,
											easing: Easing.out(Easing.ease),
											loop: true,
											repeatReverse: true,
											delay: index * 400,
										}}
										key={index}
										style={[styles.dot, StyleSheet.absoluteFillObject]}
									/>
								)
							})}
							<Icon
								_light={{
									color: 'light.50',
								}}
								_dark={{
									color: 'dark.50',
								}}
								size={'2xl'}
								name='location-pin'
								as={MaterialIcons}
								alignSelf={'center'}
							/>
						</View>
					) : (
						<Box height={'100%'} justifyContent={'center'}>
							<Heading
								textAlign={'center'}
								textTransform={'uppercase'}
								fontWeight={'800'}
								size={'lg'}
								lineHeight={'xs'}
							>
								{metric === 'km' ? `In your area` : `You're super close!`}
							</Heading>

							<Box paddingBottom={1} alignSelf={'center'} flexDirection={'row'} alignItems={'center'}>
								<Icon size={'xl'} name='location-pin' as={MaterialIcons} />
								<Heading fontWeight={'900'}>
									{distance}&nbsp;{metric}
									{/* {data?.currentVenue?.distanceInM}&nbsp;{metric} */}
								</Heading>
							</Box>
						</Box>
					)}
				</>
			)}
			{!isLoading && (
				<Button
					variant={'ghost'}
					size={'xs'}
					onPress={async () =>
						await getDistanceFromVenue({
							vlat: Number(route.params.latitude),
							vlng: Number(route.params.longitude),
						})
					}
					position={'absolute'}
					alignSelf={'center'}
					bottom={1}
				>
					<Text>Tap to refresh</Text>
				</Button>
			)}
		</>
	)
}

export default CurrentLocationFromVenueDistance
