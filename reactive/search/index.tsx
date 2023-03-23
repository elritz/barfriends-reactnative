import { makeVar } from '@apollo/client'

type SearchType = {
	searchText: string
}

export const searchInitialState: SearchType = {
	searchText: '',
}

export const SearchReactiveVar = makeVar<SearchType | null>(searchInitialState)

type SearchAreaType = {
	searchText: string
	country: string
	state: string
	city: string
}

// export const searchAreaInitialState: SearchAreaType = {
// 	searchText: '',
// 	city: '',
// 	country: '',
// 	state: '',
// }

// export const SearchAreaReactiveVar = makeVar<SearchAreaType | null>(searchAreaInitialState)
