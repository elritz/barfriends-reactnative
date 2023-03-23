import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useNavigation, useRouter } from 'expo-router'
import { ScrollView, Box, HStack, Icon, Text, Pressable, Heading } from 'native-base'
import { useState } from 'react'

interface EditableOptionsScreenProps {}

const ProfileSettingsOptionsScreen = ({}: EditableOptionsScreenProps) => {
	const navigation = useNavigation()
	const router = useRouter()
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
					setTimeout(() => router.replace('(app)/hometab'), 1000)
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
						router.push({
							pathname: '(app)/settings/profilesettings/personal',
						})
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
					router.push({
						pathname: '(app)/settings/notificationssettingsscreen',
					})
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
						router.push({
							pathname: '(app)/settings/securitysettingsscreen',
						})
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
					router.push({
						pathname: '(app)/settings/appearancesettingsscreen',
					})
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
					router.replace({
						pathname: '(app)/credential/logincredentialstack/authenticator',
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
