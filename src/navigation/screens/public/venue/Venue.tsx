import Details from './components/details/Details'
import PersonalAtVenue from './components/peopleatvenue/PersonalAtVenue'
import VenueActions from './components/venueactions/VenueActions'
import VenueHeader from './components/venueheader/VenueHeader'
import VenueTotals from './components/venuetotals/VenueTotals'
import { useCurrentVenueQuery } from '@graphql/generated'
import GenerateUserData from '@helpers/generate/placeholder/GenerateUserData'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, FlatList, VStack } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VenueProfileStackParamList } from 'src/types/app'

export type VenueScreenRouteProp = RouteProp<VenueProfileStackParamList, 'PublicVenueScreen'>

const VenueScreen = (props: any) => {
	const users = GenerateUserData(3)
	const route = useRoute<VenueScreenRouteProp>()
	const { data, loading, error } = useCurrentVenueQuery({
		skip: !route.params.profileId,
		variables: {
			where: {
				id: route.params.profileId,
			},
		},
		onCompleted: data => {},
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

	return (
		<SafeAreaView>
			<FlatList
				// estimatedItemSize={50}
				data={users}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<VStack mb={5}>
						<VenueHeader profileId={props.route.params.profileId} />
						<VenueTotals />
						{/* <LocationPermissionCard /> */}
						<VenueActions />
					</VStack>
				}
				ListEmptyComponent={handleEmpty}
				columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 1 }}
				ListFooterComponent={<Details profileId={props.route.params.profileId} />}
				renderItem={item => <PersonalAtVenue item={item} />}
			/>
		</SafeAreaView>
	)
}

export default VenueScreen
