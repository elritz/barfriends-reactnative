import { makeVar } from '@apollo/client'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { LocationGeocodedAddress, LocationObject } from 'expo-location'

type SearchType = {
	searchText: string
	searchRegion?: {
		radius: number
		coords: {
			latitude: number
			longitude: number
		}
	}
}

export const searchInitialState: SearchType = {
	searchText: '',
	searchRegion: {
		radius: 1000,
		coords: {
			latitude: 0,
			longitude: 0,
		},
	},
}

export const SearchReactiveVar = makeVar<SearchType | null>(searchInitialState)
