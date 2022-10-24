import { gql } from '@apollo/client'

export const ALL_EMOJIMOODS = gql`
	query emojimoods(
		$first: Int
		$last: Int
		$before: EmojimoodWhereUniqueInput
		$after: EmojimoodWhereUniqueInput
		$where: EmojimoodWhereInput
	) {
		emojimoods(where: $where, first: $first, last: $last, before: $before, after: $after) {
			id
			colors
			emoji
			emojiname
		}
	}
`

export const EMOJIMOOD = gql`
	query emojimood($where: EmojimoodWhereUniqueInput!) {
		emojimood(where: $where) {
			id
			colors
			emoji
			emojiname
		}
	}
`
