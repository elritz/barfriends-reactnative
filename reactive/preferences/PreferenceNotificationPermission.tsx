import { NowPreferencePermissionInitialState } from '.'
import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@preferences'

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceAskNotificationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
