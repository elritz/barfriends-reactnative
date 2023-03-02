import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'

export const searchAreaInitialState: LocalStoragePreferenceSearchAreaType2 = {
	useCurrentLocation: false,
	searchArea: {
		country: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		state: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		city: {
			coords: {
				latitude: null,
				longitude: null,
			},
			isoCode: '',
			name: '',
		},
		coords: {
			latitude: null,
			longitude: null,
		},
	},
	kRing: {
		value: 1,
		distance: 30,
	},
}

export const SearchAreaReactiveVar =
	makeVar<LocalStoragePreferenceSearchAreaType2>(searchAreaInitialState)
