import { gql } from '@apollo/client'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const CREATE_DEVICE_MANAGER_MUTATION = gql`
	mutation createADeviceManager($profileId: String!) {
		createADeviceManager(profileId: $profileId) {
			... on Success {
				type
				successCode
				message
			}
			... on Error {
				type
				errorCode
				message
			}
		}
	}
`

export const SWITCH_DEVICE_PROFILE_MUTATION = gql`
	${PROFILE_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	mutation switchDeviceProfile($profileId: String!) {
		switchDeviceProfile(profileId: $profileId) {
			... on Success {
				type
				successCode
				message
			}
			... on DeviceManager {
				id
				DeviceProfile {
					id
					isActive
					accesstoken
					refreshtoken
					deviceManagerId
					Profile {
						...PROFILE_FRAGMENT
					}
				}
			}
			... on Error {
				type
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
			... on Success {
				type
				message
				successCode
			}
			... on DeviceManager {
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
			... on Error {
				errorCode
				message
				type
			}
		}
	}
`
