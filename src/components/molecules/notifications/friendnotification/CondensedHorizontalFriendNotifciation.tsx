import { useReactiveVar } from '@apollo/client'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelFriendNotioficationmodal/CancelFriendNotificationModal'
import { Ionicons } from '@expo/vector-icons'
import { AUTHORIZED_PROFILES_QUERY } from '@graphql/DM/profiling/authorization/index.query'
import {
	FriendRequestNotification,
	useAcceptFriendRequestMutation,
	useDeleteFriendRequestMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import {
	Button,
	IconButton,
	Icon,
	Box,
	HStack,
	VStack,
	Heading,
	Text,
	Image,
	useDisclose,
	Pressable,
} from 'native-base'

interface CondensedHorizontalFriendNotifciationProps {
	item: FriendRequestNotification
}

export const CondensedHorizontalFriendNotifciation = ({
	item,
}: CondensedHorizontalFriendNotifciationProps) => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const navigation = useNavigation()
	const {
		isOpen: isOpenCancelFriendNotification,
		onOpen: onOpenCancelFriendNotification,
		onClose: onCloseCancelFriendNotification,
	} = useDisclose()

	const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {
				console.log('data', data.acceptFriendRequest)
			},
			update(cache, { data }) {
				console.log('data', data?.acceptFriendRequest)
				console.log(
					'🚀 ----------------------------------------------------------------------------------🚀',
					JSON.stringify(cache, null, 4),
				)
			},
		})

	const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
		useDeleteFriendRequestMutation({
			onCompleted: data => {
				console.log('data', data.deleteFriendRequest)
			},
		})

	const isSender = item?.senderProfile?.id === rAuthorizationVar?.DeviceProfile?.Profile?.id

	return (
		<Box
			style={{ backgroundColor: 'transparent' }}
			py={3}
			px={2}
			borderBottomColor={'light.300'}
			borderBottomWidth={0.2}
		>
			{isSender ? (
				<HStack justifyContent={'space-between'}>
					<HStack alignItems={'flex-start'} space={2}>
						<Image
							source={{ uri: item.receiverProfile?.photos?.url }}
							size='xs'
							borderRadius={'lg'}
							alt={item.receiverProfile?.IdentifiableInformation?.fullname || 'Profile photo'}
						/>
						<VStack mt={-1}>
							<Text fontSize={'lg'} numberOfLines={1} isTruncated>
								{capitalizeFirstLetter(item.receiverProfile?.IdentifiableInformation?.fullname)}
							</Text>
							<Heading fontSize={'md'} isTruncated>
								@{item.receiverProfile?.IdentifiableInformation?.username}
							</Heading>
						</VStack>
					</HStack>
					<CancelFriendNotificationModal
						profileId={String(item.id)}
						friendRequestId={String(item.receiverProfileId)}
						isOpen={isOpenCancelFriendNotification}
						onClose={onCloseCancelFriendNotification}
					/>
					<Button
						borderRadius={'lg'}
						_text={{
							fontWeight: '600',
						}}
						colorScheme={'primary'}
						onPress={() => {
							isSender ? onOpenCancelFriendNotification() : console.log('receiver')
						}}
					>
						Requested
					</Button>
				</HStack>
			) : (
				<HStack justifyContent={'space-between'}>
					<Pressable
						onPress={() => {
							navigation.navigate('PublicNavigator', {
								screen: 'PersonalStack',
								params: {
									screen: 'PublicPersonalScreen',
									params: {
										profileId: String(item.receiverProfileId),
									},
								},
							})
						}}
					>
						<HStack alignItems={'flex-start'} space={2}>
							<Image
								source={{ uri: item.senderProfile?.photos?.url }}
								size='xs'
								borderRadius={'lg'}
								alt={item.senderProfile?.IdentifiableInformation?.fullname || 'Profile photo'}
							/>
							<VStack mt={-1}>
								<Text fontSize={'lg'} numberOfLines={1} isTruncated>
									{capitalizeFirstLetter(item.senderProfile?.IdentifiableInformation?.fullname)}
								</Text>
								<Heading fontSize={'md'} isTruncated>
									@{item.senderProfile?.IdentifiableInformation?.username}
								</Heading>
							</VStack>
						</HStack>
					</Pressable>
					<HStack space={1} justifyContent={'space-around'} alignItems={'center'}>
						<Button
							colorScheme={'primary'}
							px={4}
							py={2}
							borderRadius={'lg'}
							isDisabled={DFRLoading || AFRLoading}
							_disabled={{
								opacity: '100',
							}}
							isLoadingText={'Accept'}
							_text={{
								fontSize: 11,
								textTransform: 'uppercase',
								fontWeight: '900',
							}}
							onPress={() =>
								acceptFriendRequestMutation({
									variables: {
										friendRequestId: String(item.id),
										venueIdMetAt: '',
									},
								})
							}
						>
							Accept
						</Button>
						<IconButton
							px={2}
							py={2}
							icon={<Icon as={Ionicons} name='close' size={'lg'} rounded={'full'} />}
							isDisabled={DFRLoading || AFRLoading}
							onPress={() =>
								declineFriendRequestMutation({
									variables: {
										friendRequestId: String(item.id),
									},
								})
							}
						/>
					</HStack>
				</HStack>
			)}
		</Box>
	)
}
