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
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { HStack, VStack, useTheme } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
const VenueActions = () => {
	const numColumns = 2
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const [isJoined, setIsJoined] = useState(false)

	useEffect(() => {
		const isIncluded = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.map(
			item => item.id,
		).includes(route.params.profileId)
		if (isIncluded) {
			setIsJoined(isIncluded)
		}
	}, [rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out])

	return (
		<VStack m={2} mt={5}>
			<HStack style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
				{ENVIRONMENT === 'development' && (
					<ActionCard numColumns={1}>
						<DevActions />
					</ActionCard>
				)}

				{!isJoined && (
					<HStack space={2}>
						<ActionCard numColumns={numColumns}>
							<UberCard />
						</ActionCard>
						<ActionCard key={'hij'} numColumns={numColumns}>
							<DistanceCard />
						</ActionCard>
					</HStack>
				)}

				{rAuthorizationVar?.DeviceProfile?.Profile?.Personal && <LeaveCard />}

				{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
					<HStack space={2}>
						<ActionCard bg={theme.colors.primary[500]} numColumns={numColumns}>
							<QuickBarfriend logosize={30} qrcodesize={100} />
						</ActionCard>
						<ActionCard numColumns={numColumns}>
							<InviteCard />
						</ActionCard>
					</HStack>
				)}
			</HStack>
		</VStack>
	)
}

export default VenueActions
