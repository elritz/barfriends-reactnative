import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSearchAreaType } from '@preferences'

export const searchAreaInitialState: LocalStoragePreferenceSearchAreaType = {
	useCurrentLocation: false,
	country: '',
	isoCode: '',
	state: '',
	city: '',
	coords: {
		latitude: 0,
		longitude: 0,
	},
	kRing: 1,
	distance: 30,
}

export const SearchAreaReactiveVar =
	makeVar<LocalStoragePreferenceSearchAreaType>(searchAreaInitialState)
