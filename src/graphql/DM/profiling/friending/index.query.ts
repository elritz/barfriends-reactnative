import { gql } from '@apollo/client'

export const GET_RELATIONSHIP_FRIENDREQUESTSTATUS_QUERY = gql`
	query getRelationshipFriendRequestStatus($profileId: String!) {
		getRelationshipFriendRequestStatus(profileId: $profileId) {
			... on ErrorProfiling {
				errorCode
				message
			}
			... on FriendRequest {
				id
				Notifications {
					id
					profileId
					Profile {
						id
					}
				}
				receiverProfileId
				senderProfileId
				NotificationStatus {
					id
					isAccepted
					isAnswered
					isChecked
				}
				notificationStatusId
			}
			... on Relationship {
				id
				venueMetAt
				Profile {
					id
				}
				RelationshipStatus
				createdAt
				updatedAt
			}
			... on FriendsResponse {
				friends
			}
		}
	}
`
