import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	ProfileType,
	useUpdateComingAreaToBeNotifiedMutation, // useUpvoteH6ComingAreaMutation,
	useUpdateH6ComingAreaVoteMutation,
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
import VenueFeedSignupCard from '@screens/hometabs/venuesfeed/components/VenueFeedSignupCard'
import VerticalVenueFeedVenueItem from '@screens/hometabs/venuesfeed/components/VerticalVenueFeedVenueItem'
import { MasonryFlashList } from '@shopify/flash-list'
import { View, Box, VStack, HStack, Text, ScrollView, Icon, Pressable, Skeleton } from 'native-base'
import { useEffect } from 'react'
import { Dimensions } from 'react-native'
import CountryFlag from 'react-native-country-flag'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rBackgroundLocationVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)
	const width = Dimensions.get('window').width / 2.15
	const [
		updateH6VenueRecommendationVoteMutation,
		{ data: UVRData, loading: UVRLoading, error: UVRError },
	] = useUpdateH6ComingAreaVoteMutation()

	const [updateToBeNotifiedMutation, { data: UTBNData, loading: UTBNLoading, error: UTBNError }] =
		useUpdateComingAreaToBeNotifiedMutation()

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

	const ListheaderComponent = () => {
		return (
			<VStack safeAreaTop safeAreaBottom space={4} flex={1}>
				{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
					<VenueFeedSignupCard />
				)}
				<SearchAreaHeader city={rSearchAreaVar.searchArea.city.name} />
			</VStack>
		)
	}

	const listFooterComponent = () => {
		return null
	}

	if (!data?.venuesNearby || loading) {
		return (
			<MasonryFlashList
				numColumns={2}
				estimatedItemSize={6}
				data={[...Array(6)]}
				showsVerticalScrollIndicator={false}
				scrollEnabled={false}
				ListHeaderComponent={ListheaderComponent}
				renderItem={({ item }) => {
					return (
						<Skeleton
							h={'260'}
							w={width}
							rounded={'md'}
							style={{
								alignSelf: 'center',
								overflow: 'hidden',
							}}
						/>
					)
				}}
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
			/>
		)
	}

	if (data.venuesNearby.__typename === 'Error') {
		return (
			<ScrollView>
				<View>
					<Text>{data.venuesNearby.message}</Text>
				</View>
			</ScrollView>
		)
	}

	if (data.venuesNearby.__typename === 'ComingAreaResponse') {
		return (
			<ScrollView>
				<ListheaderComponent />
				{data.venuesNearby.comingAreas.map(item => {
					const lengthOfUpvote = item.Vote.filter(item => {
						return item.upvote
					}).length
					return (
						<Box
							_dark={{ bg: 'dark.100' }}
							_light={{ bg: 'light.200' }}
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
										mx={2}
										disabled={UVRLoading}
										onPress={() => {
											updateH6VenueRecommendationVoteMutation({
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
													item =>
														item.profileId === rAuthorizationVar?.DeviceProfile?.Profile?.id && item.upvote,
												)
													? 'blue.500'
													: 'light.500',
											}}
											_dark={{
												color: item.Vote.some(
													item =>
														item.profileId === rAuthorizationVar?.DeviceProfile?.Profile?.id && item.upvote,
												)
													? 'blue.500'
													: 'dark.500',
											}}
										/>
										<Text fontWeight={'medium'} fontSize={'lg'}>
											{lengthOfUpvote}
										</Text>
									</Pressable>
									<Pressable
										mx={4}
										disabled={UTBNLoading}
										onPress={() => {
											updateToBeNotifiedMutation({
												variables: {
													comingAreaId: item.id,
												},
											})
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
													item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
												)
													? 'blue.500'
													: 'light.400',
											}}
											_dark={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
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

	if (data.venuesNearby.__typename === 'VenuesNearbyResponse') {
		return (
			<MasonryFlashList
				overScrollMode='always'
				onRefresh={onPullRefresh}
				refreshing={loading}
				showsVerticalScrollIndicator={false}
				numColumns={2}
				estimatedItemSize={100}
				scrollEnabled
				// columnWrapperStyle={{ justifyContent: 'space-around' }}
				data={data?.venuesNearby.venuesNearby}
				renderItem={({ item, index, columnIndex }) => (
					<VerticalVenueFeedVenueItem
						index={index}
						loading={loading}
						item={item}
						columnIndex={columnIndex}
					/>
				)}
				ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={ListheaderComponent}
				ListFooterComponent={listFooterComponent}
				automaticallyAdjustContentInsets
			/>
		)
	}
}
