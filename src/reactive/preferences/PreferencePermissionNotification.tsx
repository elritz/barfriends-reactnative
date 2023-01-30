import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceNotificationPermissionType } from '@preferences'

export const PreferencePermissionNotificationInitialState: LocalStoragePreferenceNotificationPermissionType =
	{
		dateToShowAgain: Date.now(),
		canShowAgain: true,
	}

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceNotificationPermissionType | null>(
		PreferencePermissionNotificationInitialState,
	)
