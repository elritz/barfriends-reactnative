import { gql } from '@apollo/client'
import { ERROR_PROFILING_FRAGMENT, PROFILE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const CREATE_PROFILE_PERSONAL_MUTATION = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	mutation createPersonalProfile($data: CreatePersonalProfileDataInput) {
		createPersonalProfile(data: $data) {
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
			... on CreateProfileResponse {
				Profile {
					...PROFILE_FRAGMENT
				}
			}
		}
	}
`
export const CREATE_PROFILE_GUEST_MUTATION = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	mutation createGuestProfile {
		createGuestProfile {
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
			... on CreateProfileResponse {
				Profile {
					...PROFILE_FRAGMENT
				}
			}
		}
	}
`

export const UPDATE_PROFILE_IDENTIFIABLE_INFORMATION_MUTATION = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	mutation updateProfileIdentifiableInformation(
		$data: IdentifiableInformationUpdateWithoutProfileInput!
		$where: IdentifiableInformationWhereUniqueInput!
	) {
		updateProfileIdentifiableInformation(data: $data, where: $where) {
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
			... on Profile {
				...PROFILE_FRAGMENT
			}
		}
	}
`

export const UPDATE_PROFILE_MUTATION = gql`
	${ERROR_PROFILING_FRAGMENT}
	${PROFILE_FRAGMENT}
	mutation updateOneProfile($data: ProfileUpdateInput!, $where: ProfileWhereUniqueInput!) {
		updateOneProfile(data: $data, where: $where) {
			...PROFILE_FRAGMENT
		}
	}
`
