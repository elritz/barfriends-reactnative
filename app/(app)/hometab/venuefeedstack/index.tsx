import { useReactiveVar } from '@apollo/client'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import {
	ProfileType,
	useUpdateComingAreaToBeNotifiedMutation,
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
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import {
	View,
	Box,
	VStack,
	HStack,
	Text,
	ScrollView,
	Icon,
	Pressable,
	Skeleton,
	Heading,
} from 'native-base'
import { useEffect } from 'react'
import { Dimensions } from 'react-native'
import CountryFlag from 'react-native-country-flag'

export default () => {
	const router = useRouter()
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

	const ListheaderComponent = ({ typename }) => {
		return (
			<Pressable
				onPress={() =>
					router.push({
						pathname: '(app)/searcharea',
					})
				}
			>
				<Box>
					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
						<VenueFeedSignupCard />
					)}
					<VStack safeAreaTop safeAreaBottom space={4} flex={1}>
						<SearchAreaHeader typename={typename || null} city={rSearchAreaVar.searchArea.city.name} />
					</VStack>
				</Box>
			</Pressable>
		)
	}

	const listFooterComponent = () => {
		return null
	}

	if (!data?.venuesNearby || loading) {
		return (
			<MasonryFlashList
				numColumns={2}
				onRefresh={onPullRefresh}
				refreshing={loading}
				estimatedItemSize={6}
				data={[...Array(6)]}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={<ListheaderComponent typename={data?.venuesNearby.__typename} />}
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
			<FlashList
				data={data.venuesNearby.comingAreas}
				overScrollMode='always'
				onRefresh={onPullRefresh}
				refreshing={loading}
				estimatedItemSize={30}
				ListHeaderComponent={<ListheaderComponent typename={data.venuesNearby.__typename} />}
				renderItem={({ item }) => {
					const lengthOfUpvote = item.Vote.filter(item => {
						return item.upvote
					}).length
					return (
						<Box
							key={item.id}
							_dark={{ bg: 'dark.100' }}
							_light={{ bg: 'light.200' }}
							py={4}
							m={2}
							borderRadius={'xl'}
						>
							<HStack justifyContent={'space-between'}>
								<HStack px={3} space={1} alignItems={'center'}>
									<CountryFlag size={12} isoCode={String(item.Area?.Country.isoCode)} />
									<Text fontSize={'xl'}>{item.Area?.City.name}</Text>
									{/* <Text fontSize={'xl'}>{item.}</Text> */}
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
										flexDir={'row'}
										alignItems={'center'}
									>
										<Text fontWeight={'medium'} fontSize={'xl'} mx={2}>
											{lengthOfUpvote}
										</Text>
										<Icon
											name={
												item.Vote.some(
													item =>
														item.profileId === rAuthorizationVar?.DeviceProfile?.Profile?.id && item.upvote,
												)
													? 'thumbs-up'
													: 'thumbs-o-up'
											}
											as={FontAwesome}
											size={'lg'}
											_light={{
												color: item.Vote.some(
													item =>
														item.profileId === rAuthorizationVar?.DeviceProfile?.Profile?.id && item.upvote,
												)
													? 'blue.500'
													: 'light.700',
											}}
											_dark={{
												color: item.Vote.some(
													item =>
														item.profileId === rAuthorizationVar?.DeviceProfile?.Profile?.id && item.upvote,
												)
													? 'blue.500'
													: 'dark.700',
											}}
										/>
									</Pressable>
									<Pressable
										mx={2}
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
											size={'lg'}
											_light={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
												)
													? 'blue.500'
													: 'light.700',
											}}
											_dark={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
												)
													? 'blue.500'
													: 'dark.700',
											}}
										/>
									</Pressable>
								</HStack>
							</HStack>
						</Box>
					)
				}}
			/>
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
