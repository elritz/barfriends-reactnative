import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSystemsOfUnitsType } from '@preferences'
import { DateTime } from 'luxon'

// import { LocalStoragePreferenceSystemsOfUnitsType, SystemsOfUnits } from '@preferences'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export const PreferenceSystemsOfUnitsInitialState: LocalStoragePreferenceSystemsOfUnitsType = {
	system: SystemsOfUnits.Metric,
	canShowAgain: true,
	dateToShowAgain: DateTime.now(),
}

export const PreferenceSystemsOfUnitsReactiveVar =
	makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(PreferenceSystemsOfUnitsInitialState)
