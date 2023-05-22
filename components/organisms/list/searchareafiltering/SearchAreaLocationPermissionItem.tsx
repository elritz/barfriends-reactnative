import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { FontAwesome5 } from '@expo/vector-icons'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import * as IntentLauncher from 'expo-intent-launcher'
import { Pressable, HStack, Icon, IconButton, Text, VStack, Box } from 'native-base'
import { Alert, Linking, Platform } from 'react-native'

// TODO: UX() location icon when searchArea is using Currently Location over preset

const SearchAreaLocationPermissionItem = () => {
	const rForegroundPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)

	const newSearchArea: LocalStoragePreferenceSearchAreaType2 = {
		...rSearchAreaVar,
		useCurrentLocation: false,
	}

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Location Permission',
			capitalizeFirstLetter(rForegroundPermissionLocationVar?.status),
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
		<VStack>
			{rSearchAreaVar?.useCurrentLocation ? (
				<Box mb={3}>
					<Text textAlign={'center'}>
						You are currently using your devices location to show you venues nearby.
					</Text>
				</Box>
			) : (
				<Box mb={3}>
					<Text textAlign={'center'}>Use your location to automatically set your area.</Text>
				</Box>
			)}
			<Pressable
				onPress={async () => {
					!rSearchAreaVar?.useCurrentLocation
						? !rForegroundPermissionLocationVar?.granted
							? rForegroundPermissionLocationVar?.canAskAgain && !rForegroundPermissionLocationVar.granted
								? await useSetSearchAreaWithLocation()
								: createTwoButtonAlert()
							: await useSetSearchAreaWithLocation()
						: (SearchAreaReactiveVar({
								...newSearchArea,
								useCurrentLocation: false,
						  }),
						  await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, JSON.stringify(newSearchArea)))
				}}
				isPressed={rSearchAreaVar?.useCurrentLocation}
				rounded={'xl'}
				_light={{
					bg: !rSearchAreaVar?.useCurrentLocation ? 'light.400' : 'light.200',
				}}
				_dark={{
					bg: !rSearchAreaVar?.useCurrentLocation ? 'dark.200' : 'dark.200',
				}}
				_pressed={{
					bg: 'primary.500',
				}}
			>
				<HStack p={3} justifyContent={'space-between'}>
					<Text
						textAlign={'left'}
						fontWeight={'semibold'}
						fontSize={'md'}
						ellipsizeMode={'tail'}
						alignSelf={'center'}
						color={'white'}
					>
						{rSearchAreaVar?.useCurrentLocation ? 'Using current location' : 'Use current location'}
					</Text>
					<IconButton
						icon={
							<Icon
								size={'xs'}
								as={FontAwesome5}
								name={'location-arrow'}
								_light={{
									color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
								}}
								_dark={{
									color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
								}}
							/>
						}
						_light={{
							bg: rSearchAreaVar?.useCurrentLocation ? 'blue.600' : 'light.200',
						}}
						_dark={{
							bg: rSearchAreaVar?.useCurrentLocation ? 'blue.600' : 'light.500',
						}}
						rounded={'full'}
					/>
				</HStack>
			</Pressable>
		</VStack>
	)
}

export default SearchAreaLocationPermissionItem
