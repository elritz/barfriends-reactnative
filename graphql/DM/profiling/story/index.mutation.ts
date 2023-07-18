import { gql } from '@apollo/client'
import { STORY_FRAGMENT } from '@graphql/DM/fragments/story.fragments'

export const UPDATE_STORY_PHOTOS_MUTATION = gql`
	${STORY_FRAGMENT}
	mutation updateStoryPhotos($disconnectId: String!, $photos: PhotoCreateManyProfileInputEnvelope) {
		updateStoryPhotos(disconnectId: $disconnectId, photos: $photos) {
			...STORY_FRAGMENT
		}
	}
`

export const UPDATE_STORY_EMOJIMOOD_MUTATION = gql`
	${STORY_FRAGMENT}
	mutation updateStoryEmojimood($emojimoodId: Int!) {
		updateStoryEmojimood(emojimoodId: $emojimoodId) {
			...STORY_FRAGMENT
		}
	}
`
