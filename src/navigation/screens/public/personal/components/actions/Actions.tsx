import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelFriendNotioficationmodal/CancelFriendNotificationModal'
import RelationshipModal from '@components/molecules/modals/relationshipmodal/RelationshipModal'
import SignupModal from '@components/molecules/modals/signupmodal/SignupModal'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
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

	const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
		refetchQueries: [
			{
				query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
				variables: {
					profileId: profile.id,
				},
			},
		],
	})

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

	const [acceptFriendRequestMutation, { data: AFRData, loading: AFRLoading, error: AFRError }] =
		useAcceptFriendRequestMutation({
			onCompleted: data => {},
			update(cache, { data }) {},
		})

	const [declineFriendRequestMutation, { data: DFRData, loading: DFRLoading, error: DFRError }] =
		useDeleteFriendRequestMutation({
			onCompleted: data => {
				console.log('data', data.deleteFriendRequest)
			},
		})

	if (GRFRSLoading || !GRFRSData) return null

	const FriendStatusButton = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				const isSender =
					GRFRSData?.getRelationshipFriendRequestStatus.senderProfileId ===
					rAuthorizationVar?.DeviceProfile?.Profile?.id

				return (
					<>
						{isSender ? (
							<>
								<CancelFriendNotificationModal
									profileId={profile.id}
									friendRequestId={GRFRSData.getRelationshipFriendRequestStatus.id}
									isOpen={isOpenCancelFriendNotification}
									onClose={onCloseCancelFriendNotification}
								/>
								<Button
									flex={1}
									_text={{
										fontWeight: '600',
									}}
									colorScheme={'primary'}
									onPress={() => {
										isGuest
											? onOpenSignupModal()
											: isSender
											? onOpenCancelFriendNotification()
											: console.log('receiver')
									}}
								>
									Requested
								</Button>
							</>
						) : (
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
												friendRequestId: String(GRFRSData?.getRelationshipFriendRequestStatus?.id),
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
									isDisabled={DFRLoading || AFRLoading}
									icon={<Icon as={Ionicons} name='close' size={'lg'} rounded={'full'} />}
									onPress={() =>
										declineFriendRequestMutation({
											variables: {
												friendRequestId: String(GRFRSData?.getRelationshipFriendRequestStatus?.id),
											},
										})
									}
								/>
							</HStack>
						)}
					</>
				)
			case 'Relationship':
				return (
					<IconButton
						icon={<Icon as={MaterialCommunityIcons} name={'account'} />}
						colorScheme={'primary'}
						variant={'solid'}
						w={'55px'}
						onPress={() => {
							openRelationshipModal()
						}}
					/>
				)

			case 'RejectedFriendsResponse':
				return (
					<Button
						flex={1}
						_text={{
							fontWeight: '600',
						}}
						colorScheme={'primary'}
						onPress={() => {
							isGuest
								? onOpenSignupModal()
								: createFriendRequestMutation({
										variables: {
											receiversProfileId: [profile.id],
											senderProfileId: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
										},
								  })
						}}
					>
						Barfriend
					</Button>
				)
			default:
				return null
		}
	}

	return (
		<VStack
			p={3}
			space={3}
			borderRadius={'xl'}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
		>
			<RelationshipModal isOpen={isOpenRelationshipModal} onClose={onCloseRelaationshipModal} />
			<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

			<HStack space={3}>
				<FriendStatusButton />
				<Button
					bg={'blue.500'}
					_text={{
						fontWeight: '600',
					}}
					flex={2}
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
				>
					Message
				</Button>
			</HStack>
			<Details profile={profile} />
		</VStack>
	)
}
