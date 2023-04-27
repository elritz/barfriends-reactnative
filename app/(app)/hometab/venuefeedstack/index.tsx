import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import {
	ProfileType,
	VenuesNearbyResponse,
	useUpvoteH6ComingAreaMutation,
	useUpvoteH6VenueRemmendationMutation,
	useVenuesNearbyLazyQuery,
} from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	PermissionBackgroundLocationReactiveVar,
	PermissionForegroundLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import SearchAreaHeader from '@screens/hometabs/venuesfeed/components/SearchAreaHeader'
import VenueFeedSearchAreaEmptyState from '@screens/hometabs/venuesfeed/components/VenueFeedSearchAreaEmptyState'
import VenueFeedSignupCard from '@screens/hometabs/venuesfeed/components/VenueFeedSignupCard'
import VenueFeedSkeletonLoadingState from '@screens/hometabs/venuesfeed/components/VenuesFeedSkeletonLoadingState'
import VenuesFeedVenuesEmptyState from '@screens/hometabs/venuesfeed/components/VenuesFeedVenuesEmptyState'
import VerticalVenueFeedVenueItem from '@screens/hometabs/venuesfeed/components/VerticalVenueFeedVenueItem'
import ComingAreaItem from '@screens/hometabs/venuesfeed/components/comingarea/ComingAreaItem'
import { useRouter } from 'expo-router'
import {
	View,
	Box,
	VStack,
	FlatList,
	HStack,
	Text,
	ScrollView,
	Icon,
	Pressable,
	Divider,
} from 'native-base'
import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const VenueFeedScreenMarginX = '2'

export default () => {
	const router = useRouter()
	const appStateRef = useRef(AppState.currentState)
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

	const [
		upvoteH6VenueRecommendationMutation,
		{ data: UVRData, loading: UVRLoading, error: UVRError },
	] = useUpvoteH6VenueRemmendationMutation()

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
		onCompleted: data => {
			// console.log('🚀 ~ file: index.tsx:72 ~ data:', JSON.stringify(data, null, 4))
		},
	})

	const [updateComingAreaVoteMutation, { data: UVData, loading: UVLoading, error: UVError }] =
		useUpvoteH6ComingAreaMutation()

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

	if (loading) return null

	if (data?.venuesNearby.__typename === 'ErrorProfiling') {
		return (
			<ScrollView>
				<View>
					<Text>{data.venuesNearby.message}</Text>
				</View>
			</ScrollView>
		)
	}

	if (data?.venuesNearby.__typename === 'ComingAreaResponse') {
		return (
			<ScrollView>
				{data.venuesNearby.comingAreas.map(item => {
					console.log(item.Vote)
					return (
						<Box
							_dark={{ bg: 'dark.100' }}
							_light={{ bg: 'light.100' }}
							py={2}
							mx={2}
							borderRadius={'xl'}
						>
							<HStack justifyContent={'space-between'}>
								<HStack px={3} space={3} alignItems={'center'}>
									<CountryFlag size={18} isoCode={String(item.Area?.Country.isoCode)} />
									<Text fontSize={'xl'}>{item.Area?.City.name}</Text>
								</HStack>
								<HStack space={1}>
									<Pressable
										px={2}
										disabled={UVLoading}
										onPress={() => {
											updateComingAreaVoteMutation({
												variables: {
													comingAreaId: item.id,
												},
											})
										}}
										alignItems={'center'}
									>
										<Icon
											name='md-caret-up'
											as={Ionicons}
											size={'lg'}
											_light={{
												color: item.Vote.some(
													item => item.profileId === rAuthorizationVar?.DeviceProfile?.Profile.id,
												)
													? 'blue.500'
													: 'light.500',
											}}
											_dark={{
												color: item.Vote.some(
													item => item.profileId === rAuthorizationVar?.DeviceProfile?.Profile.id,
												)
													? 'blue.500'
													: 'dark.500',
											}}
										/>
										<Text fontWeight={'medium'} fontSize={'lg'}>
											{item.Vote.length}
										</Text>
									</Pressable>
									<Pressable
										px={2}
										onPress={() => {
											console.log('clicked')
										}}
										alignItems={'center'}
										justifyContent={'center'}
									>
										<Icon
											name='ios-notifications-sharp'
											as={Ionicons}
											size={'md'}
											_light={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile.id,
												)
													? 'blue.500'
													: 'light.400',
											}}
											_dark={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile.id,
												)
													? 'blue.500'
													: 'dark.400',
											}}
										/>
									</Pressable>
								</HStack>
							</HStack>
						</Box>
					)
				})}
			</ScrollView>
		)
	}

	if (data?.venuesNearby.__typename === 'VenuesNearbyResponse') {
		const ListHeaderComponent = (data: VenuesNearbyResponse) => {
			return (
				<VStack safeAreaTop safeAreaBottom space={4} flex={1}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
						<VenueFeedSignupCard />
					)}
					{data.searchArea?.City.name && <SearchAreaHeader city={data.searchArea.City.name} />}
					{rSearchAreaVar?.searchArea.coords.latitude || rSearchAreaVar?.searchArea.coords.longitude ? (
						<Box>{!loading && !data?.venuesNearby.length && <VenuesFeedVenuesEmptyState />}</Box>
					) : (
						<Box></Box>
					)}
				</VStack>
			)
		}

		const listFooterComponent = () => {
			return null
		}

		return (
			<Box
				marginBottom={
					insets.bottom !== 0
						? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
						: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT
				}
			>
				<FlatList
					overScrollMode='always'
					onRefresh={onPullRefresh}
					refreshing={loading}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-around' }}
					data={data?.venuesNearby.venuesNearby}
					renderItem={({ item }) => <VerticalVenueFeedVenueItem loading={loading} item={item} />}
					ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
					keyExtractor={item => item.id}
					ListHeaderComponent={<ListHeaderComponent data={data?.venuesNearby} />}
					ListFooterComponent={listFooterComponent}
					automaticallyAdjustContentInsets
				/>
			</Box>
		)
	}
}