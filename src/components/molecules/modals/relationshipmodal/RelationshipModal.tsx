import { GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY } from '@graphql/DM/profiling/friending/index.query'
import {
	useGetRelationshipFriendRequestStatusLazyQuery,
	useRemoveFriendMutation,
} from '@graphql/generated'
import { RouteProp, useRoute } from '@react-navigation/native'
import { PersonalProfileStackParamList } from '@types'
import { DateTime } from 'luxon'
import { Box, Button, HStack, Modal, Text, VStack } from 'native-base'
import { ReactElement, useEffect } from 'react'

export type PublicProfileRouteProp = RouteProp<
	PersonalProfileStackParamList,
	'PublicPersonalScreen'
>

type Props = {
	isOpen: boolean
	onClose: () => void
}

export default function RelationshipModal({ isOpen, onClose }: Props) {
	const route = useRoute<PublicProfileRouteProp>()

	const [
		getRelationshipFriendStatusQuery,
		{ data: GRFRSData, loading: GRFRSLoading, error: GRFRSError },
	] = useGetRelationshipFriendRequestStatusLazyQuery({})

	const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
		onCompleted: data => {
			console.log(data)
		},
	})

	useEffect(() => {
		getRelationshipFriendStatusQuery({
			fetchPolicy: 'network-only',
			variables: {
				profileId: String(route.params.profileId),
			},
		})
	}, [])

	if (GRFRSLoading || !GRFRSData) return null

	const FriendStatus = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				return null

			case 'RejectedFriendsResponse':
				return null
			case 'Relationship': {
				const created = DateTime.fromISO(
					GRFRSData.getRelationshipFriendRequestStatus.createdAt,
				).toFormat('yyyy LLL dd')
				return (
					<Box alignItems={'center'}>
						<Text textTransform={'uppercase'} fontSize={'sm'} fontWeight={'bold'} textAlign={'center'}>
							Friends since
						</Text>
						<Text textTransform={'uppercase'} fontSize={'2xl'}>
							{created}
						</Text>
					</Box>
				)
			}
			default:
				return null
		}
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Modal.Content h={'auto'} w={'94%'}>
				<Modal.CloseButton />
				<Modal.Header fontSize='4xl' fontWeight='bold'>
					Remove friend
				</Modal.Header>
				<Modal.Body w={'full'}>
					<VStack>
						<HStack mb={3}>
							<VStack>
								<Text flexWrap={'wrap'} mx={2}>
									Are you sure you want to remove the friend ship you have?
								</Text>
							</VStack>
						</HStack>
						<FriendStatus />
					</VStack>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='unstyled' mr='1' onPress={onClose}>
						Cancel
					</Button>
					<Button
						size={'sm'}
						w={'100px'}
						borderRadius={'sm'}
						mx={2}
						onPress={() => {
							if (GRFRSData.getRelationshipFriendRequestStatus?.__typename === 'Relationship') {
								removeFriendMutation({
									variables: {
										relationshipId: GRFRSData.getRelationshipFriendRequestStatus.id,
									},
									update(cache, { data }) {
										if (data?.removeFriend) {
											cache.writeQuery({
												query: GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY,
												variables: {
													profileId: String(route.params.profileId),
												},
												data: {
													getRelationshipFriendRequestStatus: {
														__typename: 'RejectedFriendsResponse',
														friends: false,
													},
												},
											})
										}
									},
									onCompleted: () => {
										onClose()
									},
								})
							}
						}}
					>
						Unfriend
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}
