import { FriendsList } from '../friendslist'
import ProfilePhoto from '../profilephoto'
import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import { GetNotificationsQuery, ProfileType } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { Divider, Heading, Box, View } from 'native-base'

type Props = {
	notifications: GetNotificationsQuery | undefined
}

const PersonalScreen = ({ notifications }: Props) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	
	if (rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest) {
		return (
			<Box my={10} mx={3} flex={1}>
				<View>
					<CardPleaseSignup signupTextId={4} />
					<Divider style={{ marginVertical: 20 }} />
				</View>
			</Box>
		)
	}

	return (
		<Box>
			<View style={{ alignItems: 'center', marginVertical: 20 }}>
				<ProfilePhoto photo={rAuthorizationVar?.DeviceProfile?.Profile?.profilePhoto} />
				<View style={{ marginVertical: 20 }}>
					<Heading
						fontSize={'3xl'}
						numberOfLines={2}
						style={{ textTransform: 'capitalize', textAlign: 'center' }}
					>
						{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.fullname}
					</Heading>
					<Heading fontSize={'md'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
						@{rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
					</Heading>
				</View>
				<Divider style={{ marginVertical: 20 }} />
			</View>
			<Box mx={2}>
				<CondensedVerticalFriendsNotficationsList
					keyExtractor={item => String(item.id)}
					renderItem={item => <CondensedHorizontalFriendNotifciation item={item} />}
					data={notifications?.getNotifications?.friendRequestNotifications}
				/>
			</Box>
			<Box mx={2}>
				<FriendsList />
			</Box>
		</Box>
	)
}

export default PersonalScreen
