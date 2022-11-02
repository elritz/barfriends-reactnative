import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar, MapReactiveVar } from '@reactive'
import { setLocation } from '@util/hooks/permissions/location/setLocation'
import * as Location from 'expo-location'
import { Button, Icon, useTheme } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const LocationStatusButton = () => {
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const navigation = useNavigation()
	const rPermissionLocation = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	const map = useReactiveVar(MapReactiveVar)

	const setMapToLocation = () => {
		MapReactiveVar()
	}

	const requestionLocationPermission = async () => {
		const response = await Location.requestForegroundPermissionsAsync()
		ForegroundLocationPermissionReactiveVar(response)

		if (response.status === 'granted') {
			setLocation()
			setMapToLocation()
		}
	}

	const useCurrentLocationForMap = async () => {
		setLocation()
	}

	const iconColor = () => {
		if (rPermissionLocation.granted) {
			switch (rPermissionLocation.status) {
				case 'granted':
					switch (map.centerOnUserCurrentLocation) {
						case true:
							return theme.colors.secondary[500]
						case false:
							return theme.colors.secondary[500]
						default:
							return theme.colors.secondary[500]
					}
				case 'denied':
					return theme.colors.error[500]
				case 'undetermined':
					return theme.colors.secondary[400]
			}
		} else {
			return theme.colors.error[500]
		}
	}

	const onPress = () => {
		switch (rPermissionLocation.status) {
			case 'granted':
				return useCurrentLocationForMap()
			case 'denied':
				return navigation.navigate('PermissionNavigator', {
					screen: 'ForegroundLocationPermissionScreen',
				})
			case 'undetermined':
				navigation.navigate('PermissionNavigator', {
					screen: 'ForegroundLocationPermissionScreen',
				})
			default:
				null
		}
	}

	return (
		<Button
			w={'40px'}
			borderRadius={20}
			colorScheme={'secondary'}
			rightIcon={
				<Icon
					as={MaterialIcons}
					name={rPermissionLocation.granted ? 'location-on' : 'not-listed-location'}
					size={'lg'}
					color={iconColor()}
					onPress={() => onPress()}
				/>
			}
		/>
	)
}

export default LocationStatusButton
