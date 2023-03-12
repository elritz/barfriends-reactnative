import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@preferences'
import { DateTime } from 'luxon'

export const PreferencePermissionNotificationInitialState: LocalStoragePreferenceAskNotificationPermissionType =
	{
		dateToShowAgain: DateTime.local().toJSDate(),
		canShowAgain: true,
	}

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceAskNotificationPermissionType | null>(
		PreferencePermissionNotificationInitialState,
	)
