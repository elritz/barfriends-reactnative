import { VenueScreenRouteProp } from '../../Venue'
import ActionCard from './ActionCard'
import DistanceCard from './actioncards/distancecard/DistanceCard'
import InviteCard from './actioncards/invitecard/InviteCard'
import LeaveCard from './actioncards/leavecard/LeaveCard'
import QuickBarfriend from './actioncards/quickbarfriendcard/QuickBarfriendCard'
import UberCard from './actioncards/ubercard/UberCard'
import DevActions from './devactions/DevActions'
import { useReactiveVar } from '@apollo/client'
import { ENVIRONMENT } from '@env'
import { useCurrentVenueQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { HStack, VStack } from 'native-base'

// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
const VenueActions = () => {
	const numColumns = 2
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		data: PData,
		loading: PLoading,
		error: PError,
	} = useCurrentVenueQuery({
		skip: !route.params.profileId || !rAuthorizationVar,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				id: {
					equals: route.params.profileId,
				},
			},
		},
		onCompleted: data => {
			if (data?.profile?.Venue?.LiveOutVenue) {
				const peopleAtVenue = data.profile.Venue.LiveOutVenue.joined.some(item => {
					item.personalProfileId === rAuthorizationVar?.DeviceProfile?.Profile?.id
				})
			}
		},
	})
	if (PLoading) return null

	return (
		<VStack m={1} mt={5}>
			<HStack style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
				<HStack space={2}>
					<ActionCard numColumns={numColumns}>
						<UberCard />
					</ActionCard>
					<ActionCard numColumns={numColumns}>
						<DistanceCard />
					</ActionCard>
				</HStack>

				{rAuthorizationVar?.DeviceProfile?.Profile?.Personal && <LeaveCard />}

				{ENVIRONMENT === 'development' && (
					<ActionCard numColumns={1}>
						<DevActions />
					</ActionCard>
				)}

				<HStack space={2}>
					<ActionCard bg={'#ff7000'} numColumns={numColumns}>
						<QuickBarfriend logosize={30} qrcodesize={100} />
					</ActionCard>
					<ActionCard numColumns={numColumns}>
						<InviteCard />
					</ActionCard>
				</HStack>
			</HStack>
		</VStack>
	)
}

export default VenueActions
