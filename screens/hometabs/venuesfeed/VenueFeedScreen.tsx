import VenueFeedSearchAreaEmptyState from './components/VenueFeedSearchAreaEmptyState'
import VenueFeedSignupCard from './components/VenueFeedSignupCard'
import VenueFeedSkeletonLoadingState from './components/VenuesFeedSkeletonLoadingState'
import VenuesFeedVenuesEmptyState from './components/VenuesFeedVenuesEmptyState'
import { useReactiveVar } from '@apollo/client'
import PreferenceBackgroundLocationPermissionFullSection from '@components/molecules/permissions/preferencelocationpermission/PreferenceBackgroundLocationPermissionFullSection'
import ForegroundLocationPermissionFullSection from '@components/molecules/permissions/preferencelocationpermission/PreferenceForegroundLocationPermissionFullSection'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { FontAwesome5 } from '@expo/vector-icons'
import { ProfileType, ProfileVenue, useVenuesNearbyLazyQuery } from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import VerticalVenueFeedVenueItem from '@screens/hometabs/venuesfeed/components/VerticalVenueFeedVenueItem'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { Box, VStack, FlatList, Heading, HStack, IconButton, Icon } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { AppState, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(handleAppStateChange) check if location permission is enabled and go somewhere with it
// TODO: UX() Workflow isn't quite working good enough for production
// TODO: FN() Get background location changes working

export const VenueFeedScreenMarginX = '2'

const VenueFeedScreen = () => {
	const router = useRouter()
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const { height } = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const [nearbyVenue, setNearbyVenue] = useState<ProfileVenue | null>()

	const [venuesNearby, { data, loading, error }] = useVenuesNearbyLazyQuery({
		variables: {
			searchAreaCoords: {
				latitude: Number(rSearchAreaVar?.searchArea?.coords.latitude),
				longitude: Number(rSearchAreaVar?.searchArea?.coords.longitude),
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
		onError: error => {},
		onCompleted: data => {},
	})

	const onPullRefresh = () => {
		if (rSearchAreaVar?.searchArea?.coords.latitude && rSearchAreaVar?.searchArea?.coords.longitude) {
			venuesNearby()
		}
		if (rSearchAreaVar.useCurrentLocation) {
			if (
				rCurrentLocationVar?.current?.coords.latitude &&
				rCurrentLocationVar?.current?.coords.longitude
			) {
				venuesNearby()
			}
		}
	}

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
			<VStack safeAreaTop w={'full'} space={4}>
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
										<PreferenceBackgroundLocationPermissionFullSection />
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
				{!loading && data?.venuesNearby.searchArea.city.name && (
					<HStack w={'100%'}>
						<VStack w={'full'} space={1} m={2}>
							<Heading lineHeight={'sm'} fontSize={'md'}>
								venues from
							</Heading>
							<Heading lineHeight={'xs'} fontWeight={'black'} fontSize={'2xl'}>
								{data?.venuesNearby.searchArea.city.name}
							</Heading>
						</VStack>
						<IconButton
							icon={<Icon as={FontAwesome5} name='filter' />}
							onPress={() =>
								router.push({
									pathname: '(app)/searcharea',
								})
							}
							rounded={'full'}
							// color={'transparent'}
						/>
					</HStack>
				)}
			</VStack>
		)
	}

	const listFooterComponent = () => {
		return null
	}

	return (
		<FlatList
			onRefresh={onPullRefresh}
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
			automaticallyAdjustContentInsets
			contentInset={{
				top: SEARCH_BAR_HEIGHT + 20,
				left: 0,
				bottom: 105 + insets.bottom,
				right: 0,
			}}
		/>
	)
}

export default VenueFeedScreen
