import Details from './components/details/Details'
import PersonalAtVenue from './components/peopleatvenue/PersonalAtVenue'
import VenueActions from './components/venueactions/VenueActions'
import VenueHeader from './components/venueheader/VenueHeader'
import VenueTotals from './components/venuetotals/VenueTotals'
import { useReactiveVar } from '@apollo/client'
import { HOME_TAB_BOTTOM_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { useCurrentVenueQuery } from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	CurrentLocationReactiveVar,
	SearchAreaReactiveVar,
} from '@reactive'
import { Text, FlatList, VStack, Heading, Box, useDisclose } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VenueProfileStackParamList } from 'src/types/app'

export type VenueScreenRouteProp = RouteProp<VenueProfileStackParamList, 'PublicVenueScreen'>

const VenueScreen = (props: any) => {
	const route = useRoute<VenueScreenRouteProp>()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rCurrentLocationVar = useReactiveVar(CurrentLocationReactiveVar)

	console.log(route.params.profileId)

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !route.params.profileId,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
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
		onError(error) {
			console.log('error :>> ', error)
		},
		onCompleted: data => {},
	})

	if (loading || !data?.currentVenue) return null

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
		<SafeAreaView>
			<FlatList
				data={[]}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<VStack mb={5}>
						<VenueHeader key={'abc'} loading={loading} photos={data.currentVenue?.photos} />
						<Box
							key={'edf'}
							_light={{
								bg: 'light.50',
							}}
							_dark={{
								bg: 'dark.50',
							}}
							py={4}
							borderBottomRadius={'lg'}
						>
							<Box px={2}>
								<Heading size={'md'} numberOfLines={1}>
									{name}
								</Heading>
								<Heading size={'sm'} fontWeight={900} numberOfLines={1}>
									@{username}
								</Heading>
							</Box>
							<VenueTotals />
						</Box>
						{/* <LocationPermissionCard /> */}
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
					bottom: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
			/>
		</SafeAreaView>
	)
}

export default VenueScreen
