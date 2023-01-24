import Details from './components/details/Details'
import PersonalAtVenue from './components/peopleatvenue/PersonalAtVenue'
import VenueActions from './components/venueactions/VenueActions'
import VenueHeader from './components/venueheader/VenueHeader'
import VenueTotals from './components/venuetotals/VenueTotals'
import { useReactiveVar } from '@apollo/client'
import { useCurrentVenueQuery } from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Text, FlatList, VStack, Heading, Box, useDisclose } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VenueProfileStackParamList } from 'src/types/app'

export type VenueScreenRouteProp = RouteProp<VenueProfileStackParamList, 'PublicVenueScreen'>

const VenueScreen = (props: any) => {
	// const users = GenerateUserData(3)
	const users = []
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !route.params.profileId,
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
		},
		onError(error) {
			console.log('error :>> ', error)
		},
		onCompleted: data => {
			console.log('🚀 -------------------------------------------------🚀')
			console.log('🚀 ~ file: Venue.tsx:33 ~ VenueScreen ~ data', data)
			console.log('🚀 -------------------------------------------------🚀')
		},
	})

	if (loading || !data) return null

	const handleEmpty = () => {
		return (
			<Text textAlign={'center'} fontSize={'2xl'}>
				{' '}
				No users present!
			</Text>
		)
	}

	const venueData = data?.profile
	const name = venueData?.IdentifiableInformation?.fullname
	const username = venueData?.IdentifiableInformation?.username

	return (
		<SafeAreaView>
			<FlatList
				data={users}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<VStack mb={5}>
						<VenueHeader profileId={props.route.params.profileId} />
						<Box
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
						<VenueActions />
					</VStack>
				}
				// ListEmptyComponent={handleEmpty}
				columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 1 }}
				ListFooterComponent={<Details profileId={props.route.params.profileId} />}
				renderItem={item => <PersonalAtVenue item={item} />}
			/>
		</SafeAreaView>
	)
}

export default VenueScreen
