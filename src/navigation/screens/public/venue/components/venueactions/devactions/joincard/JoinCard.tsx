import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	LiveOutPersonal,
	Out,
	Profile,
	useAddPersonalJoinsVenueMutation,
	useProfileLazyQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, VStack, Box, CheckCircleIcon } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function JoinCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isJoined, setIsJoined] = useState(false)

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})
			setIsJoined(joinedToVenue.includes(route.params.profileId))
		}
	}, [])

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: route.params.profileId,
				profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					const profile = data.addPersonalJoinsVenue as Profile
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
					setIsJoined(true)
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

	const [
		removePersonalJoinsVenueMutation,
		{ data: RPJVData, loading: RPJVLoading, error: RPJVError },
	] = useRemovePersonalJoinsVenueMutation({
		variables: {
			profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
			profileIdVenue: route.params.profileId,
		},
		onCompleted: async () => {
			setIsJoined(false)
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

	return (
		<VStack>
			<Box>
				<Button
					onPress={() => {
						if (rAuthorizationVar?.DeviceProfile) {
							isJoined ? removePersonalJoinsVenueMutation() : addPersonalJoinVenueMutation()
						}
					}}
					isLoading={JVLoading || RPJVLoading}
					colorScheme={'primary'}
					borderRadius={'lg'}
					textAlign={'center'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					w={'100'}
					rightIcon={isJoined && <CheckCircleIcon size='5' mt='0.5' color='white' />}
				>
					{!JVLoading ? <>{isJoined ? 'Joined' : 'Join'}</> : 'Joining'}
				</Button>
			</Box>
		</VStack>
	)
}
