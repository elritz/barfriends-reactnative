import { gql } from '@apollo/client'
import { ERROR_PROFILING_FRAGMENT, PROFILE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const AUTHORIZED_PROFILES_QUERY = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	query authorizedProfiles($where: AuthorizedProfilesWhereInput!) {
		authorizedProfiles(where: $where) {
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
			... on ProfilesResponse {
				email {
					id
					ProfileType
					photo {
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
					photo {
						id
						blurhash
						url
					}
					IdentifiableInformation {
						id
						username
						fullname
					}
					tonightStory {
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
					photo {
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
	query privacyTermsDocuments {
		privacyTermsDocuments {
			privacy {
				id
			}
			termsofservice {
				id
			}
		}
	}
`

export const LOGIN_PASSWORD_QUERY = gql`
	query loginPassword($username: String!, $password: String!) {
		loginPassword(username: $username, password: $password)
	}
`

export const CHECK_USERNAME_AVAILABLE_QUERY = gql`
	query checkUsername($username: String!) {
		checkUsername(username: $username)
	}
`
