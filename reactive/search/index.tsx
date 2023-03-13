import { makeVar } from '@apollo/client'

type SearchType = {
	searchText: string
}

export const searchInitialState: SearchType = {
	searchText: '',
}

export const SearchReactiveVar = makeVar<SearchType | null>(searchInitialState)
