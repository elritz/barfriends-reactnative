import { gql } from '@apollo/client'
import { PUBLIC_PROFILE_FRAGMENT } from '@graphql/DM/fragments/profile.fragments'

export const CURRENT_VENUE_QUERY = gql`
	${PUBLIC_PROFILE_FRAGMENT}
	query currentVenue($where: ProfileWhereUniqueInput!) {
		profile(where: $where) {
			...PUBLIC_PROFILE_FRAGMENT
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
