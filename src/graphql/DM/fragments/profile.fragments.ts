import { gql } from '@apollo/client'
import { CREDENTIALS_FRAGMENT } from '@graphql/DM/fragments/credentials.fragments'
import { DETAIL_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/detail_information.fragments'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { LOCATION_FRAGMENT } from '@graphql/DM/fragments/location.fragments'

export const PROFILE_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	fragment PROFILE_FRAGMENT on Profile {
		__typename
		id
		ProfileType
		IdentifiableInformation {
			...INDETIFIABLE_INFORMATION_FRAGMENT
		}
		DetailInformation {
			...DETAIL_INFORMATION_FRAGMENT
		}
		Relationships {
			id
			venueMetAt
			status
			createdAt
			updatedAt
		}
		photos {
			id
			url
			type
			active
			ratio
			blurhash
			createdAt
			updatedAt
		}
		Credentials {
			...CREDENTIALS_FRAGMENT
		}
		Personal {
			id
			Profile {
				id
				createdAt
				updatedAt
			}
			profileId
			PersonalStats {
				id
				joinedVenueHistory {
					id
					personalProfileId
					venueProfileId
					createdAt
					updatedAt
				}
				totaledVenueHistory {
					id
					venueProfileId
					personalProfileId
					createdAt
					updatedAt
				}
			}
			LiveOutPersonal {
				id
				joined {
					id
					venueProfileId
					personalProfileId
				}
				totaled {
					id
					venueProfileId
					personalProfileId
				}
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
		Venue {
			id
			Profile {
				id
				createdAt
				updatedAt
			}
			LiveOutVenue {
				id
				joined {
					id
					venueProfileId
					personalProfileId
				}
				totaled {
					id
					venueProfileId
					personalProfileId
				}
			}
			VenueStats {
				id
				joinedVenueHistory {
					id
					venueProfileId
					personalProfileId
					createdAt
					updatedAt
				}
				totaledVenueHistory {
					id
					personalProfileId
					venueProfileId
					createdAt
					updatedAt
				}
			}
			Location {
				...LOCATION_FRAGMENT
			}
			createdAt
			updatedAt
		}
		Story {
			id
			emojimood {
				__typename
				id
				colors
				emojiname
				emoji
			}
		}
	}
`
