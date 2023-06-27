import { useReactiveVar } from '@apollo/client'
import { Box, VStack, HStack, Text, Pressable } from '@components/core'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import SearchAreaHeader from '@components/screens/venuesfeed/SearchAreaHeader'
import VenueFeedSearchAreaEmptyState from '@components/screens/venuesfeed/VenueFeedSearchAreaEmptyState'
import MemoizedVerticalVenueFeedVenueItem from '@components/screens/venuesfeed/VerticalVenueFeedVenueItem'
import DevActions from '@components/screens/venuesfeed/devactions'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { ENVIRONMENT } from '@env'
import { Ionicons } from '@expo/vector-icons'
import {
	ProfileType,
	useUpdateComingAreaToBeNotifiedMutation,
	useUpdateH6ComingAreaVoteMutation,
	useVenuesNearbyLazyQuery,
} from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { Icon, Skeleton } from 'native-base'
import { useEffect } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
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
			<Box bg={'transparent'} p={'$2'}>
				{ENVIRONMENT === 'development' && <DevActions />}

				<VStack bg={'transparent'} space={'md'}>
					{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest && (
						<Box my={2} p={'$5'} pt={25}>
							<CardPleaseSignup signupTextId={1} />
						</Box>
					)}
					{!rSearchAreaVar.searchArea.city.name && !typename && <VenueFeedSearchAreaEmptyState />}
					{rSearchAreaVar.searchArea.city.name && <SearchAreaHeader typename={typename || null} />}
				</VStack>
			</Box>
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
				estimatedItemSize={260}
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
							speed={0.95}
							_light={{
								startColor: 'coolGray.100',
								endColor: 'coolGray.300',
							}}
							_dark={{
								startColor: 'dark.200',
								endColor: 'dark.300',
							}}
						/>
					)
				}}
				ItemSeparatorComponent={() => <Box h={'$12'} />}
			/>
		)
	}

	if (data.venuesNearby.__typename === 'Error') {
		return (
			<ScrollView>
				<Text>{data.venuesNearby.message}</Text>
			</ScrollView>
		)
	}

	if (data.venuesNearby.__typename === 'ComingAreaResponse') {
		return (
			<FlashList
				data={data.venuesNearby.comingAreas}
				overScrollMode='always'
				keyExtractor={(item, index) => index.toString()}
				onRefresh={onPullRefresh}
				refreshing={loading}
				estimatedItemSize={30}
				ListHeaderComponent={<ListheaderComponent typename={data.venuesNearby.__typename} />}
				renderItem={({ item }) => {
					const lengthOfUpvote = item.Vote.filter(item => {
						return item.upvote
					}).length
					return (
						<Box key={item.id} py={1} m={'$2'} rounded={'$xl'}>
							<HStack flex={1} justifyContent={'space-between'}>
								<HStack px={'$3'} space={'md'} alignItems={'center'}>
									<CountryFlag size={12} isoCode={String(item.Area?.Country.isoCode)} />
									<Text fontSize={'$xl'}>{item.Area?.City.name}</Text>
								</HStack>
								<HStack h={'50px'} space={'md'} justifyContent={'flex-end'}>
									<Pressable
										onPress={() => {
											updateH6VenueRecommendationVoteMutation({
												variables: {
													comingAreaId: item.id,
												},
											})
										}}
										flexDirection={'row'}
										alignItems={'center'}
									>
										<Text fontWeight={'$medium'} fontSize={'$xl'} mx={'$2'} textAlign={'right'}>
											{lengthOfUpvote}
										</Text>
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
									</Pressable>
									<Pressable
										px={2}
										w={'50px'}
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
													? 'primary.500'
													: 'light.700',
											}}
											_dark={{
												color: item.toBeNotifiedProfileIds.some(
													item => item === rAuthorizationVar?.DeviceProfile?.Profile?.id,
												)
													? 'primary.500'
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
				contentInset={{
					top: insets.top + 10,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				data={data?.venuesNearby.venuesNearby}
				renderItem={({ item, index, columnIndex }) => (
					<MemoizedVerticalVenueFeedVenueItem index={index} item={item} columnIndex={columnIndex} />
				)}
				ItemSeparatorComponent={() => <Box h={'$12'} />}
				keyExtractor={item => item.id}
				ListHeaderComponent={ListheaderComponent}
				ListFooterComponent={listFooterComponent}
				automaticallyAdjustContentInsets
			/>
		)
	}
}
