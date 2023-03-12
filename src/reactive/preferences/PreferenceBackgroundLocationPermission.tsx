import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'
import { DateTime } from 'luxon'

export const PreferenceBackgroundLocationPermissionInitialState: LocalStoragePreferenceAskBackgroundLocationPermissionType =
	{
		dateToShowAgain: DateTime.now(),
		canShowAgain: true,
	}

export const PreferenceBackgroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
		PreferenceBackgroundLocationPermissionInitialState,
	)
