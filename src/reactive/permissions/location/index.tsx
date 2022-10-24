import { makeVar } from '@apollo/client'
import { LocationPermissionResponse } from 'expo-location'
import { PermissionStatus } from 'expo-permissions'

export const forgroundLocationPermissionMediaInitialState: LocationPermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const ForegroundLocationPermissionReactiveVar = makeVar<LocationPermissionResponse | null>(
	forgroundLocationPermissionMediaInitialState,
)

export const backgroundLocationPermissionMediaInitialState: LocationPermissionResponse = {
	canAskAgain: false,
	expires: 'never',
	granted: false,
	status: PermissionStatus.UNDETERMINED,
}

export const BackgroundLocationPermissionReactiveVar = makeVar<LocationPermissionResponse | null>(
	backgroundLocationPermissionMediaInitialState,
)
