import { PublicProfileRouteProp } from '../friendship/Friendship'
import { useReactiveVar } from '@apollo/client'
import {
	Relationship,
	RelationshipStatus,
	useGetRelationshipFriendRequestStatusQuery,
} from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { DateTime } from 'luxon'
import { Box, Heading, Text } from 'native-base'
import { ReactElement } from 'react'

export default function Relationships() {
	const route = useRoute<PublicProfileRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const {
		data: GRFRSData,
		loading: GRFRSLoading,
		error: GRFRSError,
	} = useGetRelationshipFriendRequestStatusQuery({
		skip: !route.params?.profileId,
		fetchPolicy: 'network-only',
		variables: {
			profileId: String(route.params.profileId),
		},
	})

	if (GRFRSLoading || !GRFRSData) return null

	const Friends = (): ReactElement | null => {
		switch (GRFRSData.getRelationshipFriendRequestStatus?.__typename) {
			case 'FriendRequest':
				return null

			case 'RejectedFriendsResponse':
				return null
			case 'Relationship': {
				const created = DateTime.fromISO(
					GRFRSData.getRelationshipFriendRequestStatus.createdAt,
				).toFormat('yyyy LLL dd')
				GRFRSData.getRelationshipFriendRequestStatus.RelationshipStatus
				if (
					!GRFRSData.getRelationshipFriendRequestStatus.RelationshipStatus.includes(
						RelationshipStatus.Dating,
					)
				) {
					return null
				}
				return (
					<Box
						_light={{
							bg: 'light.50',
						}}
						_dark={{
							bg: 'light.800',
						}}
						borderRadius={'xl'}
						flex={1}
						p={3}
					>
						<Text textTransform={'uppercase'} fontSize={'sm'} fontWeight={'bold'} textAlign={'center'}>
							Friends since
						</Text>
						<Text textTransform={'uppercase'} fontSize={'lg'} fontWeight={'bold'}>
							{created}
						</Text>
					</Box>
				)
			}
			default:
				return null
		}
	}

	return <Friends />
}
