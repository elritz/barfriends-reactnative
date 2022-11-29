import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceNotificationPermissionType } from '@preferences'

export const PreferenceNotificationPermissionInitialState: LocalStoragePreferenceNotificationPermissionType =
	{
		dateToShowAgain: Date.now(),
		canShowAgain: true,
	}

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceNotificationPermissionType | null>(
		PreferenceNotificationPermissionInitialState,
	)
