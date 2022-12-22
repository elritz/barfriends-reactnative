import { gql } from '@apollo/client'

export const RELATIONSHIP_FRAGMENT = gql`
	fragment RELATIONSHIP_FRAGMENT on Relationship {
		id
		RelationshipStatus
		friendProfile {
			id
			photos {
				id
				url
				type
				active
				position
				ratio
				blurhash
				createdAt
				updatedAt
			}
			ProfileType
			Story {
				emojimood {
					id
					emojiname
					emoji
					colors
				}
				photos {
					id
					url
					type
					active
					position
					ratio
					blurhash
					createdAt
					updatedAt
				}
			}
			IdentifiableInformation {
				id
				firstname
				lastname
				fullname
				username
			}
		}
		venueMetAt
		createdAt
		updatedAt
	}
`
