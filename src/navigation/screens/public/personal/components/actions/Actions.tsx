import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelfriendnotioficationmodal/CancelFriendNotificationModal'
import RelationshipModal from '@components/molecules/modals/relationshipmodal/RelationshipModal'
import SignupModal from '@components/molecules/modals/signupmodal/SignupModal'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
import { NOTIFICATIONS_QUERY } from '@graphql/DM/profiling/notifications/index.query'
import {
	Profile,
	useAcceptFriendRequestMutation,
	useCreateFriendRequestMutation,
	useDeleteFriendRequestMutation,
	useGetRelationshipFriendRequestStatusQuery,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, VStack, HStack, useDisclose, IconButton, Icon } from 'native-base'
import { ReactElement } from 'react'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		isOpen: isOpenRelationshipModal,
		onOpen: openRelationshipModal,
		onClose: onCloseRelaationshipModal,
	} = useDisclose()
	const {
		isOpen: isOpenSignupModal,
		onOpen: onOpenSignupModal,
		onClose: onCloseSignupModal,
	} = useDisclose()
	const {
		isOpen: isOpenCancelFriendNotification,
		onOpen: onOpenCancelFriendNotification,
		onClose: onCloseCancelFriendNotification,
	} = useDisclose()

	const isGuest = rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !profile.id,
		fetchPolicy: 'network-only',
		variables: {
			profileId: profile.id,
		},
	})

	const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
		refetchQueries: [
			{
				query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
				variables: {
					profileId: profile.id,
				},
			},
			{
				query: NOTIFICATIONS_QUERY,
			},
		],
	})

	const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {},
			// update(cache, { data }) {
			// 	const { getNotifications }: any = cache.readQuery({
			// 		query: NOTIFICATIONS_QUERY,
			// 	})

			// 	if (data?.deleteFriendRequest) {
			// 		cache.writeQuery({
			// 			query: NOTIFICATIONS_QUERY,
			// 			data: {
			// 				getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
			// 					notification.id !== item.id
			// 				}),
			// 			},
			// 		})
			// 	}
			// },
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
			refetchQueries: [
				{
					query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
					variables: {
						profileId: profile.id,
					},
				},
			],
			update(cache, { data }) {
				const currentCache: any = cache.readQuery({
					query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
					variables: {
						profileId: profile.id,
					},
				})
				console.log('========>', currentCache)

				// 	if (data?.deleteFriendRequest) {
				// 		cache.writeQuery({
				// 			query: NOTIFICATIONS_QUERY,
				// 			data: {
				// 				getNotifications: getNotifications.friendRequestNotifications.filter(notification => {
				// 					notification.id !== item.id
				// 				}),
				// 			},
				// 		})
				// 	}
			},
		})

	if (GRFRSLoading || !GRFRSData) return null

	return (
		<HStack
			space={1}
			flex={1}
			py={3}
			px={2}
			alignItems={'flex-start'}
			borderRadius={'xl'}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
		>
			<RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} />
			<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

			<Details profile={profile} />
			<IconButton
				icon={
					<Icon
						style={{
							zIndex: 100,
							justifyContent: 'center',
						}}
						name='chatbubble-ellipses'
						size={'28px'}
						as={Ionicons}
						_light={{
							color: 'light.900',
						}}
						_dark={{
							color: 'dark.900',
						}}
					/>
				}
				borderRadius={'md'}
				colorScheme={'primary'}
				onPress={() => {
					isGuest
						? onOpenSignupModal()
						: navigation.navigate('MessageRoomNavigator', {
								screen: 'MessagingRoomScreen',
								params: {
									messageroomId: '',
								},
						  })
				}}
			/>
		</HStack>
	)
}
