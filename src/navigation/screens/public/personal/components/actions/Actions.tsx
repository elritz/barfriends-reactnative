import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import CancelFriendNotificationModal from '@components/molecules/modals/cancelFriendNotioficationmodal/CancelFriendNotificationModal'
import SignupModal from '@components/molecules/modals/signupmodal/SignupModal'
import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
import {
	Profile,
	useCreateFriendRequestMutation,
	useGetNotificationsQuery,
	useGetRelationshipFriendRequestStatusQuery,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, VStack, HStack, Modal, useDisclose } from 'native-base'
import { ReactElement } from 'react'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
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

	if (GRFRSLoading || !GRFRSData) return null

	const FriendStatusButton = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				const isSender =
					GRFRSData?.getRelationshipFriendRequestStatus.senderProfileId ===
					rAuthorizationVar?.DeviceProfile?.Profile?.id
				return (
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
							{isSender ? 'Requested' : 'accept decline'}
						</Button>
					</>
				)
			case 'Relationship':
				return (
					<Button
						flex={1}
						_text={{
							fontWeight: '600',
						}}
						colorScheme={'primary'}
						isLoading={loading}
						isLoadingText={'Barfriend'}
						onPress={() => {
							rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'
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

			case 'FriendsResponse':
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
			<SignupModal isOpen={isOpenSignupModal} onClose={onCloseSignupModal} />

			<HStack space={3}>
				<FriendStatusButton />
				<Button
					bg={'blue.500'}
					_text={{
						fontWeight: '600',
					}}
					flex={2}
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
