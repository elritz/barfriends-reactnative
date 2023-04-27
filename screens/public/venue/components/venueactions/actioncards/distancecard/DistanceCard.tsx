import AskForegroundLocationPermission from './variants/AskLocationPermission'
import CurrentLocationFromVenueDistance from './variants/CurrentLocationFromVenueDistance'
import { useReactiveVar } from '@apollo/client'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { Box } from 'native-base'

export default function DistanceCard() {
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	return (
		<Box flexDirection={'column'} justifyContent={'space-around'} height={'100%'} w={'100%'}>
			{rPermissionLocationVar?.granted ? (
				<CurrentLocationFromVenueDistance />
			) : (
				<AskForegroundLocationPermission />
			)}
		</Box>
	)
}