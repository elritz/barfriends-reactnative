import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceSystemsOfUnitsType } from '@preferences'

// import { LocalStoragePreferenceSystemsOfUnitsType, SystemsOfUnits } from '@preferences'

export enum SystemsOfUnits {
	Imperial = 'Imperial',
	Metric = 'Metric',
}

export const PreferenceSystemsOfUnitsInitialState: LocalStoragePreferenceSystemsOfUnitsType = {
	system: SystemsOfUnits.Metric,
	canShowAgain: true,
	dateToShowAgain: Date.now(),
}

export const PreferenceSystemsOfUnitsReactiveVar =
	makeVar<LocalStoragePreferenceSystemsOfUnitsType | null>(PreferenceSystemsOfUnitsInitialState)
