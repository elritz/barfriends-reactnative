import { useReactiveVar } from '@apollo/client'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ForegroundLocationPermissionReactiveVar, MapReactiveVar } from '@reactive'
import { Button, Icon } from '@rneui/base'
import { setLocation } from '@util/hooks/permissions/location/setLocation'
import * as Location from 'expo-location'
import { useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components/native'

const LocationStatusButton = () => {
	const themeContext = useContext(ThemeContext)
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
							return themeContext.palette.highlight.background.secondary
						case false:
							return themeContext.palette.contrast.background.primary
						default:
							return themeContext.palette.contrast.background.primary
					}
				case 'denied':
					return themeContext.palette.error.background
				case 'undetermined':
					return themeContext.palette.disabled.background
			}
		} else {
			return themeContext.palette.error.background
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
			buttonStyle={{
				width: 40,
				borderRadius: 20,
				backgroundColor: themeContext.palette.contrast.background.secondary,
			}}
			icon={
				<MaterialIcons
					name={rPermissionLocation.granted ? 'location-on' : 'not-listed-location'}
					size={24}
					color={iconColor()}
					onPress={() => onPress()}
				/>
			}
		/>
	)
}

export default LocationStatusButton
