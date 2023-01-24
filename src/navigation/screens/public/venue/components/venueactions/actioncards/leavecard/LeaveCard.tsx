import ActionCard from '../../ActionCard'
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	Profile,
	useProfileLazyQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Heading, Button, VStack, Box, Icon } from 'native-base'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		variables: {
			profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
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
				id: {
					equals: rAuthorizationVar?.DeviceProfile?.Profile?.id,
				},
			},
		},
		onCompleted: data => {
			if (data.profile) {
				const profile = data.profile as Profile
				const deviceManager = rAuthorizationVar as ClientDeviceManager
				const deviceprofile = rAuthorizationVar?.DeviceProfile as ClientDeviceProfile

				AuthorizationReactiveVar({
					...deviceManager,
					DeviceProfile: {
						...deviceprofile,
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
			<ActionCard numColumns={2}>
				<VStack alignItems={'center'} justifyContent={'space-around'} space={3} w={'full'}>
					<Heading fontSize={'md'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
						You've joined here{'\n'}
						<Heading
							fontWeight={'900'}
							color={'red.600'}
							textAlign={'center'}
							textTransform={'uppercase'}
							fontSize={'lg'}
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
							leftIcon={<Icon as={Ionicons} name={'ios-exit'} size={'xl'} />}
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
