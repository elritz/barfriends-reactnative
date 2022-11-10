import { useReactiveVar } from '@apollo/client'
import {
	AUTHORIZATION,
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
} from '@constants/StorageConstants'
import { LOCATION_TASK_NAME, GEOFENCING_LOCATION_TASK_NAME } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { setTheme, useToggleTheme } from '@navigation/navigators/Navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	AuthorizationReactiveVar,
	searchAreaInitialState,
	SearchAreaReactiveVar,
	ThemeColorScheme,
	ThemeInterface,
	ThemeReactiveVar,
} from '@reactive'
import { secureStorageItemDelete } from '@util/hooks/local/useSecureStorage'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'
import { Box, Heading, HStack, Icon, useColorMode, useDisclose } from 'native-base'
import { ScrollView, Button, Text, Divider, VStack, Pressable } from 'native-base'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Platform, Linking, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(Change theme functionality with database and local storage save)

let foregroundSubscription = null

const DevelopmentScreen = () => {
	const insets = useSafeAreaInsets()
	const colorScheme = useColorScheme()
	const [currentPosition, setCurrentPosition] = useState<LocationObject>()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { toggleColorMode, colorMode } = useColorMode()
	const [theme, toggleThemes] = useToggleTheme()

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	// variables
	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `index-${index}`),
		[],
	)
	const snapPoints = useMemo(() => ['45%', '95%'], [])

	// callbacks
	const handleSheetChange = useCallback(index => {
		console.log('handleSheetChange', index)
	}, [])

	const handleSnapPress = useCallback(index => {
		console.log('handleSheetChange', index)
		bottomSheetModalRef.current.present()
		bottomSheetModalRef.current?.snapToIndex(index)
	}, [])

	const handleClosePress = useCallback(() => {
		bottomSheetModalRef.current?.close()
	}, [])

	// render
	const renderItem = useCallback(
		({ item }) => (
			<Box
				style={{
					flex: 1,
					padding: 6,
					margin: 6,
					backgroundColor: '#eee',
				}}
			>
				<Text>{item}</Text>
			</Box>
		),
		[],
	)

	const ITEM_HEIGHT = 50
	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_OPS_SETTINGS)
		}
	}

	const startForegroundUpdate = async () => {
		const { granted } = await Location.getForegroundPermissionsAsync()
		if (!granted) {
			console.log('TODO: location tracking denied')
			return
		}

		// Make sure that foreground location tracking is not running
		foregroundSubscription?.remove()

		// Start watching position in real-time
		foregroundSubscription = await Location.watchPositionAsync(
			{
				// For better logs, we set the accuracy to the most sensitive option
				accuracy: Location.Accuracy.BestForNavigation,
			},
			location => {
				setCurrentPosition(location)
			},
		)
	}

	// Stop location tracking in foreground
	const stopForegroundUpdate = () => {
		foregroundSubscription?.remove()
		setCurrentPosition(null)
	}

	// Start location tracking in background
	const startBackgroundUpdate = async () => {
		// Don't track position if permission is not granted
		const { granted } = await Location.getBackgroundPermissionsAsync()
		if (!granted) {
			console.log('TODO:location tracking denied')
			return
		}

		// Make sure the task is defined otherwise do not start tracking
		const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
		if (!isTaskDefined) {
			console.log('TODO: Task is not defined')
			return
		}

		// Don't track if it is already running in background
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
		if (hasStarted) {
			console.log('TODO:Already started')
			return
		}

		await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
			// For better logs, we set the accuracy to the most sensitive option
			accuracy: Location.Accuracy.BestForNavigation,
			// Make sure to enable this notification if you want to consistently track in the background
			showsBackgroundLocationIndicator: true,
			deferredUpdatesInterval: ENVIRONMENT === 'development' ? 1000 : 5000,
			distanceInterval: ENVIRONMENT === 'development' ? 0 : 20,
			foregroundService: {
				notificationTitle: 'Location',
				notificationBody: 'Location tracking in background',
				notificationColor: '#fff',
			},
		})
	}

	// Stop location tracking in background
	const stopBackgroundUpdate = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
		if (hasStarted) {
			await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
			console.log('TODO:Location tacking stopped')
		}
	}

	const onReloadPress = useCallback(() => {
		if (Platform.OS === 'web') {
			location.reload()
		} else {
			Updates.reloadAsync()
		}
	}, [])

	return (
		<Box flex={1} mx={3}>
			<Box my={5}>
				<Text
					adjustsFontSizeToFit
					fontSize={'3xl'}
					textAlign={'center'}
					textTransform={'capitalize'}
					fontWeight={'black'}
				>
					{String.fromCharCode(60)}
					{ENVIRONMENT} {String.fromCharCode(47, 62)}
				</Text>
			</Box>
			<ScrollView
				flex={1}
				mt={5}
				contentInset={{ bottom: insets.bottom + 80 }}
				showsVerticalScrollIndicator={false}
			>
				<Pressable onPress={onReloadPress}>
					<Box height={ITEM_HEIGHT} justifyContent={'space-between'}>
						<Divider />
						<HStack space={1} alignItems={'center'}>
							<Icon size={'md'} as={Ionicons} name={'refresh'} />
							<Heading variant={'solid'} colorScheme={'tertiary'}>
								Refresh
							</Heading>
						</HStack>
						<Divider />
					</Box>
				</Pressable>
				<Pressable onPress={() => handleSnapPress(1)}>
					<Box height={ITEM_HEIGHT} justifyContent={'space-between'}>
						<Divider />
						<HStack space={1} alignItems={'center'}>
							<Icon size={'md'} as={Ionicons} name={'color-palette-sharp'} />
							<Heading variant={'solid'} colorScheme={'tertiary'}>
								Change theme
							</Heading>
						</HStack>
						<Divider />
					</Box>
				</Pressable>
				<BottomSheetModal
					ref={bottomSheetModalRef}
					snapPoints={snapPoints}
					onChange={handleSheetChange}
				>
					<BottomSheetFlatList
						data={data}
						keyExtractor={i => i}
						numColumns={3}
						renderItem={renderItem}
						ListHeaderComponent={() => {
							return (
								<HStack px={2} py={4} w={'full'} space={21} justifyContent={'space-around'}>
									<Button
										onPress={async () => {
											// if (colorMode !== 'light') {
											// 	toggleColorMode()
											// }
											await toggleThemes({ newColorScheme: 'light' })
											// setTheme({
											// 	colorScheme,
											// 	rAuthorizationVar,
											// 	rThemeVar,
											// 	newColorScheme: 'light',
											// })
										}}
										bg={'light.200'}
										flex={1}
									>
										<Text color={'black'}>Light</Text>
									</Button>
									<Button
										onPress={async () => {
											// if (colorMode !== 'dark') {
											// 	toggleColorMode()
											// }
											await toggleThemes({ newColorScheme: 'dark' })
											// setTheme({
											// 	colorScheme,
											// 	rAuthorizationVar,
											// 	rThemeVar,
											// 	newColorScheme: 'dark',
											// })
										}}
										bg={'dark.100'}
										flex={1}
									>
										<Text color={'white'}>Dark</Text>
									</Button>
									<Button
										onPress={async () => {
											await toggleThemes({ newColorScheme: 'system' })
											// setTheme({
											// 	colorScheme,
											// 	rAuthorizationVar,
											// 	rThemeVar,
											// 	newColorScheme: 'system',
											// })
										}}
										bg={colorScheme === 'light' ? 'light.200' : 'dark.100'}
										flex={1}
									>
										<Text color={colorScheme === 'light' ? 'black' : 'white'}>System</Text>
									</Button>
								</HStack>
							)
						}}
					/>
				</BottomSheetModal>

				<Text my={5} adjustsFontSizeToFit fontSize={'2xl'} fontWeight={'black'}>
					Authentication
				</Text>
				<Button
					marginX={10}
					onPress={async () =>
						await secureStorageItemDelete({
							key: AUTHORIZATION,
						})
					}
					variant={'solid'}
					colorScheme={'error'}
					color={'white'}
				>
					Delete authentication token
				</Button>
				<Text my={5} adjustsFontSizeToFit fontSize={'2xl'} fontWeight={'black'}>
					Search Area
				</Text>
				<Button
					marginX={10}
					onPress={async () => {
						await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
						SearchAreaReactiveVar(searchAreaInitialState)
					}}
					variant={'solid'}
					colorScheme={'error'}
					color={'white'}
				>
					Remove Search Area token
				</Button>
				<Text my={5} adjustsFontSizeToFit fontSize={'2xl'} fontWeight={'black'}>
					Open Settings
				</Text>
				<Button
					marginX={10}
					onPress={handleOpenPhoneSettings}
					variant={'solid'}
					colorScheme={'primary'}
					color={'white'}
				>
					Open settings
				</Button>
				<Divider my={10} />

				{/* <Text fontSize={'2xl'}>Current Pos</Text>
				<Text fontSize={'2xl'}>{currentPosition?.coords.latitude}</Text>
				<Text fontSize={'2xl'}>{currentPosition?.coords.longitude}</Text>
				<Text fontSize={'2xl'}>MASTER</Text>
				<Text fontSize={'2xl'}>latitude:43.456074</Text>
				<Text fontSize={'2xl'}>longitude: -80.483948</Text>
				<Text fontSize={'2xl'}>OFFICE</Text>
				<Text fontSize={'2xl'}>latitude: 43.455957, </Text>
				<Text fontSize={'2xl'}>longitude: -80.483694</Text> */}

				<Text my={5} adjustsFontSizeToFit fontSize={'2xl'} fontWeight={'black'}>
					Location Tracking
				</Text>
				<VStack space={2} w={'full'} px={10}>
					<Button onPress={startForegroundUpdate} color='green'>
						Start in foreground
					</Button>
					<Divider />
					<Button onPress={stopForegroundUpdate} color='red'>
						Stop in foreground
					</Button>
					<Divider />
					<Button onPress={startBackgroundUpdate} color='green'>
						Start in background
					</Button>
					<Divider />
					<Button onPress={stopBackgroundUpdate} color='red'>
						Stop in background
					</Button>
				</VStack>
				{/* <Button onPress={getPosition} color='green.400'>
						Get current Position
					</Button>
					<Button onPress={startGeoFencingUpdate} color='green.400'>
						Start Geofencing
					</Button>
					<Button onPress={stopGeofencing} color='red.500'>
						Stop Geofencing
					</Button> */}
			</ScrollView>
		</Box>
	)
}
export default DevelopmentScreen
