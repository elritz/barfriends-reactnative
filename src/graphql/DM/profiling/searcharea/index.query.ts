import { gql } from '@apollo/client'
import { PROFILE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const VENUES_NEARBY_QUERY = gql`
	${PROFILE_FRAGMENT}
	query venuesNearby($latitude: Float!, $longitude: Float!) {
		venuesNearby(latitude: $latitude, longitude: $longitude) {
			...PROFILE_FRAGMENT
		}
	}
`
export const GET_COUNTRIES_QUERY = gql`
	query getAllCountries {
		getAllCountries {
			name
		}
	}
`

export const GET_ALL_STATES_BY_COUNTRY_QUERY = gql`
	query getAllStatesByCountry($countryIsoCode: String!) {
		getAllStatesByCountry(countryIsoCode: $countryIsoCode) {
			name
		}
	}
`

export const GET_ALL_CITIES_BY_STATE_QUERY = gql`
	query getAllCitiesByState($countryIsoCode: String!, $state: String!) {
		getAllCitiesByState(countryIsoCode: $countryIsoCode, state: $state) {
			name
		}
	}
`
