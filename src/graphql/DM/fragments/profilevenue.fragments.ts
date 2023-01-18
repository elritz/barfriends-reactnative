import { gql } from '@apollo/client'
import { CREDENTIALS_FRAGMENT } from '@graphql/DM/fragments/credentials.fragments'
import { DETAIL_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/detail_information.fragments'
import { INDETIFIABLE_INFORMATION_FRAGMENT } from '@graphql/DM/fragments/identifiable_information.fragments'
import { LOCATION_FRAGMENT } from '@graphql/DM/fragments/location.fragments'
import { RELATIONSHIP_FRAGMENT } from '@graphql/DM/fragments/relationship.fragments'

export const PROFILE_VENUE_FRAGMENT = gql`
	${CREDENTIALS_FRAGMENT}
	${INDETIFIABLE_INFORMATION_FRAGMENT}
	${DETAIL_INFORMATION_FRAGMENT}
	${LOCATION_FRAGMENT}
	fragment PROFILE_VENUE_FRAGMENT on Profile {
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
				createdAt
				updatedAt
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
	}
`
