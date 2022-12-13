import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import { FriendsList } from '@components/organisms/list/friendslist/FriendsList'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import {
	DeviceManager,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image, Button, Divider, Heading, Box, View } from 'native-base'

const PersonalScreen = () => {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [switchDeviceProfile, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data?.switchDeviceProfile?.__typename == 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
	})

	const logoutProfile = item => {
		console.log('LOG OUT')
		switchDeviceProfile()
	}

	const switchProfile = item => {
		switchDeviceProfile({
			variables: {
				profileId: item.Profile.id,
				profileType: item.Profile.profileType,
			},
		})
	}

	if (loading) {
		return null
	}

	const profile = rAuthorizationVar?.DeviceProfile?.Profile

	if (
		!rAuthorizationVar?.DeviceProfile?.Profile?.Personal &&
		!rAuthorizationVar?.DeviceProfile?.Profile?.Venue
	) {
		if (data?.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
			const deviceProfiles = data.getADeviceManager.DeviceProfiles
			const filteredDeviceProfiles = deviceProfiles?.filter(item => {
				if (!item?.Profile) {
					return null
				}
				if (!item.Profile.Personal && !item.Profile.Venue) {
					return null
				}
				return item
			})
			return (
				<Box my={10} mx={3} flex={1}>
					<View>
						<CardPleaseSignup signupTextId={4} />
						<Divider style={{ marginVertical: 10 }} />
					</View>
					{/* <View style={{ width: '95%', alignSelf: 'center' }}>
						{filteredDeviceProfiles?.map((item, index) => {
							return (
								<Pressable
									key={item?.id}
									onPress={() => (item?.isActive ? logoutProfile(item) : switchProfile(item))}
								>
									<DeviceManagerProfileItemLarge
										isActive={item?.isActive}
										item={item?.Profile as Profile}
										loading={SWDPLoading}
									/>
								</Pressable>
							)
						})}
					</View> */}
				</Box>
			)
		}
	}

	return (
		<Box m={3}>
			<View style={{ alignItems: 'center' }}>
				<Image
					width={165}
					height={170}
					borderRadius={15}
					source={{ uri: profile?.photos[0].url }}
					alt={'Profile Photo'}
				/>
				<View style={{ marginVertical: 20 }}>
					<Heading
						fontSize={'3xl'}
						numberOfLines={2}
						style={{ textTransform: 'capitalize', textAlign: 'center' }}
					>
						{profile?.IdentifiableInformation?.fullname}
					</Heading>
					<Heading fontSize={'md'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
						@{profile?.IdentifiableInformation?.username}
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
