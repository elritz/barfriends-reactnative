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