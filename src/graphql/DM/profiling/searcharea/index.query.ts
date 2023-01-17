import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const VENUES_NEARBY_QUERY = gql`
	${PROFILE_FRAGMENT}
	query venuesNearby(
		$latitude: Float!
		$longitude: Float!
		$countryIsoCode: String!
		$stateIsoCode: String!
		$kRing: Int
	) {
		venuesNearby(
			latitude: $latitude
			longitude: $longitude
			countryIsoCode: $countryIsoCode
			stateIsoCode: $stateIsoCode
			kRing: $kRing
		) {
			venuesNearby {
				...PROFILE_FRAGMENT
			}
			searchArea {
				coords {
					latitude
					longitude
				}
				city {
					coords {
						latitude
						longitude
					}
					isoCode
					name
				}
				country {
					coords {
						latitude
						longitude
					}
					isoCode
					name
				}
				state {
					coords {
						latitude
						longitude
					}
					isoCode
					name
				}
			}
		}
	}
`

export const GET_COUNTRIES_QUERY = gql`
	query getAllCountries {
		getAllCountries {
			name
			phonecode
			isoCode
			flag
			currency
			latitude
			longitude
		}
	}
`

export const GET_ALL_STATES_BY_COUNTRY_QUERY = gql`
	query getAllStatesByCountry($countryIsoCode: String!) {
		getAllStatesByCountry(countryIsoCode: $countryIsoCode) {
			name
			isoCode
			countryCode
			latitude
			longitude
		}
	}
`

export const GET_ALL_CITIES_BY_STATE_QUERY = gql`
	query getAllCitiesByState($countryIsoCode: String!, $stateIsoCode: String!) {
		getAllCitiesByState(countryIsoCode: $countryIsoCode, stateIsoCode: $stateIsoCode) {
			name
			stateCode
			countryCode
			latitude
			longitude
		}
	}
`
