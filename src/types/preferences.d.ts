import { ColorSchemeName } from 'react-native'

export type ThemeColorSchemeOptionsType = 'light' | 'dark' | 'system'

export type LocalStoragePreferenceNotificationPermissionType = {
	dateToShowAgain: number
	canShowAgain: boolean
}

export type LocalStoragePreferenceThemeType = {
	colorScheme: ThemeColorSchemeOptionsType
}

export type LocalStoragePreferenceSearchAreaType =
	| {
			useCurrentLocation: boolean
			country: string
			state: string
			city: string
			isoCode: string
			coords: {
				latitude: number
				longitude: number
			}
			kRing: number
			distance: number
	  }
	| null
	| undefined
