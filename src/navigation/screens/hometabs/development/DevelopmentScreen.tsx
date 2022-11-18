import { useReactiveVar } from '@apollo/client'
import {
	AUTHORIZATION,
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
} from '@constants/StorageConstants'
import { LOCATION_TASK_NAME, GEOFENCING_LOCATION_TASK_NAME } from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import {
	Profile,
	ProfileTheme,
	useGetAllThemesQuery,
	useProfileLazyQuery,
	useUpdateOneProfileMutation,
	useUpdateThemeManagerSwitchThemeMutation,
} from '@graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	searchAreaInitialState,
	SearchAreaReactiveVar,
	ThemeColorScheme,
	ThemeReactiveVar,
} from '@reactive'
import { secureStorageItemDelete } from '@util/hooks/local/useSecureStorage'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'
import {
	Box,
	Heading,
	HStack,
	Icon,
	ScrollView,
	Button,
	Text,
	Divider,
	VStack,
	Pressable,
	Stack,
} from 'native-base'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Platform, Linking, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(Change theme functionality with database and local storage save)

let foregroundSubscription = null

const DevelopmentScreen = () => {
	const navigation = useNavigation()
	const insets = useSafeAreaInsets()
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [currentPosition, setCurrentPosition] = useState<LocationObject>()
	const [toggleThemes] = useToggleTheme()

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	// variables
	const snapPoints = useMemo(() => ['45%', '95%'], [])

	const handleSnapPress = useCallback(index => {
		bottomSheetModalRef.current.present()
		bottomSheetModalRef.current?.snapToIndex(index)
	}, [])

	// render
	const renderItem = useCallback(({ item }) => {
		const company = {
			dark: [
				item.mobile[0].dark.styled.palette.company.primary,
				item.mobile[0].dark.styled.palette.company.secondary,
				item.mobile[0].dark.styled.palette.company.tertiary,
			],
			light: [
				item.mobile[0].light.styled.palette.company.primary,
				item.mobile[0].light.styled.palette.company.secondary,
				item.mobile[0].light.styled.palette.company.tertiary,
			],
		}
		const styled = {
			dark: [
				item.mobile[0].dark.styled.palette.primary.background.default,
				item.mobile[0].dark.styled.palette.secondary.background.default,
				item.mobile[0].dark.styled.palette.tertiary.background.default,
				item.mobile[0].dark.styled.palette.quaternary.background.default,
			],
			light: [
				item.mobile[0].light.styled.palette.primary.background.default,
				item.mobile[0].light.styled.palette.secondary.background.default,
				item.mobile[0].light.styled.palette.tertiary.background.default,
				item.mobile[0].light.styled.palette.quaternary.background.default,
			],
		}
		const bfs = {
			dark: [
				item.mobile[0].dark.styled.palette.bfscompany.primary,
				item.mobile[0].dark.styled.palette.bfscompany.secondary,
				item.mobile[0].dark.styled.palette.bfscompany.tertiary,
			],
			light: [
				item.mobile[0].light.styled.palette.bfscompany.primary,
				item.mobile[0].light.styled.palette.bfscompany.secondary,
				item.mobile[0].light.styled.palette.bfscompany.tertiary,
			],
		}

		return (
			<Box
				key={item.id}
				m={3}
				bg={colorScheme === 'light' ? 'light.50' :'gray.800'}
				shadow={5}
				style={{
					flex: 1,
				}}
				py={4}
				px={1}
				borderRadius={'lg'}
				borderWidth={2}
				borderColor={
					AuthorizationReactiveVar().DeviceProfile.Profile.ThemeManager.ProfileTheme.Theme.id === item.id
						? 'primary.400'
						: 'transparent'
				}
			>
				<Pressable
					onPress={async () => {
						bottomSheetModalRef.current.close()
						navigation.navigate('HomeTabNavigator', {
							screen: 'DevelopmentStack',
							params: {
								screen: 'ThemeViewer',
								params: {
									theme: item,
								},
							},
						})
					}}
				>
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{bfs.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{bfs.dark.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Divider />
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{styled.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{styled.dark.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Divider />
					<Stack flexDir={'row'} flexWrap={'wrap'} space={2}>
						{rThemeVar.colorScheme === 'light' ? (
							<>
								{company.light.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						) : (
							<>
								{company.dark.map((item, index) => {
									return (
										<Box
											key={index}
											alignSelf={'center'}
											style={{
												backgroundColor: item,
												width: 30,
												height: 30,
											}}
											m={2}
										/>
									)
								})}
							</>
						)}
					</Stack>
					<Text fontWeight={'medium'} textTransform={'capitalize'} textAlign={'center'} fontSize={'xl'}>
						{item.name}
					</Text>
				</Pressable>
			</Box>
		)
	}, [])

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

	if (GATLoading) return null

	const settingsOptions = [
		{
			title: 'Refresh',
			icon: 'refresh',
			onPress: onReloadPress,
		},
		{
			title: 'Device settings',
			icon: 'settings',
			onPress: handleOpenPhoneSettings,
		},
		{
			title: 'Change theme',
			icon: 'color-palette-sharp',
			onPress: () => handleSnapPress(1),
		},
	]

	return (
		<Box flex={1} mx={3}>
			<Box mt={100} my={5}>
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
				{settingsOptions.map((item, index) => {
					return (
						<Pressable key={index} onPress={item.onPress}>
							<Box height={ITEM_HEIGHT} justifyContent={'space-between'}>
								<Divider />
								<HStack space={4} alignItems={'center'}>
									<Icon size={'lg'} as={Ionicons} name={item.icon} />
									<Heading variant={'solid'} colorScheme={'tertiary'}>
										{item.title}
									</Heading>
								</HStack>
								<Divider />
							</Box>
						</Pressable>
					)
				})}
				<BottomSheetModal
					ref={bottomSheetModalRef}
					snapPoints={snapPoints}
					backgroundStyle={{
						backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
					}}
				>
					<BottomSheetFlatList
						data={GATData.getAllThemes}
						keyExtractor={i => i}
						numColumns={3}
						renderItem={renderItem}
						ListHeaderComponent={() => {
							return (
								<HStack px={2} py={4} w={'full'} space={21} justifyContent={'space-around'}>
									<Button
										onPress={async () => {
											await toggleThemes({ colorScheme: 'light' })
										}}
										bg={'light.200'}
										flex={1}
										borderColor={colorScheme === 'light' && 'primary.300'}
										borderWidth={2}
									>
										<Text color={'black'}>Light</Text>
									</Button>
									<Button
										onPress={async () => {
											await toggleThemes({ colorScheme: 'dark' })
										}}
										bg={'dark.100'}
										flex={1}
										borderColor={colorScheme === 'dark' && 'primary.300'}
										borderWidth={2}
									>
										<Text color={'white'}>Dark</Text>
									</Button>
									<Button
										onPress={async () => {
											await toggleThemes({ colorScheme: 'system' })
										}}
										bg={colorScheme === 'light' ? 'light.200' : 'dark.100'}
										flex={1}
										borderColor={rThemeVar.colorScheme === 'system' && 'primary.300'}
										borderWidth={2}
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
