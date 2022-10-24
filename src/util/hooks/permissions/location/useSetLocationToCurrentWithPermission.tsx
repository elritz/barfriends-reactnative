import { setLocation } from './setLocation'
import { ForegroundLocationPermissionReactiveVar } from '@reactive'
import * as Location from 'expo-location'
import { useEffect } from 'react'

const useSetLocationToCurrentWithPermission = (): void => {
	const getSetLocationPermissions = async (): Promise<void> => {
		try {
			const currentLocationPermission = await Location.getForegroundPermissionsAsync()
			ForegroundLocationPermissionReactiveVar(currentLocationPermission)
			if (currentLocationPermission.status === 'granted') {
				await setLocation()
			}
		} catch (error) {
			console.error(error, '//! Error with location permissions')
		}
	}

	useEffect(() => {
		getSetLocationPermissions()
	}, [])
}

export default useSetLocationToCurrentWithPermission
