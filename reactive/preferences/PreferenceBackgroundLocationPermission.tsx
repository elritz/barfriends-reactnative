import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'
import { NowPreferencePermissionInitialState } from './index'

export const PreferenceBackgroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
