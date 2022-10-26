import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import BackgroundLocationPermissionFullSection from '@components/molecules/permissions/locations/locationpermissionfullsection/BackgroundLocationPermissionFullSection'
import ForegroundLocationPermissionFullSection from '@components/molecules/permissions/locations/locationpermissionfullsection/ForegroundLocationPermissionFullSection'
import { FontAwesome5 } from '@expo/vector-icons'
import { useVenuesNearbyLazyQuery } from '@graphql/generated'
import SearchAreaLocationPermissionButton from '@navigation/screens/hometabs/venuesfeed/components/SearchAreaLocationPermissionButton'
import SkeletonVenuesHomeScreen from '@navigation/screens/hometabs/venuesfeed/components/SkeletonVenuesHomeScreen'
import VenueItem from '@navigation/screens/hometabs/venuesfeed/components/VenueItem'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	BackgroundLocationPermissionReactiveVar,
	ForegroundLocationPermissionReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import { getDistance, orderByDistance } from 'geolib'
import { AnimatePresence, MotiView } from 'moti'
import { Box, Center, VStack, Skeleton, Text, Heading, Icon, Button } from 'native-base'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppState, Dimensions, FlatList, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(handleAppStateChange) check if location permission is enabled and go somewhere with it
// TODO: UX() Workflow isn't quite working good enough for production
// TODO: FN() Get background location changes working

const { width } = Dimensions.get('window')
const loadingSkelHeight = width - 20
const scrollViewMarginX = '2'
const scrollViewItemsMarginY = 5

const VenueFeedScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(BackgroundLocationPermissionReactiveVar)
	const [venues, setVenues] = useState([])

	const [venuesNearby, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			latitude: rSearchAreaVar.coords.latitude,
			longitude: rSearchAreaVar.coords.longitude,
		},
		onCompleted: async data => {
			const status = await Location.getForegroundPermissionsAsync()
			if (status.granted) {
				const currentLocation = await Location.getCurrentPositionAsync({
					accuracy: LocationAccuracy.BestForNavigation,
				})

				const venues = data.venuesNearby.map(item => {
					return {
						...item,
						latitude: item.Venue.Location.Geometry.latitude,
						longitude: item.Venue.Location.Geometry.longitude,
					}
				})

				const orderData = orderByDistance(
					{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
					venues,
				)
				const withDistance = orderData.map((item: any) => {
					const distance = getDistance(
						{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
						{ latitude: item.latitude, longitude: item.longitude },
					)
					return {
						...item,
						distance: (distance / 1000).toFixed(1),
					}
				})
				setVenues(withDistance)
			} else {
				setVenues(data.venuesNearby)
			}
		},
	})

	const fnMemoed = async () => {
		if (
			rSearchAreaVar.coords.latitude !== undefined &&
			rSearchAreaVar.coords.longitude !== undefined
		) {
			return venuesNearby()
		}
	}

	const memoizedResultes = useMemo(
		async () => await fnMemoed(),
		[rSearchAreaVar.coords.latitude, rSearchAreaVar.coords.longitude],
	)

	useEffect(() => {
		if (
			!data &&
			!data?.venuesNearby.length &&
			rSearchAreaVar.coords.latitude &&
			rSearchAreaVar.coords.longitude
		) {
			venuesNearby()
		}
	}, [isFocused])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const locationpermission = await Location.getForegroundPermissionsAsync()
			ForegroundLocationPermissionReactiveVar(locationpermission)
			if (locationpermission.granted && locationpermission.status === 'granted') {
			}
		}
		appStateRef.current = nextAppState
	}

	const listHeaderComponent = () => {
		return (
			<Center>
				<VStack w={'full'} space={4}>
					{!rSearchAreaVar.coords.latitude || !rSearchAreaVar.coords.longitude ? (
						<SafeAreaView>
							<Box mb={2} mx={scrollViewMarginX}>
								<Box
									borderRadius={'lg'}
									p={5}
									_dark={{ backgroundColor: 'secondary.800' }}
									_light={{ backgroundColor: 'white' }}
									alignItems={'center'}
								>
									<Heading size={'2xl'} textAlign={'center'} fontWeight={'black'} lineHeight={'xs'} mb={5}>
										Welcome to Barfriends
									</Heading>
									<Text>
										Continue to find venues using location using your device location, or find venues with
										Search Area.
										<Icon size={'xs'} color={'primary.500'} as={FontAwesome5} name='filter' /> search area.{' '}
									</Text>
									<VStack w={'full'} alignItems={'center'} space={2}>
										<SearchAreaLocationPermissionButton />
										<Button
											onPress={() => {
												navigation.navigate('ModalNavigator', {
													screen: 'SearchAreaModalStack',
													params: {
														screen: 'SearchAreaModal',
													},
												})
											}}
											w={'85%'}
											variant={'ghost'}
											size={'lg'}
											_text={{
												fontSize: 'lg',
											}}
										>
											Find area
										</Button>
									</VStack>
								</Box>
							</Box>
						</SafeAreaView>
					) : (
						<>
							{loading || (!data && !data?.venuesNearby) ? (
								<Center>
									<VStack space={2}>
										<Skeleton
											speed={0.25}
											rounded='xl'
											startColor='secondary.900'
											endColor={'secondary.800'}
											h='280'
											w={loadingSkelHeight}
										/>
										<Skeleton
											speed={0.25}
											rounded='xl'
											startColor='secondary.900'
											endColor={'secondary.800'}
											h='150'
											w={loadingSkelHeight}
										/>
										<SkeletonVenuesHomeScreen />
									</VStack>
								</Center>
							) : (
								<Box mx={scrollViewMarginX} my={scrollViewItemsMarginY}>
									{!rForegroundLocationVar.granted ? (
										<ForegroundLocationPermissionFullSection />
									) : !rBackgroundLocationVar.granted ? (
										<BackgroundLocationPermissionFullSection />
									) : null}
								</Box>
							)}
						</>
					)}
					{!rAuthorizationVar?.DeviceProfile?.Profile?.Personal &&
						!rAuthorizationVar?.DeviceProfile?.Profile?.Venue && (
							<AnimatePresence>
								<MotiView
									from={{
										opacity: 0,
										scale: 1,
									}}
									animate={{
										opacity: 1,
										scale: 1,
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
									}}
								>
									<Box
										bgColor={themeContext.palette.secondary.background}
										px={5}
										pb={15}
										pt={35}
										mx={scrollViewMarginX}
										borderRadius={13}
									>
										<CardPleaseSignup signupTextId={1} />
									</Box>
								</MotiView>
							</AnimatePresence>
						)}
					{!loading && data && data?.venuesNearby && (
						<VStack mx={scrollViewMarginX} alignItems={'flex-start'} mb={3}>
							<Heading lineHeight={'xs'} size={'md'} fontWeight={'bold'}>
								Nearby
							</Heading>
							<Heading mt={'-5px'} lineHeight={'xs'} size={'2xl'} fontWeight={'black'} numberOfLines={1}>
								{rSearchAreaVar.city}
							</Heading>
						</VStack>
					)}
					{!venues.length && (
						<Center>
							<Heading>No Venues</Heading>
							<Heading>Found in your area</Heading>
						</Center>
					)}
				</VStack>
			</Center>
		)
	}

	return (
		<SafeAreaView>
			<FlatList
				onRefresh={fnMemoed}
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				style={{ height: '100%' }}
				columnWrapperStyle={{ justifyContent: 'space-around' }}
				data={venues}
				renderItem={({ item }) => <VenueItem loading={loading} item={item} />}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={listHeaderComponent}
				ListHeaderComponentStyle={{
					marginTop: insets.top,
					// paddingTop: insets.top,
				}}
				contentInset={{
					top: 0,
					left: 0,
					bottom: 90 + insets.bottom,
					right: 0,
				}}
			/>
		</SafeAreaView>
	)
}

export default VenueFeedScreen

////
// ? FOREGROUND BACKGROUND UPDATES
////

// // Start location tracking in foreground
// const startForegroundUpdate = async () => {
// 	// Check if foreground permission is granted
// 	const { granted } = await Location.getForegroundPermissionsAsync()
// 	if (!granted) {
// 		console.log('location tracking denied')
// 		return
// 	}

// 	// Make sure that foreground location tracking is not running
// 	foregroundSubscription?.remove()

// 	// Start watching position in real-time
// 	foregroundSubscription = await Location.watchPositionAsync(
// 		{
// 			// For better logs, we set the accuracy to the most sensitive option
// 			accuracy: Location.Accuracy.BestForNavigation,
// 		},
// 		location => {
// 			setPosition(location.coords)
// 		},
// 	)
// }

// // Stop location tracking in foreground
// const stopForegroundUpdate = () => {
// 	foregroundSubscription?.remove()
// 	setPosition(null)
// }

// // Start location tracking in background
// const startBackgroundUpdate = async () => {
// 	// Don't track position if permission is not granted
// 	const { granted } = await Location.getBackgroundPermissionsAsync()
// 	if (!granted) {
// 		console.log('location tracking denied')
// 		return
// 	}

// 	// Make sure the task is defined otherwise do not start tracking
// 	const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
// 	if (!isTaskDefined) {
// 		console.log('Task is not defined')
// 		return
// 	}

// 	// Don't track if it is already running in background
// 	const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
// 	if (hasStarted) {
// 		console.log('Already started')
// 		return
// 	}

// 	await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
// 		// For better logs, we set the accuracy to the most sensitive option
// 		accuracy: Location.Accuracy.BestForNavigation,
// 		// Make sure to enable this notification if you want to consistently track in the background
// 		showsBackgroundLocationIndicator: true,
// 		deferredUpdatesInterval: 20000,
// 		distanceInterval: 10,
// 		foregroundService: {
// 			notificationTitle: 'Location',
// 			notificationBody: 'Location tracking in background',
// 			notificationColor: '#fff',
// 		},
// 	})
// }

// // Stop location tracking in background
// const stopBackgroundUpdate = async () => {
// 	const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
// 	if (hasStarted) {
// 		await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
// 		console.log('Location tacking stopped')
// 	}
// }

////
// ? GEOFENCING
////

// // Start location tracking in background
// const startGeoFencingUpdate = async () => {
// 	// Don't track position if permission is not granted
// 	const { granted } = await Location.getBackgroundPermissionsAsync()
// 	if (!granted) {
// 		console.log('location tracking denied')
// 		return
// 	}

// 	// Make sure the task is defined otherwise do not start tracking
// 	const isTaskDefined = await TaskManager.isTaskDefined(GEOFENCING_LOCATION_TASK_NAME)
// 	if (!isTaskDefined) {
// 		console.log('Task is not defined')
// 		return
// 	}

// 	// Don't track if it is already running in background
// 	const hasStarted = await Location.hasStartedGeofencingAsync(GEOFENCING_LOCATION_TASK_NAME)
// 	if (hasStarted) {
// 		console.log('Already started')
// 		return
// 	}
// 	console.log(
// 		'🚀 ~ file: HomeScreen.tsx ~ line 157 ~ startGeoFencingUpdate ~ hasStarted',
// 		hasStarted,
// 	)

// 	const regions: LocationRegion[] = data.venuesNearby.map(item => {
// 		return {
// 			identifier: item.id,
// 			latitude: item.Venue.Location.Geometry.latitude,
// 			longitude: item.Venue.Location.Geometry.longitude,
// 			radius: 20,
// 			notifyOnEnter: true,
// 			notifyOnExit: true,
// 			state: LocationGeofencingRegionState.Unknown,
// 		}
// 	})

// 	regions.push({
// 		identifier: '12312',
// 		latitude: 43.4560624,
// 		longitude: -80.4841828,
// 		radius: 50,
// 		notifyOnEnter: true,
// 		notifyOnExit: true,
// 		state: LocationGeofencingRegionState.Outside,
// 	})

// 	await Location.startGeofencingAsync(GEOFENCING_LOCATION_TASK_NAME, [
// 		// MASTER
// 		{
// 			identifier: '1111111MASTER',
// 			latitude: 43.456074,
// 			longitude: -80.483948,
// 			radius: 10,
// 			notifyOnEnter: true,
// 			notifyOnExit: true,
// 		},
// 		// OFFICE
// 		{
// 			identifier: '2222222OFFICE',
// 			latitude: 43.455957,
// 			longitude: -80.483694,
// 			radius: 10,
// 			notifyOnEnter: true,
// 			notifyOnExit: true,
// 		},
// 	])
// }
// // Stop location tracking in background
// const stopGeofencing = async () => {
// 	const hasStarted = await Location.hasStartedGeofencingAsync(GEOFENCING_LOCATION_TASK_NAME)
// 	if (hasStarted) {
// 		await Location.stopGeofencingAsync(GEOFENCING_LOCATION_TASK_NAME)
// 		console.log('Location tacking stopped')
// 	}
// }
