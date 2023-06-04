import PersonalAtVenue from './components/peopleatvenue/PersonalAtVenue'
import VenueActions from './components/venueactions/VenueActions'
import VenueHeader from './components/venueheader/VenueHeader'
import VenueTotals from './components/venuetotals/VenueTotals'
import Details from './details/Details'
import { useReactiveVar } from '@apollo/client'
import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { useCurrentVenueQuery } from '@graphql/generated'
import { CurrentLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Text, FlatList, VStack, Heading, Box, Skeleton, HStack } from 'native-base'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const numColumns = 2
const VenueScreen = (props: any) => {
	const { bottom } = useSafeAreaInsets()
	const { width } = useWindowDimensions()
	const itemPadding = (width / 33.33) * numColumns
	const params = useSearchParams()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

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
				<Skeleton h={PUBLIC_VENUE_HEADER_IMAGE_HEIGHT} w={'full'} />
				<VStack rounded='md' px={2} space={2}>
					<Skeleton
						rounded='xl'
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
						rounded='xl'
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
					{[...Array(2)].map(item => {
						return (
							<Skeleton
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
				<HStack rounded='md' px={2} space={2}>
					{[...Array(2)].map(item => {
						return (
							<Skeleton
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

	const HandleEmpty = () => {
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
		<FlatList
			data={[]}
			numColumns={2}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<VStack mb={5}>
					<VenueHeader key={'abc'} loading={loading} photos={data.currentVenue?.photos} />
					<Box
						key={'publicvenues-2kl3b12k3'}
						_light={{
							bg: 'light.100',
						}}
						_dark={{
							bg: 'dark.100',
						}}
						py={4}
						borderBottomRadius={'lg'}
					>
						<Box px={2}>
							<Heading size={'lg'} fontWeight={'black'} numberOfLines={1}>
								{name}
							</Heading>
							<Heading size={'sm'} fontWeight={700} numberOfLines={1}>
								@{username}
							</Heading>
						</Box>
						<VenueTotals />
					</Box>
					<VenueActions key={'kol'} />
				</VStack>
			}
			ListEmptyComponent={!loading && <HandleEmpty />}
			columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
			contentContainerStyle={{ flexGrow: 1 }}
			ListFooterComponent={<Details tags={venueData?.DetailInformation?.Tags} />}
			keyExtractor={item => item}
			renderItem={item => <PersonalAtVenue item={item} />}
			contentInset={{
				bottom: bottom,
			}}
		/>
	)
}

export default VenueScreen
