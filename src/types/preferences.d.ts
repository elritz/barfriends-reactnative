import { ColorSchemeName } from 'react-native'

export type ThemeColorSchemeOptionsType = 'light' | 'dark' | 'system'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export type DefaultPreferenceToPermission = {
	dateToShowAgain: number
	canShowAgain: boolean
}

export interface LocalStoragePreferenceNotificationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceBackgroundLocationPermissionType
	extends DefaultPreferenceToPermission {}

export type LocalStoragePreferenceThemeType = {
	colorScheme: ThemeColorSchemeOptionsType
}

export type LocalStoragePreferenceSearchAreaType = {
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

export type Coords = {
	latitude: number
	longitude: number
}

export type PlaceType = {
	name: string
	isoCode: string | null
	coords: Coords
}

export type LocalStoragePreferenceSearchAreaType2 = {
	useCurrentLocation: boolean
	searchArea: {
		country: PlaceType
		state: PlaceType
		city: PlaceType
		coords: Coords
	}
	kRing: {
		value: number
		distance: number
	}
}

export interface LocalStoragePreferenceSystemsOfUnitsType extends DefaultPreferenceToPermission {
	system: SystemsOfUnits
}
