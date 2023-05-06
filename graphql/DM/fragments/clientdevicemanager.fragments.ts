import { PROFILE_FRAGMENT } from './profile.fragments'
import { gql } from '@apollo/client'

export const CLIENT_DEVICE_PROFILE_FRAGMENT = gql`
	${PROFILE_FRAGMENT}
	fragment CLIENT_DEVICE_PROFILE_FRAGMENT on ClientDeviceProfile {
		id
		profileId
		isActive
		refreshtoken
		accesstoken
		deviceManagerId
		Profile {
			...PROFILE_FRAGMENT
		}
		AppType
		ProfileType
		DeviceManager {
			id
		}
		RefreshToken {
			id
			token
			createdAt
			updatedAt
		}
		createdAt
		updatedAt
	}
`
export const CLIENT_DEVICE_MANAGER_FRAGMENT = gql`
	${CLIENT_DEVICE_PROFILE_FRAGMENT}
	fragment CLIENT_DEVICE_MANAGER_FRAGMENT on ClientDeviceManager {
		id
		DeviceProfile {
			...CLIENT_DEVICE_PROFILE_FRAGMENT
		}
		Device {
			id
		}
		createdAt
		updatedAt
	}
`
