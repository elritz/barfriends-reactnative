// TODO: UX() Item need to be updated for messageboard route
// TODO: UX() Item need to be updated for Personal data, loading, error
import ActionCard from './ActionCard'
import DistanceCard from './actioncards/distancecard/DistanceCard'
import InviteCard from './actioncards/invitecard/InviteCard'
import QuickBarfriend from './actioncards/quickbarfriendcard/QuickBarfriendCard'
import UberCard from './actioncards/ubercard/UberCard'
import DevActions from './devactions/DevActions'
import { useReactiveVar } from '@apollo/client'
import { ENVIRONMENT } from '@env'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { Box, HStack, VStack, useTheme } from 'native-base'
import { useEffect, useState } from 'react'

const VenueActions = () => {
	const numColumns = 2
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const [isJoined, setIsJoined] = useState(false)

	useEffect(() => {
		const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
			item => item.venueProfileId === String(params.profileid),
		)
		if (out) {
			setIsJoined(true)
		}
	}, [rAuthorizationVar])

	return (
		<VStack m={2} mt={1}>
			<HStack style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
				{ENVIRONMENT === 'development' && (
					<Box mt={4}>
						<ActionCard key={uniqueId()} numColumns={1}>
							<DevActions />
						</ActionCard>
					</Box>
				)}

				{!isJoined && (
					<HStack space={2} mt={5}>
						<ActionCard h={190} key={uniqueId()} numColumns={numColumns}>
							<UberCard />
						</ActionCard>
						<ActionCard h={190} key={uniqueId()} numColumns={numColumns}>
							<DistanceCard />
						</ActionCard>
					</HStack>
				)}

				{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
					<HStack space={2} mt={5}>
						<ActionCard h={200} key={uniqueId()} bg={theme.colors.primary[500]} numColumns={numColumns}>
							<QuickBarfriend logosize={30} qrcodesize={100} />
						</ActionCard>
						<ActionCard h={200} key={uniqueId()} numColumns={numColumns}>
							<InviteCard />
						</ActionCard>
					</HStack>
				)}
			</HStack>
		</VStack>
	)
}

export default VenueActions
