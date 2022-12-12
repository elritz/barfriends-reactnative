import ActionCard from '../../ActionCard'
import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	Profile,
	useProfileLazyQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Heading, Button, VStack, Box } from 'native-base'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		variables: {
			profileIdPersonal: rAuthorizationVar?.DeviceProfile?.Profile?.id,
			profileIdVenue: route.params.profileId,
		},
		onCompleted: async () => {
			profileQuery()
		},
		refetchQueries: [
			{
				query: GET_LIVE_VENUE_TOTALS_QUERY,
				variables: {
					profileIdVenue: route.params.profileId,
				},
			},
		],
	})

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery({
		variables: {
			where: {
				id: rAuthorizationVar?.DeviceProfile?.Profile?.id,
			},
		},
		onCompleted: data => {
			if (data.profile) {
				const profile = data.profile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar?.DeviceProfile,
						Profile: profile,
					},
				})
			}
		},
	})
	if (
		rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.joined[0]
			?.venueProfileId === route.params.profileId
	) {
		return (
			<ActionCard numColumns={1}>
				<VStack alignItems={'center'} justifyContent={'space-around'} space={3} w={'full'}>
					<Heading fontSize={'lg'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
						You've joined here{'\n'}
						<Heading
							fontWeight={'900'}
							color={'red.600'}
							textAlign={'center'}
							textTransform={'uppercase'}
						>
							Leave now
						</Heading>
					</Heading>
					<Box>
						<Button
							onPress={() => {
								removePersonalJoinsVenueMutation()
							}}
							textAlign={'center'}
							colorScheme={'error'}
							borderRadius={'lg'}
							_text={{
								fontWeight: '700',
								fontSize: 'md',
							}}
							w={'100'}
						>
							Leave
						</Button>
					</Box>
				</VStack>
			</ActionCard>
		)
	} else {
		return null
	}
}
