import { useReactiveVar } from '@apollo/client'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelfriendnotioficationmodal/CancelFriendNotificationModal'
import { Ionicons } from '@expo/vector-icons'
import { NOTIFICATIONS_QUERY } from '@graphql/DM/profiling/notifications/index.query'
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
			update(cache, { data }) {
				const { getNotifications }: any = cache.readQuery({
					query: NOTIFICATIONS_QUERY,
				})

				if (data?.acceptFriendRequest?.id) {
					cache.writeQuery({
						query: NOTIFICATIONS_QUERY,
						data: {
							getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
								notification.id !== String(data.acceptFriendRequest?.id)
							}),
						},
					})
				}
			},
		})

	const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
		useDeleteFriendRequestMutation({
			update(cache, { data }) {
				if (data?.deleteFriendRequest) {
					const { getNotifications }: any = cache.readQuery({
						query: NOTIFICATIONS_QUERY,
					})
					if (data?.deleteFriendRequest) {
						const filteredNotification = getNotifications.friendRequestNotifications.filter(
							notification => {
								if (notification.id === item.id) {
									return false
								}
								return true
							},
						)

						cache.writeQuery({
							query: NOTIFICATIONS_QUERY,
							data: {
								getNotifications: filteredNotification,
							},
						})
					}
				}
			},
		})

	const isSender = item?.senderProfile?.id === rAuthorizationVar?.DeviceProfile?.Profile?.id

	return (
		<Box
			style={{ backgroundColor: 'transparent' }}
			py={3}
			my={1}
			px={2}
			borderBottomColor={'light.300'}
			borderBottomWidth={0.2}
		>
			{isSender ? (
				<HStack justifyContent={'space-between'} alignItems={'center'}>
					<Pressable
						onPress={() => {
							navigation.navigate('PublicNavigator', {
								screen: 'PersonalStack',
								params: {
									screen: 'PublicPersonalScreen',
									params: {
										profileId: String(item.receiverProfile?.id),
									},
								},
							})
						}}
					>
						<HStack alignItems={'flex-start'} space={2}>
							<Image
								source={{ uri: item.receiverProfile?.photos?.url }}
								size='xs'
								borderRadius={'lg'}
								alt={item.receiverProfile?.IdentifiableInformation?.fullname || 'Profile photo'}
							/>
							<VStack mt={-1}>
								<Text fontSize={'md'} numberOfLines={1} isTruncated>
									{capitalizeFirstLetter(item.receiverProfile?.IdentifiableInformation?.fullname)}
								</Text>
								<Heading fontSize={'sm'} isTruncated>
									@{item.receiverProfile?.IdentifiableInformation?.username}
								</Heading>
							</VStack>
						</HStack>
					</Pressable>
					<CancelFriendNotificationModal
						profileId={String(item.id)}
						friendRequestId={String(item.id)}
						isOpen={isOpenCancelFriendNotification}
						onClose={onCloseCancelFriendNotification}
					/>
					<Button
						colorScheme={'primary'}
						variant={'outline'}
						size={'sm'}
						borderRadius={'lg'}
						isDisabled={DFRLoading || AFRLoading}
						px={3}
						mx={2}
						height={'30px'}
						_disabled={{
							opacity: '100',
						}}
						_text={{
							fontSize: 11,
							lineHeight: 'xs',
							textTransform: 'uppercase',
							fontWeight: '800',
						}}
						onPress={() => {
							isSender ? onOpenCancelFriendNotification() : console.log('receiver')
						}}
						isLoadingText={'Requested'}
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
										profileId: String(item.senderProfile?.id),
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
								<Text fontSize={'md'} numberOfLines={1} isTruncated>
									{capitalizeFirstLetter(item.senderProfile?.IdentifiableInformation?.fullname)}
								</Text>
								<Heading fontSize={'sm'} isTruncated>
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
