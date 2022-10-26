import { useReactiveVar } from '@apollo/client'
import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import CardPleaseSignup from '@components/molecules/asks/signuplogin/SignupLogin'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import { FriendsList } from '@components/organisms/list/friendslist/FriendsList'
import CondensedVerticalFriendsNotficationsList from '@components/organisms/list/notifications/friends/CondensedVerticalFriendsNotficationsList'
import {
	DeviceManager,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Image, Divider } from '@rneui/themed'
import { Button, Heading, Text } from 'native-base'
import { useContext, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { ThemeContext } from 'styled-components/native'

const PersonalScreen = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const [switchDeviceProfile, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data.switchDeviceProfile.__typename == 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
	})

	const logoutProfile = item => {
		setSelectedProfileId(item.Profile.id)
		switchDeviceProfile()
	}

	const switchProfile = item => {
		setSelectedProfileId(item.Profile.id)
		switchDeviceProfile({
			variables: {
				profileId: item.Profile.id,
			},
		})
	}

	if (loading) {
		return null
	}

	const profile = rAuthorizationVar.DeviceProfile.Profile
	console.log(
		'🚀 ~ file: PersonalProfile.tsx ~ line 62 ~ PersonalScreen ~ profile',
		!rAuthorizationVar.DeviceProfile.Profile.Personal,
	)

	if (
		!rAuthorizationVar.DeviceProfile.Profile.Personal &&
		!rAuthorizationVar.DeviceProfile.Profile.Venue
	) {
		return (
			<SafeAreaView style={{ flex: 1, marginBottom: 60, marginHorizontal: 10 }}>
				<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
					<CardPleaseSignup signupTextId={4} />
					<Divider style={{ marginVertical: 10 }} />
				</ScrollView>
			</SafeAreaView>
		)
	}

	if (!rAuthorizationVar.DeviceProfile.Profile.id && !loading) {
		if (data.getADeviceManager.__typename === 'DeviceManagerDeviceProfiles') {
			const deviceProfiles = data.getADeviceManager.DeviceProfiles
			return (
				<SafeAreaView style={{ flex: 1, marginBottom: 60, marginHorizontal: 10 }}>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
						<View style={[{ backgroundColor: themeContext.palette.primary.background, top: 0 }]}>
							<CardPleaseSignup signupTextId={4} />
							<Divider style={{ marginVertical: 10 }} />
						</View>
						<View style={{ width: '95%', alignSelf: 'center' }}>
							{deviceProfiles.map((item, index) => {
								if (!item.Profile.id) return null
								return (
									<Pressable
										key={item.id}
										onPress={() => (!item.isActive ? switchProfile(item) : logoutProfile(item))}
									>
										<DeviceManagerProfileItemLarge
											isActive={item.isActive}
											item={item.Profile}
											loading={SWDPLoading}
											selectedProfileId={selectedProfileId}
										/>
									</Pressable>
								)
							})}
						</View>
					</ScrollView>
				</SafeAreaView>
			)
		}
	}

	return (
		<OuterView contentInset={{ top: 0, left: 0, bottom: 90, right: 0 }}>
			<View style={{ alignItems: 'center' }}>
				<Image
					style={{ width: 165, height: 170, borderRadius: 15 }}
					source={{ uri: profile.photos[0].url }}
				/>
				<View style={{ marginVertical: 20 }}>
					<Heading
						fontSize={'3xl'}
						numberOfLines={2}
						style={{ textTransform: 'capitalize', textAlign: 'center' }}
					>
						{profile.IdentifiableInformation.fullname}
					</Heading>
					<Heading fontSize={'md'} style={{ textTransform: 'uppercase', textAlign: 'center' }}>
						@{profile.IdentifiableInformation.username}
					</Heading>
				</View>
				<Button
					onPress={() =>
						navigation.navigate('ProfileEditorNavigator', {
							screen: 'EditableOptionsScreen',
						})
					}
					width={'80%'}
				>
					Edit Profile
				</Button>
			</View>
			<Divider insetType='middle' style={{ marginVertical: 20 }} />
			<CondensedVerticalFriendsNotficationsList />
			<Divider insetType='middle' style={{ marginVertical: 20 }} />
			<FriendsList />
		</OuterView>
	)
}

export default PersonalScreen

const OuterView = styled.ScrollView`
	padding-horizontal: 5px;
`
