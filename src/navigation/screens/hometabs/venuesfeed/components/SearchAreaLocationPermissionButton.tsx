import { useReactiveVar } from '@apollo/client'
import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'
import { useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar, SearchAreaReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as Location from 'expo-location'
import { Button } from 'native-base'

export default function SearchAreaLocationPermissionButton() {
	const navigation = useNavigation()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)

	const handleLocationPermissionNavigation = async () => {
		navigation.navigate('PermissionNavigator', {
			screen: 'ForegroundLocationPermissionSearchAreaScreen',
		})
	}

	return (
		<Button
			variant='solid'
			onPress={async () =>
				rPermissionLocationVar.granted
					? await useSetSearchAreaWithLocation()
					: await handleLocationPermissionNavigation()
			}
			mt={15}
			w={'85%'}
			_text={{
				fontSize: 'lg',
				fontWeight: 'bold',
			}}
		>
			Continue
		</Button>
	)
}
