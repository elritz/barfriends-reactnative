import { gql } from '@apollo/client'
import { OUT_FRAGMENT } from '@graphql/DM/fragments/out.fragments'

// export const UPSERT_TONGIHT_PATH_OR_PATH = gql`
// 	mutation UpsertTonightPathOrPath(
// 		$latitude: Float!
// 		$longitude: Float!
// 		$profileIdPersonal: String!
// 	) {
// 		upsertTonightPathOrPath(
// 			latitude: $latitude
// 			longitude: $longitude
// 			profileIdPersonal: $profileIdPersonal
// 		)
// 	}
// `

export const ADD_PERSONAL_TOTALS_VENUE_MUTATION = gql`
	mutation addPersonalTotalsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
		addPersonalTotalsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
	}
`

export const REMOVE_PERSONAL_TOTAL_VENUE_MUTATION = gql`
	mutation removePersonalTotalsVenue($profileIdVenue: String!, $profileIdPersonal: String!) {
		removePersonalTotalsVenue(profileIdVenue: $profileIdVenue, profileIdPersonal: $profileIdPersonal)
	}
`

export const PERSONAL_JOINS_VENUE_MUTATION = gql`
	${OUT_FRAGMENT}
	mutation addPersonalJoinsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
		addPersonalJoinsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue) {
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
