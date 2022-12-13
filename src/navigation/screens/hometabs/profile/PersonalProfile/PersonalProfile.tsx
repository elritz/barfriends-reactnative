import { useReactiveVar } from '@apollo/client'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { FriendsList } from '@components/organisms/list/friendslist/FriendsList'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import {
	DeviceManager,
	DeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image, Button, Divider, Heading, Box, View, ScrollView, Pressable } from 'native-base'
import { useState } from 'react'

const PersonalScreen = () => {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<DeviceProfile>>([])

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
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles
				setProfiles(deviceProfiles)
			}
		},
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

	if (rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === ProfileType.Guest) {
		return (
			<Box my={10} mx={3} flex={1}>
				<View>
					<CardPleaseSignup signupTextId={4} />
					<Divider style={{ marginVertical: 10 }} />
				</View>
				<View style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
						{profiles.length ? (
							<>
								{profiles?.map((item, index) => {
									if (item.Profile?.ProfileType === ProfileType.Guest) {
										return null
									}
									return (
										<Pressable key={item.id} onPress={() => switchProfile(item)} w={'100%'} h={'80px'}>
											<DeviceManagerProfileItemLarge
												item={item.Profile}
												isActive={item.isActive}
												loading={SWDPLoading}
												selectedProfileId={rAuthorizationVar.DeviceProfile?.Profile?.id}
											/>
										</Pressable>
									)
								})}
							</>
						) : null}
					</ScrollView>
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
					source={{ uri: profile?.photos?.url }}
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
