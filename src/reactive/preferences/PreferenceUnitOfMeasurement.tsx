import { makeVar } from '@apollo/client'
import { LocalStoragePreferenceUnitOfMeasurement, SystemsOfUnits } from '@preferences'

export const PreferenceUnitOfMeasuremenInitialState: LocalStoragePreferenceUnitOfMeasurement = {
	system: SystemsOfUnits.Metric,
}

export const PreferenceUnitOfMeasurementReactiveVar =
	makeVar<LocalStoragePreferenceUnitOfMeasurement | null>(PreferenceUnitOfMeasuremenInitialState)
