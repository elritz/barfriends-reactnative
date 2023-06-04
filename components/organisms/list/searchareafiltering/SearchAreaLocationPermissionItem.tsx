// TODO: UX() location icon when searchArea is using Currently Location over preset
import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { FontAwesome5 } from '@expo/vector-icons'
import { LocalStoragePreferenceSearchAreaType2 } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionForegroundLocationReactiveVar, SearchAreaReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import * as IntentLauncher from 'expo-intent-launcher'
import { Pressable, HStack, Icon, IconButton, Text, VStack, Box } from 'native-base'
import { Alert, Linking, Platform } from 'react-native'

const SearchAreaLocationPermissionItem = () => {
	const rPermissionForegroundLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const colorScheme = useThemeColorScheme()

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
		<VStack>
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
				// isPressed={rSearchAreaVar?.useCurrentLocation}
				rounded={'md'}
				_light={{
					bg: rSearchAreaVar?.useCurrentLocation ? 'light.300' : 'light.300',
				}}
				_dark={{
					bg: rSearchAreaVar?.useCurrentLocation ? 'dark.200' : 'dark.200',
				}}
			>
				<HStack p={3} justifyContent={'space-between'}>
					<Text
						textAlign={'left'}
						fontWeight={'semibold'}
						fontSize={'md'}
						ellipsizeMode={'tail'}
						alignSelf={'center'}
						color={colorScheme === 'light' ? 'black' : 'white'}
					>
						{rSearchAreaVar?.useCurrentLocation ? 'Using current location' : 'Use current location'}
					</Text>
					<Box
						h={'35px'}
						w={'35px'}
						alignItems={'center'}
						justifyContent={'center'}
						rounded={'full'}
						_light={{
							bg: rSearchAreaVar?.useCurrentLocation ? 'blue.400' : 'light.200',
						}}
						_dark={{
							bg: rSearchAreaVar?.useCurrentLocation ? 'blue.400' : 'light.500',
						}}
					>
						<Icon
							size={'sm'}
							as={FontAwesome5}
							name={'location-arrow'}
							rounded={'full'}
							_light={{
								color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
							}}
							_dark={{
								color: rSearchAreaVar?.useCurrentLocation ? 'white' : 'blue.400',
							}}
						/>
					</Box>
				</HStack>
			</Pressable>

		</VStack>
	)
}

export default SearchAreaLocationPermissionItem
