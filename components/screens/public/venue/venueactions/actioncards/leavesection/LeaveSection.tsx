// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useCurrentVenueLazyQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Heading, Button, Icon, HStack } from 'native-base'

export default function LeaveSection() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: {
									...deviceprofile.Profile,
									Personal: {
										...deviceprofile.Profile.Personal,
										LiveOutPersonal: {
											...deviceprofile.Profile.Personal.LiveOutPersonal,
											Out: profile.Personal.LiveOutPersonal.Out,
										},
									},
								},
							},
						})
					}
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileidVenue: params.profileid,
					},
				},
			],
		})

	if (
		rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId ===
		params.profileid
	) {
		return (
			<HStack px={3} mt={5} alignItems={'center'} justifyContent={'space-between'} w={'full'}>
				<Heading fontWeight={'800'} textTransform={'uppercase'} fontSize={'md'}>
					You're joined{'\n'}
					<Heading color={'red.600'} fontWeight={'900'} textTransform={'uppercase'} fontSize={'lg'}>
						Want to Leave?
					</Heading>
				</Heading>
				<Button
					onPress={() => {
						removePersonalJoinsVenueMutation()
					}}
					h={'45px'}
					textAlign={'center'}
					colorScheme={'error'}
					borderRadius={'md'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					leftIcon={<Icon as={Ionicons} name={'ios-exit'} size={'xl'} />}
					isLoading={JVLoading}
					isLoadingText='Leaving'
				>
					Leave
				</Button>
			</HStack>
		)
	} else {
		return null
	}
}
