import LocationPermission from './variants/AskLocationPermission'
import CurrentLocationFromVenueDistance from './variants/CurrentLocationFromVenueDistance'
import { useReactiveVar } from '@apollo/client'
import { ForegroundLocationPermissionReactiveVar } from '@reactive'
import { Box } from 'native-base'

export default function DistanceCard() {
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	return (
		<Box flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			{rPermissionLocationVar.granted ? <CurrentLocationFromVenueDistance /> : <LocationPermission />}
		</Box>
	)
}
