import VenueFeedSearchAreaEmptyState from './components/VenueFeedSearchAreaEmptyState'
import VenueFeedSignupCard from './components/VenueFeedSignupCard'
import VenuesFeedSearchAreaHeader from './components/VenuesFeedSearchAreaHeader'
import VenueFeedSkeletonLoadingState from './components/VenuesFeedSkeletonLoadingState'
import VenuesFeedVenuesEmptyState from './components/VenuesFeedVenuesEmptyState'
import { useReactiveVar } from '@apollo/client'
import BackgroundLocationPermissionFullSection from '@components/molecules/permissions/locations/locationpermissionfullsection/BackgroundLocationPermissionFullSection'
import ForegroundLocationPermissionFullSection from '@components/molecules/permissions/locations/locationpermissionfullsection/ForegroundLocationPermissionFullSection'
import { HOME_TAB_TOP_NAIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { ProfileType, useVenuesNearbyLazyQuery } from '@graphql/generated'
import VenueFeedVenueItem from '@navigation/screens/hometabs/venuesfeed/components/VenueFeedVenueItem'
import { useIsFocused } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import * as Location from 'expo-location'
import { LocationAccuracy } from 'expo-location'
import { getDistance, orderByDistance } from 'geolib'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { Box, Center, VStack, FlatList, Text, Button } from 'native-base'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AppState, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(handleAppStateChange) check if location permission is enabled and go somewhere with it
// TODO: UX() Workflow isn't quite working good enough for production
// TODO: FN() Get background location changes working

export const VenueFeedScreenMarginX = '2'
const scrollViewItemsMarginY = 5

const VenueFeedScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const [venues, setVenues] = useState([])

	const [venuesNearby, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			latitude: Number(rSearchAreaVar?.searchArea.coords.latitude),
			longitude: Number(rSearchAreaVar?.searchArea.coords.longitude),
			countryIsoCode: rSearchAreaVar?.searchArea.country.isoCode,
			stateIsoCode: rSearchAreaVar?.searchArea.state.isoCode,
		},
		onError: error => {
			console.log('error :>> ', error)
		},
		onCompleted: async data => {
			const status = await Location.getForegroundPermissionsAsync()
			if (status.granted) {
				const currentLocation = await Location.getCurrentPositionAsync({
					accuracy: LocationAccuracy.BestForNavigation,
				})

				const venues = data?.venuesNearby?.venuesNearby.map(item => {
					return {
						...item,
						latitude: item?.Venue?.Location?.Geometry?.latitude,
						longitude: item?.Venue?.Location?.Geometry?.longitude,
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
				setVenues(data?.venuesNearby.venuesNearby)
			}
		},
	})

	const fnMemoed = async () => {
		if (
			rSearchAreaVar?.searchArea.coords.latitude !== undefined &&
			rSearchAreaVar?.searchArea.coords.longitude !== undefined
		) {
			return venuesNearby()
		}
	}

	const memoizedResultes = useMemo(
		async () => await fnMemoed(),
		[rSearchAreaVar?.searchArea.coords.latitude, rSearchAreaVar?.searchArea.coords.longitude],
	)

	useEffect(() => {
		if (
			!data &&
			rSearchAreaVar?.searchArea.coords.latitude &&
			rSearchAreaVar?.searchArea.coords?.longitude
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
			PermissionForegroundLocationReactiveVar(locationpermission)
			if (locationpermission.granted && locationpermission.status === 'granted') {
			}
		}
		appStateRef.current = nextAppState
	}

	const listHeaderComponent = () => {
		return (
			<Center>
				<VStack w={'full'} space={4}>
					{!rSearchAreaVar?.searchArea.coords.latitude ||
					!rSearchAreaVar?.searchArea.coords.longitude ? (
						<VenueFeedSearchAreaEmptyState />
					) : (
						<>
							{loading || (!data && !data?.venuesNearby) ? (
								<VenueFeedSkeletonLoadingState />
							) : (
								<AnimatePresence key={uniqueId()}>
									<Box mx={VenueFeedScreenMarginX} my={scrollViewItemsMarginY}>
										{!rForegroundLocationVar?.granted ? (
											<ForegroundLocationPermissionFullSection />
										) : !rBackgroundLocationVar?.granted ? (
											<BackgroundLocationPermissionFullSection />
										) : null}
									</Box>
								</AnimatePresence>
							)}
						</>
					)}

					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
						<VenueFeedSignupCard />
					)}

					{!loading && data && data?.venuesNearby && <VenuesFeedSearchAreaHeader />}
					{!venues.length && <VenuesFeedVenuesEmptyState />}
				</VStack>
			</Center>
		)
	}

	return (
		<Box>
			<FlatList
				onRefresh={fnMemoed}
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				style={{ height: '100%' }}
				columnWrapperStyle={{ justifyContent: 'space-around' }}
				data={venues}
				renderItem={({ item }) => <VenueFeedVenueItem loading={loading} item={item} />}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={listHeaderComponent}
				ListHeaderComponentStyle={{
					// marginTop: 105,
					paddingTop: HOME_TAB_TOP_NAIGATION_HEIGHT + 15,
				}}
				contentInset={{
					top: 0,
					left: 0,
					bottom: 105 + insets.bottom,
					right: 0,
				}}
			/>
		</Box>
	)
}

export default VenueFeedScreen
