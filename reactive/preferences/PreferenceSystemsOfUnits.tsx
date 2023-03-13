import { makeVar } from '@apollo/client'
import {
	LocalStoragePreferenceAskSystemOfUnitsPermissionType,
	LocalStoragePreferenceSystemsOfUnitsType,
} from '@preferences'
import { DateTime } from 'luxon'

// import { LocalStoragePreferenceSystemsOfUnitsType, SystemsOfUnits } from '@preferences'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export const PreferenceSystemsOfUnitsInitialState: LocalStoragePreferenceSystemsOfUnitsType = {
	canShowAgain: true,
	dateToShowAgain: DateTime.now(),
	system: SystemsOfUnits.Metric,
}

export const PreferenceSystemsOfUnitsReactiveVar =
	makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(PreferenceSystemsOfUnitsInitialState)
