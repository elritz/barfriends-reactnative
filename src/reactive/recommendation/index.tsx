import { makeVar } from '@apollo/client'

export type SearchAreaType =
	| {
			useCurrentLocation: boolean
			country: string | undefined
			state: string | undefined
			city: string | undefined
			isoCode: string | undefined
			coords: {
				latitude: number | undefined
				longitude: number | undefined
			}
			kRing: number
			distance: number
	  }
	| null
	| undefined

export const searchAreaInitialState: SearchAreaType = {
	useCurrentLocation: false,
	country: '',
	isoCode: '',
	state: '',
	city: '',
	coords: {
		latitude: undefined,
		longitude: undefined,
	},
	kRing: 1,
	distance: 30,
}

export const SearchAreaReactiveVar = makeVar<SearchAreaType | null>(searchAreaInitialState)
