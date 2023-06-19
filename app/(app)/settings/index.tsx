import { useReactiveVar } from '@apollo/client'
import { Heading } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { ScrollView, Box, HStack, Icon, Text, Pressable } from 'native-base'
import { useState } from 'react'

interface EditableOptionsScreenProps {}

export default ({}: EditableOptionsScreenProps) => {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')

	useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager
					?.DeviceProfiles as Array<AuthorizationDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
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
			},
		})
	}

	const RoundedListItem = ({ children, ...props }) => (
		<Pressable onPress={props.onPress}>
			<Box
				height={'58px'}
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: 'dark.100',
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
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.100',
			}}
			py={4}
		>
			<Heading px={2} h={'30px'}>
				Account
			</Heading>
			{/* Edit Profile */}
			<RoundedListItem
				onPress={() => {
					rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'PERSONAL'
						? router.push({
								pathname: '(app)/settings/profilesettings/personal',
						  })
						: router.push({
								pathname: '(app)/settings/profilesettings/venue',
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
						{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'PERSONAL'
							? 'Edit Profile'
							: 'Edit Venue'}
					</Text>
				</HStack>
			</RoundedListItem>
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
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
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
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
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
			<RoundedListItem>
				<Pressable
					w={'100%'}
					onPress={() =>
						router.replace({
							pathname: '(app)/credential/logincredentialstack/authenticator',
						})
					}
				>
					{({ isHovered, isFocused, isPressed }) => {
						return (
							<HStack alignItems={'center'} px={2} h={'55px'}>
								<Text fontWeight={500} fontSize={'lg'} color={isPressed ? 'gray.400' : 'primary.500'}>
									Add Account
								</Text>
							</HStack>
						)
					}}
				</Pressable>
			</RoundedListItem>
			{rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType !== 'GUEST' && (
				<RoundedListItem>
					<Pressable w={'100%'} onPress={() => switchProfile()}>
						<HStack alignItems={'center'} px={2} h={'55px'}>
							<Text fontWeight={500} fontSize={'lg'} color={'primary.500'}>
								Log Out {rAuthorizationVar?.DeviceProfile?.Profile?.IdentifiableInformation?.username}
							</Text>
						</HStack>
					</Pressable>
				</RoundedListItem>
			)}
		</ScrollView>
	)
}
