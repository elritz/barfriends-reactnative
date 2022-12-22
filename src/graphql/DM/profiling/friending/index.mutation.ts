import { gql } from '@apollo/client'

export const CREATE_FRIEND_REQUEST_MUTATION = gql`
	mutation createFriendRequest($senderProfileId: String!, $receiversProfileId: [String!]!) {
		createFriendRequest(senderProfileId: $senderProfileId, receiversProfileId: $receiversProfileId)
	}
`

export const DELETE_FRIEND_REQUEST_MUTATION = gql`
	mutation deleteFriendRequest($friendRequestId: String!) {
		deleteFriendRequest(friendRequestId: $friendRequestId)
	}
`

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
	mutation acceptFriendRequest($friendRequestId: String!, $venueIdMetAt: String) {
		acceptFriendRequest(friendRequestId: $friendRequestId, venueIdMetAt: $venueIdMetAt) {
			id
			venueMetAt
			Profile {
				id
			}
			RelationshipStatus
			createdAt
			updatedAt
		}
	}
`

export const REMOVE_FRIEND_MUTATION = gql`
	mutation removeFriend($relationshipId: String!) {
		removeFriend(relationshipId: $relationshipId)
	}
`
