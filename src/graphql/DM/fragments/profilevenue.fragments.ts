import { gql } from '@apollo/client'
import { CREDENTIALS_FRAGMENT } from '@graphql/DM/fragments/credentials.fragments'
import { DETAIL_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/detail_information.fragments'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { LOCATION_FRAGMENT } from '@graphql/DM/fragments/location.fragments'

export const PROFILE_VENUES_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	fragment PROFILE_VENUES_FRAGMENT on Profile {
		__typename
		id
		ProfileType
		IdentifiableInformation {
			...INDETIFIABLE_INFORMATION_FRAGMENT
		}
		DetailInformation {
			...DETAIL_INFORMATION_FRAGMENT
		}
		photos {
			id
			url
			type
			position
			active
			ratio
			blurhash
			createdAt
			updatedAt
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
				createdAt
				updatedAt
			}
			LiveOutPersonal {
				id
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
			Location {
				...LOCATION_FRAGMENT
			}
			createdAt
			updatedAt
		}
	}
`
