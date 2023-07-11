import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@preferences'
import { NowPreferencePermissionInitialState } from './index'

export const PreferenceForegroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskForegroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
