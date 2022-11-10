import { gql } from '@apollo/client'

export const THEME_MANAGER_FRAGMENT = gql`
	fragment THEME_MANAGER_FRAGMENT on ThemeManager {
		id
		activeTheme {
			id
			name
			mobile
			mobileVersions
			web
			webVersions
			startDate
			endDate
			createdAt
			updatedAt
		}
	}
`
