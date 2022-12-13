import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import { FriendsList } from '@components/organisms/list/friendslist/FriendsList'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import { ProfileType } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image, Button, Divider, Heading, Box, View } from 'native-base'

const PersonalScreen = () => {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	console.log(
		'🚀 ------------------------------------------------------------------------------------------------------------------------------------------------------------------🚀',
	)
	console.log(
		'🚀 ~ file: PersonalProfile.tsx:15 ~ PersonalScreen ~ rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType',
		rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType,
	)
	console.log(
		'🚀 ------------------------------------------------------------------------------------------------------------------------------------------------------------------🚀',
	)

	if (rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest) {
		return (
			<Box my={10} mx={3} flex={1}>
				<View>
					<CardPleaseSignup signupTextId={4} />
					<Divider style={{ marginVertical: 10 }} />
				</View>
			</Box>
		)
	}

	return (
		<Box m={3}>
			<View style={{ alignItems: 'center' }}>
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
			</View>

			<Divider style={{ marginVertical: 20 }} />

			<CondensedVerticalFriendsNotficationsList />

			<Divider style={{ marginVertical: 20 }} />

			<FriendsList />
		</Box>
	)
}

export default PersonalScreen
