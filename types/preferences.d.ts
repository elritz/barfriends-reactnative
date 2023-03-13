import { ColorSchemeName } from 'react-native'

export type ThemeColorSchemeOptionsType = 'light' | 'dark' | 'system'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export type DefaultPreferenceToPermission = {
	dateToShowAgain: DateTime
	canShowAgain: boolean
}

export interface LocalStoragePreferenceAskNotificationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskBackgroundLocationPermissionType
	extends DefaultPreferenceToPermission {}

export interface LocalStoragePreferenceAskSystemOfUnitsPermissionType
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
		latitude: number | null
		longitude: number | null
	}
	kRing: number
	distance: number
}

export type Coords = {
	latitude: number | null
	longitude: number | null
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
