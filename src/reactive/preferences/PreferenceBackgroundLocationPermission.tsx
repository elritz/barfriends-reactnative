import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'
import { DateTime } from 'luxon'

export const PreferenceNotificationPermissionInitialState: LocalStoragePreferenceAskBackgroundLocationPermissionType =
	{
		dateToShowAgain: DateTime.local().toJSDate(),
		canShowAgain: true,
	}

export const PreferenceNotificationPermissionReactiveVar =
	makeVar<LocalStoragePreferenceAskBackgroundLocationPermissionType | null>(
		PreferenceNotificationPermissionInitialState,
	)
