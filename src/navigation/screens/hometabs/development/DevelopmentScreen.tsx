import { useReactiveVar } from '@apollo/client'
import {
	AUTHORIZATION,
	LOCAL_STORAGE_SEARCH_AREA,
	LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
} from '@constants/StorageConstants'
import {
	DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
	DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
} from '@constants/TaskManagerConstants'
import { ENVIRONMENT } from '@env'
import { Feather, Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useGetAllThemesQuery } from '@graphql/generated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	searchAreaInitialState,
	SearchAreaReactiveVar,
	ThemeReactiveVar,
} from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import * as Application from 'expo-application'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Clipboard from 'expo-clipboard'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import * as Notifications from 'expo-notifications'
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
	Tooltip,
	useDisclose,
	SectionList,
	Spinner,
} from 'native-base'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform, Linking, useColorScheme, ColorSchemeName, AppState } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AuthorizationDecoded } from 'src/types/app'

// TODO: FN(Change theme functionality with database and local storage save)

let foregroundSubscription = null

const BACKGROUND_FETCH_TASK = 'background-fetch'

let l1
let l2

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME, async ({ data, error }: any) => {
	if (error) {
		console.log('LOCATION_TRACKING task ERROR:', error)
		return
	}
	if (data) {
		const { locations } = data
		let lat = locations[0].coords.latitude
		let long = locations[0].coords.longitude

		l1 = lat
		l2 = long

		console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`)
	}
})
TaskManager.defineTask(DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME, async ({ data }: any) => {
	const now = Date.now()

	// console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`)
	console.log('data DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME :>> ', data)
	if (data) {
		if (data.locations) {
			// console.log('data.locations :>> ', JSON.stringify(data.locations, null, 4))
		}
	}

	// Be sure to return the successful result type!
	return BackgroundFetch.BackgroundFetchResult.NewData
})

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
	await Location.startLocationUpdatesAsync(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Balanced,
		deferredUpdatesDistance: 15,
		timeInterval: 5000,
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

async function registerForegroundFetchAsync() {
	await Location.startLocationUpdatesAsync(DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME, {
		accuracy: Location.Accuracy.Balanced,
		deferredUpdatesDistance: 25,
		timeInterval: 5000,
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

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
	return Location.stopLocationUpdatesAsync(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME)
}

const DevelopmentScreen = () => {
	const ITEM_HEIGHT = 50
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const bottomSheetThemeModalRef = useRef<BottomSheetModal>(null)
	const bottomSheetThemePermissionRef = useRef<BottomSheetModal>(null)
	const colorScheme = useThemeColorScheme()
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const snapPoints = useMemo(() => ['45%', '95%'], [])
	const [token, setToken] = useState('')
	const [pushNotificationToken, setPushNotificationToken] = useState('')
	const [appState, setAppState] = useState(AppState.currentState)
	const [searchAreaDeleteLoading, setSearchAreaDeleteLoading] = useState(false)

	const {
		isOpen: isForegroundLocationOn,
		onOpen: onOpenForegroundLocationOn,
		onClose: onCloseForegroundLocationOn,
		onToggle: onToggleForegroundLocationOn,
	} = useDisclose()

	const {
		isOpen: isBackgroundLocationOn,
		onOpen: onOpenBackgroundLocationOn,
		onClose: onCloseBackgroundLocationOn,
		onToggle: onToggleBackgroundLocationOn,
	} = useDisclose()

	const {
		isOpen: isOpenToken,
		onOpen: onOpenToken,
		onClose: onCloseToken,
		onToggle: onToggleToken,
	} = useDisclose()

	const {
		isOpen: isOpenProfileId,
		onOpen: onOpenProfileId,
		onClose: onCloseProfileId,
		onToggle: onToggleProfileId,
	} = useDisclose()

	const {
		isOpen: isOpenPushNotif,
		onOpen: onOpenPushNotif,
		onClose: onClosePushNotif,
		onToggle: onTogglePushNotif,
	} = useDisclose()

	const appStateHandleBackgroundLocation = async nextAppState => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME,
		)

		if (isBackgroundLocationOn) {
			if (!hasStarted && nextAppState === 'inactive') {
				console.log('Background location started ...')
				await registerBackgroundFetchAsync()
			}
			if (appState !== nextAppState) {
				if (appState.match(/inactive|background/) && nextAppState === 'active') {
					console.log('Background Location Stopped in foreground ...')
					await unregisterBackgroundFetchAsync()
				}
			}
		}

		if (!isBackgroundLocationOn && hasStarted) {
			console.log('Background Location stopped...')
			await unregisterBackgroundFetchAsync()
		}

		AppState.currentState = nextAppState
		setAppState(AppState.currentState)
	}

	async function getApplicationAuthorization() {
		const getAuthorization = await secureStorageItemRead({
			key: AUTHORIZATION,
		})
		setToken(String(getAuthorization))
	}

	async function getPushNotificationToken() {
		const IOSenv = await Application.getIosPushNotificationServiceEnvironmentAsync()

		const expoToken = await Notifications.getExpoPushTokenAsync({
			experienceId: '@barfriends/barfriends',
			applicationId: String(Application.applicationId),
			development: IOSenv === 'development' ? true : false,
		})

		setPushNotificationToken(String(expoToken.data))
	}

	useEffect(() => {
		getApplicationAuthorization()
		getPushNotificationToken()
	}, [])

	useEffect(() => {
		const appStateListen = AppState.addEventListener('change', appStateHandleBackgroundLocation)
		return () => {
			appStateListen.remove()
		}
	}, [isBackgroundLocationOn])

	const { data: GATData, loading: GATLoading, error } = useGetAllThemesQuery()

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleThemes({ colorScheme })
	}

	// render
	const renderItem = useCallback(
		({ item }) => {
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
					bg={colorScheme === 'light' ? 'light.50' : 'gray.800'}
					shadow={5}
					style={{
						flex: 1,
					}}
					py={4}
					px={1}
					borderRadius={'lg'}
					borderWidth={2}
					borderColor={
						AuthorizationReactiveVar()?.DeviceProfile?.Profile?.ThemeManager?.ProfileTheme[0]?.Theme
							.id === item.id
							? 'primary.400'
							: 'transparent'
					}
				>
					<Pressable
						onPress={async () => {
							bottomSheetThemeModalRef.current?.close()
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
		},
		[rThemeVar.colorScheme],
	)

	const handleBottomSheetPermissionSnapPress = useCallback(index => {
		bottomSheetThemePermissionRef.current?.present()
		bottomSheetThemePermissionRef.current?.snapToIndex(index)
	}, [])

	const handleBottomSheetThemeSnapPress = useCallback(index => {
		bottomSheetThemeModalRef.current?.present()
		bottomSheetThemeModalRef.current?.snapToIndex(index)
	}, [])

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APP_OPS_SETTINGS)
		}
	}

	const toggleForegroundLocationTask = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME,
		)
		if (hasStarted) {
			await unregisterBackgroundFetchAsync()
		} else {
			await registerBackgroundFetchAsync()
		}
	}

	// const onReloadPress = useCallback(() => {
	// 	if (Platform.OS === 'web') {
	// 		location.reload()
	// 	} else {
	// 		Updates.reloadAsync()
	// 	}
	// }, [])
	const onReloadPress = async () => {
		if (Platform.OS === 'web') {
			location.reload()
		} else {
			console.log('here')
			await Updates.reloadAsync()
		}
	}

	if (GATLoading) return null

	const settingsOptions = [
		{
			type: 'setting',
			title: 'Permission modals',
			icon: 'bookmarks',
			onPress: () => handleBottomSheetPermissionSnapPress(1),
		},
		{
			type: 'setting',
			title: 'Change theme',
			icon: 'color-palette-sharp',
			onPress: () => handleBottomSheetThemeSnapPress(1),
		},
		{
			type: 'setting',
			title: 'Device settings',
			icon: 'settings',
			onPress: handleOpenPhoneSettings,
		},
		{
			type: 'setting',
			title: 'Refresh',
			icon: 'refresh',
			onPress: onReloadPress,
		},
	]

	const tokenOptions = [
		{
			type: 'token',
			title: 'Theme scheme',
			icon: 'color-palette-sharp',
			onPress: () => handleBottomSheetPermissionSnapPress(1),
		},
		{
			type: 'token',
			title: 'Authorization',
			icon: 'finger-print',
			onPress: async () =>
				await secureStorageItemDelete({
					key: AUTHORIZATION,
				}),
		},
		{
			type: 'token',
			title: 'Search area',
			icon: 'map',
			loading: searchAreaDeleteLoading,
			onPress: async () => {
				setSearchAreaDeleteLoading(true)
				await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
				SearchAreaReactiveVar(searchAreaInitialState)
				setTimeout(() => {
					setSearchAreaDeleteLoading(false)
				}, 1500)
			},
		},
		{
			type: 'token',
			title: 'Reset theme',
			icon: 'color-palette-sharp',
			onPress: async () => {
				await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME)
				const initialThemeColorSchemeState = JSON.stringify({
					colorScheme: 'system',
				})
				await AsyncStorage.setItem(
					LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
					initialThemeColorSchemeState,
				)
			},
		},
	]

	const Item = ({ item, index, loading }) => {
		switch (item.type) {
			case 'setting':
				return (
					<Pressable key={index} onPress={item.onPress}>
						<Box height={ITEM_HEIGHT} justifyContent={'space-between'}>
							<Divider />
							<HStack space={4} alignItems={'center'}>
								<Icon size={'lg'} as={Ionicons} name={item.icon} />
								<Heading fontSize={'lg'} colorScheme={'tertiary'}>
									{item.title}
								</Heading>
							</HStack>
							<Divider />
						</Box>
					</Pressable>
				)
			case 'token':
				return (
					<Pressable key={index} onPress={item.onPress}>
						<Box height={ITEM_HEIGHT} justifyContent={'space-between'}>
							<Divider />
							<HStack space={4} alignItems={'center'} justifyContent={'space-between'}>
								<HStack space={2} alignItems={'center'}>
									<Icon size={'lg'} as={Ionicons} name={item.icon} />
									<Heading fontSize={'lg'} colorScheme={'tertiary'}>
										{item.title}
									</Heading>
								</HStack>
								{loading ? <Spinner /> : <Icon mr={3} color={'danger.500'} name={'trash'} as={Feather} />}
							</HStack>
							<Divider />
						</Box>
					</Pressable>
				)
		}
	}

	return (
		<Box flex={1} mx={3}>
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

			<SectionList
				showsVerticalScrollIndicator={false}
				contentInset={{
					bottom: 100,
				}}
				ListHeaderComponent={() => {
					return (
						<VStack>
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
								<Pressable
									onPress={async () => {
										onToggleToken()
										await Clipboard.setStringAsync(token)
										setTimeout(() => onCloseToken(), 500)
									}}
								>
									<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={2}>
										Token
									</Heading>
									<Tooltip placement='top' isOpen={isOpenToken} label='Copied Authorization' openDelay={500}>
										<HStack
											_light={{
												bg: 'light.50',
											}}
											_dark={{
												bg: 'dark.50',
											}}
											borderRadius={'lg'}
											alignItems={'center'}
											justifyContent={'space-around'}
											py={3}
										>
											<Text
												fontSize={'md'}
												textTransform={'capitalize'}
												fontWeight={'black'}
												ellipsizeMode={'tail'}
												flex={1}
												marginLeft={5}
												numberOfLines={1}
											>
												{token}
											</Text>
											<Icon mx={2} color={'primary.500'} size={'lg'} as={Feather} name='copy' />
										</HStack>
									</Tooltip>
								</Pressable>
								<Divider my={3} />
								<Pressable
									onPress={async () => {
										onToggleProfileId()
										await Clipboard.setStringAsync(String(rAuthorizationVar?.DeviceProfile?.Profile?.id))
										setTimeout(() => onCloseProfileId(), 500)
									}}
								>
									<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={2}>
										Profile ID
									</Heading>

									<Tooltip
										placement='top'
										isOpen={isOpenProfileId}
										label='Copied Profile Id'
										openDelay={500}
									>
										<HStack
											_light={{
												bg: 'light.50',
											}}
											_dark={{
												bg: 'dark.50',
											}}
											borderRadius={'lg'}
											alignItems={'center'}
											justifyContent={'space-around'}
											py={3}
										>
											<Text
												fontSize={'md'}
												textTransform={'capitalize'}
												fontWeight={'black'}
												ellipsizeMode={'tail'}
												flex={1}
												marginLeft={5}
												numberOfLines={1}
											>
												{rAuthorizationVar?.DeviceProfile?.Profile?.id}
											</Text>
											<Icon mx={2} color={'primary.500'} size={'lg'} as={Feather} name='copy' />
										</HStack>
									</Tooltip>
								</Pressable>
								<Divider my={3} />
								<Pressable
									onPress={async () => {
										onTogglePushNotif()
										await Clipboard.setStringAsync(String(pushNotificationToken))
										setTimeout(() => onClosePushNotif(), 500)
									}}
								>
									<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={2}>
										Expo Push Token
									</Heading>

									<Tooltip
										placement='top'
										isOpen={isOpenPushNotif}
										label='Copied Profile Id'
										openDelay={500}
									>
										<HStack
											_light={{
												bg: 'light.50',
											}}
											_dark={{
												bg: 'dark.50',
											}}
											borderRadius={'lg'}
											alignItems={'center'}
											justifyContent={'space-around'}
											py={3}
										>
											<Text
												fontSize={'md'}
												textTransform={'capitalize'}
												fontWeight={'black'}
												ellipsizeMode={'tail'}
												flex={1}
												marginLeft={5}
												numberOfLines={1}
											>
												{pushNotificationToken}
											</Text>
											<Icon mx={2} color={'primary.500'} size={'lg'} as={Feather} name='copy' />
										</HStack>
									</Tooltip>
								</Pressable>
								<Divider my={3} />
							</Box>
							<VStack space={2} w={'full'} px={10} my={3}>
								<Button
									onPress={toggleForegroundLocationTask}
									isDisabled={isForegroundLocationOn}
									colorScheme={'green'}
								>
									Start in foreground
								</Button>
								<Divider />
								<Button
									onPress={toggleForegroundLocationTask}
									isDisabled={!isForegroundLocationOn}
									colorScheme={'red'}
								>
									Stop in foreground
								</Button>
								<Divider />
								<Button
									onPress={onToggleBackgroundLocationOn}
									isDisabled={isBackgroundLocationOn}
									colorScheme={'green'}
									color='green'
								>
									Start in background
								</Button>
								<Divider />
								<Button
									onPress={onToggleBackgroundLocationOn}
									isDisabled={!isBackgroundLocationOn}
									colorScheme={'red'}
									color='red'
								>
									Stop in background
								</Button>
							</VStack>
						</VStack>
					)
				}}
				sections={[
					{
						title: 'Settings',
						data: settingsOptions,
					},
					{
						title: 'Tokens',
						data: tokenOptions,
					},
				]}
				// keyExtractor={(item, index) => index}
				renderItem={({ item, index }) => <Item index={index} item={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<Heading mt={4} size={'xl'}>
						{title}
					</Heading>
				)}
			/>
			{/* <Button onPress={getPosition} color='green.400'>
						Get current Position
					</Button>
					<Button onPress={startGeoFencingUpdate} color='green.400'>
						Start Geofencing
					</Button>
					<Button onPress={stopGeofencing} color='red.500'>
						Stop Geofencing
					</Button> */}

			<BottomSheetModal
				ref={bottomSheetThemePermissionRef}
				snapPoints={snapPoints}
				backgroundStyle={{
					backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
				}}
			>
				<BottomSheetFlatList
					data={[
						{
							name: 'Foreground Location',
							route: () =>
								navigation.navigate('PermissionNavigator', {
									screen: 'ForegroundLocationPermissionScreen',
								}),
						},
						{
							name: 'Foreground Search Area Location',
							route: () =>
								navigation.navigate('PermissionNavigator', {
									screen: 'ForegroundLocationPermissionSearchAreaScreen',
								}),
						},
						{
							name: 'Background Location',
							route: () =>
								navigation.navigate('PermissionNavigator', {
									screen: 'BackgroundLocationPermissionScreen',
								}),
						},
						{
							name: 'Notifications',
							route: () =>
								navigation.navigate('PermissionNavigator', {
									screen: 'NotificationsPermissionScreen',
								}),
						},
						{
							name: 'Media Library',
							route: () =>
								navigation.navigate('PermissionNavigator', {
									screen: 'MediaLibraryPermissionScreen',
								}),
						},
					]}
					keyExtractor={i => i.name}
					numColumns={1}
					style={{
						marginHorizontal: 5,
					}}
					contentInset={{ top: 10 }}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPressIn={item.route}
								onPressOut={() => bottomSheetThemePermissionRef.current?.dismiss()}
							>
								<Divider />
								<HStack h={'45px'} flex={1} alignItems={'center'}>
									<Heading fontSize={'md'}>{item.name}</Heading>
								</HStack>
								<Divider />
							</Pressable>
						)
					}}
				/>
			</BottomSheetModal>
			<BottomSheetModal
				ref={bottomSheetThemeModalRef}
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
										await setTheme({ colorScheme: 'light' })
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
										await setTheme({ colorScheme: 'dark' })
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
										await setTheme({ colorScheme: 'light' })
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
		</Box>
	)
}
export default DevelopmentScreen
