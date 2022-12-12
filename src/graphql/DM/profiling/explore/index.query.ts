import { gql } from '@apollo/client'

export const EXPLORE_SEARCH_QUERY = gql`
	query exploreSearch($search: String!) {
		exploreSearch(search: $search) {
			people {
				id
				Profile {
					IdentifiableInformation {
						fullname
						firstname
						lastname
						username
					}
					photos {
						id
						active
						blurhash
						url
					}
				}
			}
			venues {
				id
				Profile {
					IdentifiableInformation {
						fullname
						firstname
						lastname
						username
					}
					photos {
						id
						active
						blurhash
						url
					}
				}
			}
			events
		}
	}
`
