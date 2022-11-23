import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ForegroundLocationPermissionReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import { Pressable, HStack, Icon, IconButton, Text } from 'native-base'
import { useContext } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { ThemeContext } from 'styled-components/native'

// TODO: UX() location icon when searchArea is using Currently Location over preset

const LocationPermissionItem = () => {
	const themeContext = useContext(ThemeContext)
	const rForegroundPermissionLocationVar = useReactiveVar(ForegroundLocationPermissionReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const newSearchArea = {
		...rSearchAreaVar,
		useCurrentLocation: false,
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Location Permission',
			capitalizeFirstLetter(rForegroundPermissionLocationVar.status),
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	return (
		<Pressable
			onPress={async () => {
				!rSearchAreaVar.useCurrentLocation
					? !rForegroundPermissionLocationVar.granted
						? rForegroundPermissionLocationVar?.canAskAgain && !rForegroundPermissionLocationVar.granted
							? await useSetSearchAreaWithLocation()
							: createTwoButtonAlert()
						: await useSetSearchAreaWithLocation()
					: (SearchAreaReactiveVar(newSearchArea),
					  await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchArea)))
			}}
			rounded={'xl'}
			_light={{
				bg: !rSearchAreaVar.useCurrentLocation ? 'light.100' : 'light.100',
			}}
			_dark={{
				bg: !rSearchAreaVar.useCurrentLocation ? 'light.900' : 'light.900',
			}}
			_pressed={{
				bg: 'primary.500',
			}}
		>
			<HStack p={3} justifyContent={'space-between'}>
				<Text
					_light={{
						color: rSearchAreaVar.useCurrentLocation ? 'black' : 'black',
					}}
					_dark={{
						color: 'white',
					}}
					textAlign={'left'}
					fontWeight={'semibold'}
					fontSize={'lg'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
					alignSelf={'center'}
				>
					{rSearchAreaVar.useCurrentLocation ? 'Using current location' : 'Use current location'}
				</Text>
				<IconButton
					icon={
						<Icon
							size={'sm'}
							as={FontAwesome5}
							rounded={'full'}
							name={'location-arrow'}
							_light={{
								color: rSearchAreaVar.useCurrentLocation ? 'white' : 'blue.400',
							}}
							_dark={{
								color: rSearchAreaVar.useCurrentLocation ? 'white' : 'blue.400',
							}}
						/>
					}
					_light={{
						bg: rSearchAreaVar.useCurrentLocation ? 'blue.600' : 'light.200',
					}}
					_dark={{
						bg: rSearchAreaVar.useCurrentLocation ? 'blue.600' : 'light.500',
					}}
					rounded={'full'}
				/>
			</HStack>
		</Pressable>
	)
}

export default LocationPermissionItem

{
	/* <Button
	 	size={'lg'}
	 	w={'full'}
	 	h={55}
	 	rounded={'lg'}
	 	onPress={async () => {
	 		!rSearchAreaVar.useCurrentLocation
	 			? !rForegroundPermissionLocationVar.granted
	 				? rForegroundPermissionLocationVar?.canAskAgain && !rForegroundPermissionLocationVar.granted
	 					? await useSetSearchAreaWithLocation()
	 					: createTwoButtonAlert()
	 				: await useSetSearchAreaWithLocation()
	 			: (SearchAreaReactiveVar(newSearchArea),
	 			  await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchArea)))
	 	}}
	 	rightIcon={
	 		<IconButton
	 			icon={
	 				<Icon
	 					size={'sm'}
	 					as={FontAwesome5}
	 					rounded={'full'}
	 					name={'location-arrow'}
	 					color={rSearchAreaVar.useCurrentLocation ? 'white' : 'blue.400'}
	 				/>
	 			}
	 			bg={rSearchAreaVar.useCurrentLocation ? 'blue.600' : 'secondary.700'}
	 			rounded={'full'}
	 		/>
	 	}
	 >
	 	
	 	<Text
	 		textAlign={'left'}
	 		fontWeight={'semibold'}
	 		fontSize={'lg'}
	 		numberOfLines={1}
	 		ellipsizeMode={'tail'}
	 	>
	 		{rSearchAreaVar.useCurrentLocation ? 'Using current location' : 'Use current location'}
	 	</Text>
 	
		 </Button> */
}
