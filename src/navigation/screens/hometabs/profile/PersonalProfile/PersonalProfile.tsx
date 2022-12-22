import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendsList } from '@components/organisms/list/friendslist/FriendsList'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import { GetNotificationsQuery, ProfileType, useGetNotificationsQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image, Button, Divider, Heading, Box, View } from 'native-base'

type Props = {
	notifications: GetNotificationsQuery | undefined
}

const PersonalScreen = ({ notifications }: Props) => {
	const navigation = useNavigation()
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
				<Image
					width={165}
					height={170}
					borderRadius={15}
					source={{ uri: rAuthorizationVar?.DeviceProfile?.Profile?.photos?.url }}
					alt={'Profile Photo'}
				/>
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
				<Button
					onPress={() =>
						navigation.navigate('ProfileEditorNavigator', {
							screen: 'EditableOptionsScreen',
						})
					}
					borderRadius={'lg'}
					width={'80%'}
				>
					Edit Profile
				</Button>
				<Divider style={{ marginVertical: 20 }} />
			</View>
			<CondensedVerticalFriendsNotficationsList
				keyExtractor={item => String(item.id)}
				renderItem={item => <CondensedHorizontalFriendNotifciation item={item} />}
				data={notifications?.getNotifications?.friendRequestNotifications}
			/>
			<Box mx={2}>
				<FriendsList />
			</Box>
		</Box>
	)
}

export default PersonalScreen
