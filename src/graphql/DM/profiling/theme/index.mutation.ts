import { gql } from '@apollo/client'
import { PROFILE_THEME_FRAGMENT } from '@graphql/DM/fragments/theme.fragments'

export const UPDATE_THEME_MANAGER_ = gql`
	${PROFILE_THEME_FRAGMENT}
	mutation updateThemeManagerSwitchTheme($id: String!, $themeId: String!) {
		updateThemeManagerSwitchTheme(id: $id, themeId: $themeId) {
			...PROFILE_THEME_FRAGMENT
		}
	}
`
// export const UPDATE_THEME_MANAGER_ = gql`
// 	${PROFILE_THEME_FRAGMENT}
// 	mutation updateThemeManagerSwitchTheme($id: String!, $themeId: String!) {
// 		updateThemeManagerSwitchTheme(id: $id, themeId: $themeId)
// 	}
// `

// export const GET_THEMES = gql`
//   query GetThemes(
//     $first: Int
//     $last: Int
//     $before: ThemeWhereUniqueInput
//     $after: ThemeWhereUniqueInput
//   ) {
//     themes(first: $first, last: $last, before: $before, after: $after) {
//       id
//       name
//       text
//       tint
//       background
//       tabBar
//       tabIconSelected
//       tabIconDefault
//     }
//   }
// `;
