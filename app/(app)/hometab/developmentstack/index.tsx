// TODO: FN(Change theme functionality with database and local storage save)
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthorizationReactiveVar, searchAreaInitialState, SearchAreaReactiveVar } from '@reactive'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import * as Application from 'expo-application'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Clipboard from 'expo-clipboard'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'
import { useRouter } from 'expo-router'
import * as TaskManager from 'expo-task-manager'
import * as Updates from 'expo-updates'
import {
	Box,
	Heading,
	HStack,
	Icon,
	Button,
	Text,
	Divider,
	VStack,
	Pressable,
	Tooltip,
	useDisclose,
	SectionList,
	Spinner,
} from 'native-base'
import { useEffect, useRef, useState } from 'react'
import { Platform, Linking, AppState } from 'react-native'

let foregroundSubscription = null

const BACKGROUND_FETCH_TASK = 'background-fetch'

let l1
let l2

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(DEVELOPMENT_BACKGROUND_LOCATION_TASK_NAME, async ({ data, error }: any) => {
// 	if (error) {
// 		return
// 	}
// 	if (data) {
// 		const { locations } = data
// 		let lat = locations[0].coords.latitude
// 		let long = locations[0].coords.longitude

// 		l1 = lat
// 		l2 = long
// 	}
// })
// TaskManager.defineTask(DEVELOPMENT_FOREGROUND_LOCATION_TASK_NAME, async ({ data }: any) => {
// 	const now = Date.now()
// 	if (data) {
// 		if (data.locations) {
// 		}
// 	}

// 	// Be sure to return the successful result type!
// 	return BackgroundFetch.BackgroundFetchResult.NewData
// })

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

export default () => {
	const ITEM_HEIGHT = 50
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [token, setToken] = useState('')
	const [pushNotificationToken, setPushNotificationToken] = useState('')
	const [appState, setAppState] = useState(AppState.currentState)
	const [searchAreaDeleteLoading, setSearchAreaDeleteLoading] = useState(false)
	const [authorizationDeleteLoading, setAuthorizationDeleteLoading] = useState(false)

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
				await registerBackgroundFetchAsync()
			}
			if (appState !== nextAppState) {
				if (appState.match(/inactive|background/) && nextAppState === 'active') {
					await unregisterBackgroundFetchAsync()
				}
			}
		}

		if (!isBackgroundLocationOn && hasStarted) {
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

	// useEffect(() => {
	// 	registerForPushNotificationsAsync().then(token => setPushNotificationToken(token))

	// 	notificationListener?.current = Notifications.addNotificationReceivedListener(notification => {
	// 		console.log('object :>> ', object);
	// 		setNotification(notification)
	// 	})

	// 	responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
	// 		console.log(response)
	// 	})

	// 	return () => {
	// 		Notifications.removeNotificationSubscription(notificationListener.current)
	// 		Notifications.removeNotificationSubscription(responseListener.current)
	// 	}
	// }, [])

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
			await Updates.reloadAsync()
		}
	}

	const settingsOptions = [
		{
			type: 'setting',
			title: 'Preference modals',
			icon: 'albums',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/preferences',
				}),
		},
		{
			type: 'setting',
			title: 'Permission modals',
			icon: 'bookmarks',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/permissionmodals',
				}),
		},
		{
			type: 'setting',
			title: 'Change theme',
			icon: 'color-palette-sharp',
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/theme',
				}),
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
			onPress: () =>
				router.push({
					pathname: '(app)/hometab/developmentstack/theme',
				}),
		},
		{
			type: 'token',
			title: 'Authorization',
			icon: 'finger-print',
			loading: authorizationDeleteLoading,
			onPress: async () => {
				setAuthorizationDeleteLoading(true)
				await secureStorageItemDelete({
					key: AUTHORIZATION,
				}),
					setTimeout(() => {
						setAuthorizationDeleteLoading(false)
					}, 1500)
			},
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
						{({ isHovered, isFocused, isPressed }) => {
							return (
								<Box
									_light={{
										bg: isPressed ? 'light.100' : 'transparent',
									}}
									_dark={{
										bg: isPressed ? 'dark.100' : 'transparent',
									}}
									height={ITEM_HEIGHT}
									justifyContent={'space-between'}
								>
									<Divider />
									<HStack px={2} space={4} alignItems={'center'}>
										<Icon size={'lg'} as={Ionicons} name={item.icon} />
										<Heading fontSize={'lg'} colorScheme={'tertiary'}>
											{item.title}
										</Heading>
									</HStack>
									<Divider />
								</Box>
							)
						}}
					</Pressable>
				)
			case 'token':
				return (
					<Pressable key={index} onPress={item.onPress}>
						{({ isHovered, isFocused, isPressed }) => {
							return (
								<Box
									_light={{
										bg: isPressed ? 'light.300' : 'transparent',
									}}
									_dark={{
										bg: isPressed ? 'dark.300' : 'transparent',
									}}
									height={ITEM_HEIGHT}
									justifyContent={'space-between'}
								>
									<Divider />
									<HStack px={2} space={4} alignItems={'center'} justifyContent={'space-between'}>
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
							)
						}}
					</Pressable>
				)
		}
	}

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail! 📬",
				body: 'Here is the notification body',
				data: { data: 'goes here for link', link: 'What is this link' },
			},
			trigger: { seconds: 5 },
		})
	}

	async function registerForPushNotificationsAsync() {
		let token

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
		} else {
			alert('Must use physical device for Push Notifications')
		}

		return token
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

			<SectionList
				showsVerticalScrollIndicator={false}
				contentInset={{
					bottom: 100,
				}}
				ListHeaderComponent={() => {
					return (
						<VStack>
							<Box my={5}>
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
												bg: 'light.100',
											}}
											_dark={{
												bg: 'dark.100',
											}}
											borderRadius={'md'}
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
												bg: 'light.100',
											}}
											_dark={{
												bg: 'dark.100',
											}}
											borderRadius={'md'}
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
												bg: 'light.100',
											}}
											_dark={{
												bg: 'dark.100',
											}}
											borderRadius={'md'}
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
								<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={2}>
									Notification
								</Heading>
								<Button
									onPress={async () => {
										await schedulePushNotification()
									}}
								>
									send notification
								</Button>
								<Divider />
							</VStack>
							<VStack space={2} w={'full'} px={10} my={3}>
								<Heading textAlign={'center'} textTransform={'capitalize'} numberOfLines={1} my={2}>
									Location tracking
								</Heading>
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
		</Box>
	)
}
