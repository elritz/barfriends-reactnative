import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@preferences'
import { DateTime } from 'luxon'

export const PreferenceForegroundLocationPermissionInitialState: LocalStoragePreferenceAskForegroundLocationPermissionType =
	{
		dateToShowAgain: DateTime.now(),
		canShowAgain: true,
	}

export const PreferenceForegroundLocationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskForegroundLocationPermissionType | null>(
		PreferenceForegroundLocationPermissionInitialState,
	)
