import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
import { useDeleteFriendRequestMutation } from '@graphql/generated'
import { Button, Modal } from 'native-base'

type Props = {
	isOpen: boolean
	profileId: string
	onClose: () => void
	friendRequestId: string
}

export default function CancelFriendNotificationModal({
	isOpen,
	onClose,
	friendRequestId,
	profileId,
}: Props) {
	const [deleteFriendRequestMutation, { data, loading, error }] = useDeleteFriendRequestMutation({
		variables: {
			friendRequestId,
		},
		refetchQueries: [
			{
				query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
				variables: {
					profileId,
				},
			},
		],
		onCompleted: data => {
			onClose()
		},
	})

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Content w={'95%'}>
				<Modal.CloseButton />
				<Modal.Header fontSize='4xl' fontWeight='bold'>
					Cancel Friend Notification
				</Modal.Header>
				<Modal.Body>
					You can always request to be friends again. Continuing will cancel this friend request
				</Modal.Body>
				<Modal.Footer>
					<Button variant='unstyled' mr='1' onPress={onClose}>
						Back
					</Button>
					<Button
						colorScheme='primary'
						onPress={() => {
							deleteFriendRequestMutation()
						}}
						isLoading={loading}
						isLoadingText={'Continue'}
					>
						Continue
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}
