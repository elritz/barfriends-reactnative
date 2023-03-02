import { makeVar } from '@apollo/client'

type SearchType = {
	searchText: string
	searchRegion?: {
		radius: number
		coords: {
			latitude: number | null
			longitude: number | null
		}
	}
}

export const searchInitialState: SearchType = {
	searchText: '',
	searchRegion: {
		radius: 1000,
		coords: {
			latitude: null,
			longitude: null,
		},
	},
}

export const SearchReactiveVar = makeVar<SearchType | null>(searchInitialState)
