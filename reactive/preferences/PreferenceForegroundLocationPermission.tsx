import { NowPreferencePermissionInitialState } from '.'
import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@preferences'

export const PreferenceForegroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskForegroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
