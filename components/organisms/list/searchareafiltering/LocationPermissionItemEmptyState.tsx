import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import { Pressable, HStack, Text } from 'native-base'
import { Alert, Linking, Platform } from 'react-native'

// TODO: UX() location icon when searchArea is using Currently Location over preset

const LocationPermissionItemEmptyState = () => {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const newSearchArea: LocalStoragePreferenceSearchAreaType2 = {
		...rSearchAreaVar,
		useCurrentLocation: false,
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Location Permission',
			capitalizeFirstLetter(rPermissionForegroundLocationVar?.status),
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
				!rSearchAreaVar?.useCurrentLocation
					? !rPermissionForegroundLocationVar?.granted
						? rPermissionForegroundLocationVar?.canAskAgain && !rPermissionForegroundLocationVar.granted
							? await useSetSearchAreaWithLocation()
							: createTwoButtonAlert()
						: await useSetSearchAreaWithLocation()
					: (SearchAreaReactiveVar({
							...newSearchArea,
							useCurrentLocation: false,
					  }),
					  await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchArea)))
			}}
			rounded={'xl'}
			_pressed={{
				bg: 'primary.500',
			}}
		>
			<HStack p={3} justifyContent={'space-between'}>
				<Text
					_light={{
						color: 'black',
					}}
					_dark={{
						color: 'white',
					}}
					w={'100%'}
					textAlign={'center'}
					fontWeight={'semibold'}
					fontSize={'md'}
					numberOfLines={1}
					ellipsizeMode={'tail'}
					alignSelf={'center'}
				>
					{rSearchAreaVar?.useCurrentLocation ? 'Using current location' : 'Use current location'}
				</Text>
			</HStack>
		</Pressable>
	)
}

export default LocationPermissionItemEmptyState
