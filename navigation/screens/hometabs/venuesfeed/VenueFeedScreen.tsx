import VenueFeedSearchAreaEmptyState from './components/VenueFeedSearchAreaEmptyState'
import VenueFeedSignupCard from './components/VenueFeedSignupCard'
import VenueFeedSkeletonLoadingState from './components/VenuesFeedSkeletonLoadingState'
import VenuesFeedVenuesEmptyState from './components/VenuesFeedVenuesEmptyState'
import { useReactiveVar } from '@apollo/client'
import ForegroundLocationPermissionFullSection from '@components/molecules/permissions/preferencelocationpermission/PreferencceForegroundLocationPermissionFullSection'
import PreferenceBackgroundLocationPermissionFullSection from '@components/molecules/permissions/preferencelocationpermission/PreferenceBackgroundLocationPermissionFullSection'
import { ProfileType, ProfileVenue, useVenuesNearbyLazyQuery } from '@graphql/generated'
import VerticalVenueFeedVenueItem from '@navigation/screens/hometabs/venuesfeed/components/VerticalVenueFeedVenueItem'
import UberButton from '@navigation/screens/public/venue/components/venueactions/actioncards/ubercard/UberButton'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import { Image } from 'expo-image'
import { uniqueId } from 'lodash'
import { AnimatePresence } from 'moti'
import { Box, VStack, FlatList, Heading, HStack } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { AppState, View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(handleAppStateChange) check if location permission is enabled and go somewhere with it
// TODO: UX() Workflow isn't quite working good enough for production
// TODO: FN() Get background location changes working

export const VenueFeedScreenMarginX = '2'

const VenueFeedScreen = () => {
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
			venuesNearby({
				onCompleted: data => {
					console.log('🚀 ~ file: VenueFeedScreen.tsx:66 ~ onCompleted ~ nearbyVenue:', data)
				},
			})
		}
	}, [])

	const listHeaderComponent = () => {
		return (
			<VStack w={'full'} space={4}>
				{/* <VStack h={height * 0.6}>
					<Image
						style={{
							flex: 1,
							width: '100%',
							backgroundColor: '#0553',
						}}
						source='https://picsum.photos/seed/696/3000/2000'
						placeholder={blurhash}
						contentFit='cover'
						transition={1000}
					/>
					<Box
						px={2}
						py={3}
						_dark={{ backgroundColor: 'dark.50' }}
						_light={{ backgroundColor: 'light.50' }}
					>
						<Box>
							<Heading size={'lg'} fontWeight={'black'} numberOfLines={1}>
								THE SHED
							</Heading>
							<Heading size={'sm'} fontWeight={700} numberOfLines={1}>
								#THE SHED
							</Heading>
						</Box>
						<HStack pt={3}>
							<UberButton params={{ profileid: 'VENUE ID' }} />
							<UberButton params={{ profileid: 'VENUE ID' }} />
						</HStack>
					</Box>
				</VStack> */}
				{/* {<VenuesFeedSearchAreaHeader />} */}
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
		<FlatList
			onRefresh={onPullRefresh}
			refreshing={loading}
			showsVerticalScrollIndicator={false}
			numColumns={2}
			style={{ height: '100%', marginTop: insets.top + 20 }}
			columnWrapperStyle={{ justifyContent: 'space-around' }}
			data={data?.venuesNearby.venuesNearby}
			renderItem={({ item }) => <VerticalVenueFeedVenueItem loading={loading} item={item} />}
			ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
			keyExtractor={item => item.id}
			ListHeaderComponent={listHeaderComponent}
			ListFooterComponent={listFooterComponent}
			contentInset={{
				top: 0,
				left: 0,
				bottom: 105 + insets.bottom,
				right: 0,
			}}
		/>
	)
}

export default VenueFeedScreen
