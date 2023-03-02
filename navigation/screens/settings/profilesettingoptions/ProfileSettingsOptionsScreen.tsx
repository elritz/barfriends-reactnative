import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	ProfileType,
	useAuthorizedProfilesQuery,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { StackActions, useNavigation } from '@react-navigation/core'
import { AuthorizationReactiveVar } from '@reactive'
import switchLogoutProfile from '@util/hooks/auth/switchLogoutProfile'
import { ScrollView, Box, HStack, Icon, Text, Pressable, Heading } from 'native-base'
import { useState } from 'react'

interface EditableOptionsScreenProps {}

const ProfileSettingsOptionsScreen = ({}: EditableOptionsScreenProps) => {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<ClientDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')

	useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles as Array<ClientDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.switchDeviceProfile as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => navigation.dispatch(StackActions.popToTop()), 1000)
					// navigation.navigate('HomeTabNavigator', {
					// 	screen: 'VenueFeedStack',
					// 	params: {
					// 		screen: 'VenueFeedScreen',
					// 	},
					// })
				}
			},
		})

	const switchProfile = () => {
		const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)
		setSelectedProfileId(String(guestProfile[0]?.Profile?.id))
		switchDeviceProfileMutation({
			variables: {
				profileId: String(guestProfile[0]?.Profile?.id),
				profileType: ProfileType.Guest,
			},
		})
	}

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				height={'58px'}
				_light={{
					bg: 'light.50',
				}}
				_dark={{
					bg: 'dark.50',
				}}
				px={2}
				py={3}
				alignItems={'flex-start'}
				flexDirection={'column'}
			>
				{children}
			</Box>
		</Pressable>
	)

	return (
		<ScrollView
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
			py={4}
		>
			<Heading px={2} h={'30px'}>
				Account
			</Heading>
			{/* Edit Profile */}
			{rAuthorizationVar?.DeviceProfile?.Profile.ProfileType === 'PERSONAL' && (
				<RoundedListItem
					onPress={() => {
						navigation.dispatch(
							StackActions.push('ProfileSettingsNavigator', {
								screen: 'ProfileEditorStack',
								params: {
									screen: 'EditableOptionsScreen',
								},
							}),
						)
					}}
				>
					<HStack alignItems={'center'} space={2}>
						<Icon
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
							as={Ionicons}
							size={'30px'}
							name={'ios-person-circle-outline'}
						/>
						<Text fontWeight={500} fontSize={'lg'}>
							Edit Profile
						</Text>
					</HStack>
				</RoundedListItem>
			)}
			{/* Notifications */}
			<RoundedListItem
				onPress={() => {
					navigation.dispatch(
						StackActions.push('ProfileSettingsNavigator', {
							screen: 'NotificationsSettingsScreen',
						}),
					)
				}}
			>
				<HStack alignItems={'center'} space={2}>
					<Icon
						_light={{
							color: 'light.900',
						}}
						_dark={{
							color: 'dark.900',
						}}
						as={Ionicons}
						size={'32px'}
						name={'notifications-circle-outline'}
					/>
					{/* <MaterialCommunityIcons name="" size={24} color="black" /> */}
					<Text fontWeight={500} fontSize={'lg'}>
						Notifications
					</Text>
				</HStack>
			</RoundedListItem>
			{/* QRCode */}
			{rAuthorizationVar?.DeviceProfile?.Profile.ProfileType !== 'GUEST' && (
				<RoundedListItem>
					<HStack alignItems={'center'} space={2}>
						<Icon
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
							as={Ionicons}
							size={'23px'}
							ml={1}
							name={'qr-code'}
						/>
						{/* <MaterialCommunityIcons name="" size={24} color="black" /> */}
						<Text fontWeight={500} fontSize={'lg'}>
							QR code
						</Text>
					</HStack>
				</RoundedListItem>
			)}
			{/* Security */}
			{rAuthorizationVar?.DeviceProfile?.Profile.ProfileType !== 'GUEST' && (
				<RoundedListItem
					onPress={() => {
						navigation.dispatch(
							StackActions.push('ProfileSettingsNavigator', {
								screen: 'SecuritySettingsScreen',
							}),
						)
					}}
				>
					<HStack alignItems={'center'} space={2}>
						<Icon
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
							as={Ionicons}
							size={'xl'}
							name={'shield-checkmark-outline'}
						/>
						{/* <MaterialCommunityIcons name="" size={24} color="black" /> */}
						<Text fontWeight={500} fontSize={'lg'}>
							Security
						</Text>
					</HStack>
				</RoundedListItem>
			)}
			{/* Appearance */}
			<RoundedListItem
				onPress={() => {
					navigation.dispatch(
						StackActions.push('ProfileSettingsNavigator', {
							screen: 'AppearanceSettingsScreen',
						}),
					)
				}}
			>
				<HStack alignItems={'center'} space={2}>
					<Icon
						_light={{
							color: 'light.900',
						}}
						_dark={{
							color: 'dark.900',
						}}
						as={Ionicons}
						size={'xl'}
						name={'color-palette'}
					/>
					{/* <MaterialCommunityIcons name="" size={24} color="black" /> */}
					<Text fontWeight={500} fontSize={'lg'}>
						Appearance
					</Text>
				</HStack>
			</RoundedListItem>
			{/* Logins */}
			<Heading px={2} h={'30px'}>
				Logins
			</Heading>
			<RoundedListItem
				onPress={() =>
					navigation.navigate('CredentialNavigator', {
						screen: 'LoginCredentialStack',
						params: {
							screen: 'AuthenticatorScreen',
						},
					})
				}
			>
				<HStack alignItems={'center'} px={2}>
					<Text fontWeight={500} fontSize={'lg'} color={'primary.500'}>
						Add Account
					</Text>
				</HStack>
			</RoundedListItem>
			{rAuthorizationVar?.DeviceProfile?.Profile.ProfileType !== 'GUEST' && (
				<RoundedListItem>
					<Pressable onPress={() => switchProfile()}>
						<HStack alignItems={'center'} px={2}>
							<Text fontWeight={500} fontSize={'lg'} color={'primary.500'}>
								Log Out {rAuthorizationVar?.DeviceProfile?.Profile.IdentifiableInformation?.username}
							</Text>
						</HStack>
					</Pressable>
				</RoundedListItem>
			)}
		</ScrollView>
	)
}

export default ProfileSettingsOptionsScreen
