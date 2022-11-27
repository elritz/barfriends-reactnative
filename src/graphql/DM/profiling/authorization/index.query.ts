import { gql } from '@apollo/client'
import { ERROR_PROFILING_FRAGMENT, PROFILE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const authorizedProfiles = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	query authorizedProfiles($where: AuthorizedProfilesWhereInput!) {
		authorizedProfiles(where: $where) {
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
			... on ProfileTypesResponse {
				email {
					id
					ProfileType
					photos {
						id
						blurhash
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
				}
				phone {
					id
					ProfileType
					photos {
						id
						blurhash
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
					Story {
						id
						emojimood {
							colors
							emoji
							emojiname
						}
					}
				}
				username {
					id
					ProfileType
					photos {
						id
						blurhash
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
				}
			}
		}
	}
`

export const GET_LATEST_TERMS_AND_SERVICES = gql`
	query documents(
		$after: DocumentWhereUniqueInput
		$before: DocumentWhereUniqueInput
		$first: Int
		$last: Int
		$orderBy: [DocumentOrderByWithRelationInput!]
		$where: DocumentWhereInput
	) {
		documents(
			where: $where
			orderBy: $orderBy
			first: $first
			last: $last
			before: $before
			after: $after
		) {
			id
			TypeOfDocument
			content
			createdAt
			updatedAt
		}
	}
`
export const LOGIN_PASSWORD_QUERY = gql`
	query loginPassword($username: String!, $password: String!) {
		loginPassword(username: $username, password: $password)
	}
`

// export const LOGIN_TOKENS_QUERY = gql`
//   ${PROFILE_FRAGMENT}
//   query loginTokens($authorization: String, $refreshtoken: String) {
//     loginTokens(authorization: $authorization, refreshtoken: $refreshtoken) {
//       message
//       success
//       authorization
//       refreshToken
//       Profile {
//         ...PROFILE_FRAGMENT
//       }
//     }
//   }
// `;

export const CHECK_USERNAME_AVAILABLE_QUERY = gql`
	query checkUsername($username: String!) {
		checkUsername(username: $username)
	}
`

// export const ME_QUERY = gql`
// 	${PROFILE_FRAGMENT}
// 	query me {
// 		me {
// 			message
// 			success
// 			Profile {
// 				...PROFILE_FRAGMENT
// 			}
// 		}
// 	}
// `
