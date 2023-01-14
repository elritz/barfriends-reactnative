import { gql } from '@apollo/client'

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
	mutation addPersonalJoinsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
		addPersonalJoinsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
	}
`

export const PERSONAL_LEAVES_VENUE_MUTATION = gql`
	mutation removePersonalJoinsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
		removePersonalJoinsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
	}
`
