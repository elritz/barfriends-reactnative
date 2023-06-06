import { gql } from '@apollo/client'
import { OUT_FRAGMENT } from '@graphql/DM/fragments/out.fragments'

export const ADD_PERSONAL_TOTALS_VENUE_MUTATION = gql`
	mutation addPersonalTotalsVenue($profileIdVenue: String!) {
		addPersonalTotalsVenue(profileIdVenue: $profileIdVenue)
	}
`

export const REMOVE_PERSONAL_TOTAL_VENUE_MUTATION = gql`
	mutation removePersonalTotalsVenue($profileIdVenue: String!) {
		removePersonalTotalsVenue(profileIdVenue: $profileIdVenue)
	}
`

export const PERSONAL_JOINS_VENUE_MUTATION = gql`
	${OUT_FRAGMENT}
	mutation addPersonalJoinsVenue($profileIdVenue: String!) {
		addPersonalJoinsVenue(profileIdVenue: $profileIdVenue) {
			id
			Personal {
				id
				Profile {
					id
				}
				profileId
				createdAt
				updatedAt
				LiveOutPersonal {
					id
					Out {
						id
						type
						personalProfileId
						venueProfileId
						VenueStats {
							id
						}
						venueStatsId
						PersonalStats {
							id
						}
						personalStatsId
						LiveOutVenue {
							id
						}
						liveOutVenueId
						leftAt
						LiveOutPersonal {
							id
						}
						liveOutPersonalId
						createdAt
						updatedAt
					}
					Personal {
						id
						Profile {
							id
						}
						profileId
						createdAt
						updatedAt
					}
				}
			}
		}
	}
`

export const PERSONAL_LEAVES_VENUE_MUTATION = gql`
	${OUT_FRAGMENT}
	mutation removePersonalJoinsVenue($outId: String!) {
		removePersonalJoinsVenue(outId: $outId) {
			id
			Personal {
				id
				Profile {
					id
				}
				profileId
				createdAt
				updatedAt
				LiveOutPersonal {
					id
					Out {
						id
						type
						personalProfileId
						venueProfileId
						VenueStats {
							id
						}
						venueStatsId
						PersonalStats {
							id
						}
						personalStatsId
						LiveOutVenue {
							id
						}
						liveOutVenueId
						leftAt
						LiveOutPersonal {
							id
						}
						liveOutPersonalId
						createdAt
						updatedAt
					}
					Personal {
						id
						Profile {
							id
						}
						profileId
						createdAt
						updatedAt
					}
				}
			}
		}
	}
`
