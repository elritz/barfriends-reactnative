import { useReactiveVar } from '@apollo/client'
import Details from '@components/screens/public/venue/details/Details'
import PersonalAtVenue from '@components/screens/public/venue/peopleatvenue/PersonalAtVenue'
import VenueActions from '@components/screens/public/venue/venueactions/VenueActions'
import LeaveCard from '@components/screens/public/venue/venueactions/actioncards/leavecard/LeaveCard'
import VenueHeader from '@components/screens/public/venue/venueheader/VenueHeader'
import VenueTotals from '@components/screens/public/venue/venuetotals/VenueTotals'
import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import { useCurrentVenueQuery } from '@graphql/generated'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { Text, VStack, Heading, Box, Skeleton, HStack, Icon, IconButton } from 'native-base'
import { Alert, Platform, Share, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const numColumns = 2

export default () => {
	const { bottom } = useSafeAreaInsets()
	const { width } = useWindowDimensions()
	const itemPadding = (width / 33.33) * numColumns
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

	// const link = `barfriends://(app)/public/venue?profileid=${params.profileid}`
	const link = `https://barfriends.com/(app)/public/venue?profileid=${params.profileid}`

	const onShare = async () => {
		try {
			const result = await Share.share(
				{
					message: 'Barfriends | The nightlife app',
					url: Platform.OS === 'ios' ? link : '',
				},
				{
					dialogTitle: 'Join me on Barfriends',
					subject: 'Invite to Barfriends',
				},
			)
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message)
		}
	}

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !params.profileid,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
				},
			},
			currentLocationCoords: {
				latitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.latitude)
					: Number(rSearchAreaVar?.searchArea.coords.latitude),
				longitude: rSearchAreaVar.useCurrentLocation
					? Number(rCurrentLocationVar?.current?.coords.longitude)
					: Number(rSearchAreaVar?.searchArea.coords.longitude),
			},
		},
	})

	if (loading || !data?.currentVenue) {
		return (
			<VStack flex={1} space={2}>
				<Skeleton
					_light={{
						startColor: 'coolGray.100',
						endColor: 'coolGray.300',
					}}
					_dark={{
						startColor: 'dark.200',
						endColor: 'dark.300',
					}}
					key={uniqueId()}
					h={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
					w={'full'}
				/>
				<VStack rounded='md' px={2} space={2}>
					<Skeleton
						key={uniqueId()}
						rounded='md'
						h={'30px'}
						width={'3/4'}
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
					<Skeleton
						key={uniqueId()}
						rounded='md'
						h={'30px'}
						width={'1/4'}
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
				</VStack>
				<HStack rounded='md' px={2} space={2}>
					{[...Array(2)].map((item, index) => {
						return (
							<Skeleton
								key={uniqueId()}
								rounded='xl'
								h={'200px'}
								width={(width - itemPadding) / numColumns}
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
					})}
				</HStack>
				<HStack rounded='md' px={2} space={2}>
					{[...Array(2)].map((item, index) => {
						return (
							<Skeleton
								key={uniqueId()}
								rounded='xl'
								h={'220px'}
								width={(width - itemPadding) / numColumns}
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
					})}
				</HStack>
				<Skeleton
					key={uniqueId()}
					h={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT}
					w={'full'}
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
			</VStack>
		)
	}

	const HandleEmptyUsers = () => {
		return (
			<Text textAlign={'center'} fontSize={'2xl'}>
				{' '}
				No users present!
			</Text>
		)
	}

	const venueData = data.currentVenue
	const name = venueData.IdentifiableInformation?.fullname
	const username = venueData.IdentifiableInformation?.username

	return (
		<FlashList
			data={[]}
			estimatedItemSize={200}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<VStack mb={5}>
					<VenueHeader key={uniqueId()} loading={loading} photos={data.currentVenue?.photos} />
					<Box
						key={uniqueId()}
						_light={{
							bg: 'light.100',
						}}
						_dark={{
							bg: 'dark.100',
						}}
						py={4}
						borderBottomRadius={'lg'}
					>
						<HStack px={2} justifyContent={'space-between'}>
							<Box>
								<Heading size={'lg'} fontWeight={'black'} numberOfLines={1}>
									{name}
								</Heading>
								<Heading size={'sm'} fontWeight={700} numberOfLines={1}>
									@{username}
								</Heading>
							</Box>
							<IconButton
								bg={'transparent'}
								icon={
									<Icon
										as={Ionicons}
										name={'share'}
										_light={{
											color: 'light.700',
										}}
										_dark={{
											color: 'dark.700',
										}}
									/>
								}
								onPress={onShare}
								alignSelf={'center'}
								variant={'solid'}
								size={'lg'}
								h={'40px'}
								w={'40px'}
								fontSize={'lg'}
							/>
						</HStack>
						<VenueTotals />
						<LeaveCard />
					</Box>
					<VenueActions key={uniqueId()} />
				</VStack>
			}
			ListEmptyComponent={!loading && <HandleEmptyUsers />}
			ListFooterComponent={<Details tags={venueData?.DetailInformation?.Tags} />}
			keyExtractor={(item, index) => index.toString()}
			renderItem={item => <PersonalAtVenue item={item} />}
			contentInset={{
				bottom: bottom,
			}}
		/>
	)
}
