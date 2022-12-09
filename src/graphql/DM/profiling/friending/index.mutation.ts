import { gql } from '@apollo/client'

export const CREATE_FRIEND_REQUEST_MUTATION = gql`
	mutation createFriendRequest($senderId: String!, $receiverId: String!) {
		createFriendRequest(senderId: $senderId, receiverId: $receiverId)
	}
`
