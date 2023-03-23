import { NowPreferencePermissionInitialState } from '.'
import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'

export const PreferenceBackgroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
