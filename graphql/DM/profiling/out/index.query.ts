import { gql } from '@apollo/client'
import { PROFILE_VENUES_FRAGMENT } from '@graphql/DM/fragments/profilevenue.fragments'

export const CURRENT_VENUE_QUERY = gql`
	${PROFILE_VENUES_FRAGMENT}
	query currentVenue($where: ProfileWhereInput, $currentLocationCoords: CoordsInput) {
		currentVenue(where: $where, currentLocationCoords: $currentLocationCoords) {
			...PROFILE_VENUES_FRAGMENT
		}
	}
`

export const GET_LIVE_VENUE_TOTALS_QUERY = gql`
	query getLiveVenueTotals($profileIdVenue: String!) {
		getLiveVenueTotals(profileIdVenue: $profileIdVenue) {
			totaled {
				id
				personalProfileId
			}
			joined {
				id
				personalProfileId
			}
		}
	}
`
