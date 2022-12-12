import { gql } from '@apollo/client'

export const CREATE_FRIEND_REQUEST_MUTATION = gql`
	mutation createFriendRequest($senderProfileId: String!, $receiversProfileId: [String!]!) {
		createFriendRequest(senderProfileId: $senderProfileId, receiversProfileId: $receiversProfileId)
	}
`
