import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@preferences'
import { NowPreferencePermissionInitialState } from './index'

export const PreferencePermissionNotificationReactiveVar =
	makeVar<LocalStoragePreferenceAskNotificationPermissionType | null>(
		NowPreferencePermissionInitialState,
	)
