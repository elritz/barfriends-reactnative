import CurrentVenue from './components/CurrentVenue'
import HorizontalVenueFeedVenueItem from './components/HorizontalVenueFeedVenueItem'
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
import VerticalVenueFeedVenueItem from '@navigation/screens/hometabs/venuesfeed/components/VerticalVenueFeedVenueItem'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import { log } from 'console'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { Box, VStack, FlatList, Heading } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { AppState, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(handleAppStateChange) check if location permission is enabled and go somewhere with it
// TODO: UX() Workflow isn't quite working good enough for production
// TODO: FN() Get background location changes working

export const VenueFeedScreenMarginX = '2'

const VenueFeedScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

	const [venuesNearby, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			searchAreaCoords: {
				latitude: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
			countryIsoCode: String(rSearchAreaVar?.searchArea.country.isoCode),
			stateIsoCode: String(rSearchAreaVar?.searchArea.state.isoCode),
		},
		onError(error) {},
		onCompleted(data) {},
	})
	// useEffect(() => {
	// 	const subscription = AppState.addEventListener('change', handleAppStateChange)
	// 	return () => {
	// 		subscription.remove()
	// 	}
	// }, [])

	useEffect(() => {
		if (
			!data?.venuesNearby &&
			rSearchAreaVar?.searchArea.coords.latitude &&
			rSearchAreaVar?.searchArea.coords?.longitude
		) {
			venuesNearby()
		}
	}, [])

	const listHeaderComponent = () => {
		return (
			<VStack w={'full'} space={4}>
				{!loading && data && data?.venuesNearby && <VenuesFeedSearchAreaHeader />}
				{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
					<VenueFeedSignupCard />
				)}
				{!rSearchAreaVar?.searchArea.coords.latitude || !rSearchAreaVar?.searchArea.coords.longitude ? (
					<VenueFeedSearchAreaEmptyState />
				) : (
					<>
						{!data?.venuesNearby || loading ? (
							<VenueFeedSkeletonLoadingState />
						) : (
							<AnimatePresence key={uniqueId()}>
								<Box
									mx={VenueFeedScreenMarginX}
									//  my={scrollViewItemsMarginY}
								>
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

				{rSearchAreaVar?.searchArea.coords.latitude || rSearchAreaVar?.searchArea.coords.longitude ? (
					<Box>
						{!loading && !data?.venuesNearby.venuesNearby.length && <VenuesFeedVenuesEmptyState />}
					</Box>
				) : (
					<Box></Box>
				)}
			</VStack>
		)
	}

	const listFooterComponent = () => {
		return (
			<>
				{!loading && data?.venuesNearby.searchArea.city.name && (
					<VStack w={'full'} space={1} m={2}>
						<Heading lineHeight={'sm'} fontSize={'md'}>
							venues from
						</Heading>
						<Heading lineHeight={'xs'} fontWeight={'black'} fontSize={'2xl'}>
							{data?.venuesNearby.searchArea.city.name}
						</Heading>
					</VStack>
				)}
			</>
		)
	}

	return (
		<SafeAreaView>
			<FlatList
				onRefresh={venuesNearby}
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				style={{ height: '100%' }}
				columnWrapperStyle={{ justifyContent: 'space-around' }}
				data={data?.venuesNearby.venuesNearby}
				renderItem={({ item }) => <VerticalVenueFeedVenueItem loading={loading} item={item} />}
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={listHeaderComponent}
				ListFooterComponent={listFooterComponent}
				ListHeaderComponentStyle={{
					paddingTop: HOME_TAB_TOP_NAIGATION_HEIGHT,
				}}
				contentInset={{
					top: 0,
					left: 0,
					bottom: 105 + insets.bottom,
					right: 0,
				}}
			/>
		</SafeAreaView>
	)
}

export default VenueFeedScreen
