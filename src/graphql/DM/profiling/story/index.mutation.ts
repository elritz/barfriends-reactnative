import { gql } from '@apollo/client'

export const UPDATE_STORY_PHOTOS_MUTATION = gql`
	mutation updateStoryPhotos($disconnectId: String!, $photos: PhotoCreateManyProfileInputEnvelope) {
		updateStoryPhotos(disconnectId: $disconnectId, photos: $photos)
	}
`

export const UPDATE_STORY_EMOJIMOOD_MUTATION = gql`
	mutation updateStoryEmojimood($emojimoodId: Int!) {
		updateStoryEmojimood(emojimoodId: $emojimoodId)
	}
`

// export const AUTHENTICATION_DEVICE_OWNER_CODE_MUTATION = gql`
// 	${CODE_FRAGMENT}
// 	${ERROR_PROFILING_FRAGMENT}
// 	mutation sendAuthenticatorDeviceOwnerCode($data: CodeData, $where: CodeWhere) {
// 		sendAuthenticatorDeviceOwnerCode(data: $data, where: $where) {
// 			... on Code {
// 				...CODE_FRAGMENT
// 			}
// 			... on ErrorProfiling {
// 				...ERROR_PROFILING_FRAGMENT
// 			}
// 		}
// 	}
// `
