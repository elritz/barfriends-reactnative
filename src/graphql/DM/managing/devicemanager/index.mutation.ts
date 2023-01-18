import { gql } from '@apollo/client'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const CREATE_DEVICE_MANAGER_MUTATION = gql`
	mutation createADeviceManager($profileId: String!) {
		createADeviceManager(profileId: $profileId) {
			id
			DeviceProfile {
				id
				isActive
				RefreshToken {
					id
				}
				accesstoken
				AppType
				DeviceManager {
					id
				}
				deviceManagerId
				Profile {
					...PROFILE_FRAGMENT
				}
			}
		}
	}
`

export const SWITCH_DEVICE_PROFILE_MUTATION = gql`
	${PROFILE_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	mutation switchDeviceProfile($profileId: String!, $profileType: ProfileType) {
		switchDeviceProfile(profileId: $profileId, profileType: $profileType) {
			... on ClientDeviceManager {
				__typename
				id
				DeviceProfile {
					id
					isActive
					refreshtoken
					accesstoken
					AppType
					DeviceManager {
						id
					}
					deviceManagerId
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
			... on ErrorManaging {
				errorCode
				message
			}
		}
	}
`

export const REFRESH_DEVICE_MANAGER_MUTATION = gql`
	${PROFILE_FRAGMENT}
	mutation refreshDeviceManager {
		refreshDeviceManager {
			... on ClientDeviceManager {
				__typename
				id
				DeviceProfile {
					id
					isActive
					refreshtoken
					accesstoken
					AppType
					DeviceManager {
						id
					}
					deviceManagerId
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
			... on ErrorManaging {
				errorCode
				message
			}
		}
	}
`
