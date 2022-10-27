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
import { Button, VStack, Box } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isLeaving, setIsLeaving] = useState(false)
	const [isJoined, setIsJoined] = useState(false)

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			variables: {
				profileIdPersonal: rAuthorizationVar.DeviceProfile.Profile?.id,
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
				id: rAuthorizationVar.DeviceProfile.Profile?.id,
			},
		},
		onCompleted: data => {
			if (data.profile) {
				const profile = data.profile as Profile
				AuthorizationReactiveVar({
					...rAuthorizationVar,
					DeviceProfile: {
						...rAuthorizationVar.DeviceProfile,
						Profile: profile,
					},
				})
			}
		},
	})

	useEffect(() => {
		if (rAuthorizationVar.DeviceProfile.Profile.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal.LiveOutPersonal.joined.map(item => {
					return item.venueProfileId
				})

			setIsJoined(joinedToVenue.includes(route.params.profileId))
		}
	}, [rAuthorizationVar, isJoined])

	return (
		<VStack>
			<Box>
				<Button
					onPress={() => {
						removePersonalJoinsVenueMutation()
					}}
					textAlign={'center'}
					backgroundColor={'red.600'}
					borderRadius={'lg'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					isDisabled={!isJoined}
					w={'100'}
				>
					{isLeaving ? 'Leaving' : 'Leave'}
				</Button>
			</Box>
		</VStack>
	)
}
