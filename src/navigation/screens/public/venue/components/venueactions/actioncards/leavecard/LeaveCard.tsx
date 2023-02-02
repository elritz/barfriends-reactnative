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
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')

	useEffect(() => {
		const joinedToVenue =
			rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
				return item.venueProfileId
			})
		const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
			item => item.venueProfileId === route.params.profileId,
		)
		if (out) {
			setOutId(out.id)
		}
	}, [rAuthorizationVar])

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			variables: {
				outId,
			},
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as ClientDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as ClientDeviceProfile
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
						profileIdVenue: route.params.profileId,
					},
				},
			],
		})

	if (
		rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId ===
		route.params.profileId
	) {
		return (
			<ActionCard numColumns={2}>
				<VStack alignItems={'center'} justifyContent={'space-around'} space={3} w={'full'}>
					<Heading fontSize={'md'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
						You're joined{'\n'}
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
							size={'xs'}
							textAlign={'center'}
							colorScheme={'error'}
							borderRadius={'lg'}
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
					</Box>
				</VStack>
			</ActionCard>
		)
	} else {
		return null
	}
}
