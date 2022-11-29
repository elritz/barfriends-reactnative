import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PermissionNotificationReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as Application from 'expo-application'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Notifications from 'expo-notifications'
import { Box, VStack, Button, Divider, Icon, Text, Heading } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To receive messages, venue and event deals around you.',
		iconName: 'ios-location-sharp',
		iconType: Ionicons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To create messages from you to others.',
		iconName: 'android-messages',
		iconType: MaterialCommunityIcons,
	},
	{
		title: 'How these settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: Ionicons,
	},
]

const NotificationsPermissionScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const rNotificationsPermission = useReactiveVar(PermissionNotificationReactiveVar)
	const { start, seconds, started } = useTimer2('0:3')

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Notification Permission',
			capitalizeFirstLetter(rNotificationsPermission?.status),
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
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.NOTIFICATION_SETTINGS)
		}
	}

	const handleRequestPermission = async () => {
		const status = await Notifications.getPermissionsAsync()
		if (status.granted) {
			PermissionNotificationReactiveVar(status)
			navigation.goBack()
		}
	}

	const handleRequestNotificationsPermission = async () => {
		const status = await Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
				allowAnnouncements: true,
				provideAppNotificationSettings: true,
				allowCriticalAlerts: true,
				allowDisplayInCarPlay: true,
			},
		})
		PermissionNotificationReactiveVar(status)
		if (status.granted) {
			const devicetoken = await Notifications.getDevicePushTokenAsync()
			console.log(
				'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 88 ~ handleRequestNotificationsPermission ~ devicetoken',
				devicetoken,
			)
			if (Platform.OS === 'ios') {
				const IOSenv = await Application.getIosPushNotificationServiceEnvironmentAsync()
				const expoToken = await Notifications.getExpoPushTokenAsync({
					experienceId: '@barfriends/barfriends',
					applicationId: String(Application.applicationId),
					// devicePushToken: devicetoken.data, // this defaults to this anyways as per the docs
					development: IOSenv === 'development' ? true : false,
				})
				PermissionNotificationReactiveVar(status)
				console.log(
					'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 103 ~ handleRequestNotificationsPermission ~ expoToken',
					expoToken.data,
				)
				console.log(
					'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 103 ~ handleRequestNotificationsPermission ~ expoToken',
					expoToken.type,
				)
			} else {
				const expoToken = await Notifications.getExpoPushTokenAsync({
					experienceId: '@barfriends/barfriends',
					applicationId: String(Application.applicationId),
					devicePushToken: devicetoken,
				})
				console.log(
					'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 103 ~ handleRequestNotificationsPermission ~ expoToken',
					expoToken.data,
				)
				console.log(
					'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 103 ~ handleRequestNotificationsPermission ~ expoToken',
					expoToken.type,
				)
			}
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Notifications.getPermissionsAsync()
			try {
				PermissionNotificationReactiveVar(status)
			} catch (e) {
				console.warn(e)
			}
		}
		loadPermissionsAsync()
	}, [isFocused])

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const status = await Notifications.getPermissionsAsync()
			PermissionNotificationReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				setTimeout(() => {
					navigation.goBack()
				}, 2000)
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	useEffect(() => {
		const getExpoToken = async () => {
			const IOSenv = await Application.getIosPushNotificationServiceEnvironmentAsync()
			const expoToken = await Notifications.getExpoPushTokenAsync({
				experienceId: '@barfriends/barfriends',
				applicationId: String(Application.applicationId),
				development: IOSenv === 'development' ? true : false,
			})
			console.log(
				'🚀 ~ file: NotificationsPermissionScreen.tsx ~ line 174 ~ getExpoToken ~ expoToken',
				expoToken,
			)
		}
		getExpoToken()
	}, [])

	return (
		<Box style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<Box
					borderRadius={'lg'}
					h={65}
					w={65}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<Icon as={Ionicons} color={'secondary.800'} name={'ios-notifications'} size={9} />
				</Box>
				<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={900}
					fontSize={'3xl'}
					style={{
						width: wp(95),
						maxWidth: 300,
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Barfriends to send notifications
				</Heading>
			</Box>
			<Box width={wp(95)} style={{ flex: 1, alignSelf: 'center' }}>
				{details.map((item, index) => {
					return (
						<View key={index}>
							<PermissionDetailItem {...item} />
						</View>
					)
				})}
			</Box>
			<VStack safeAreaBottom space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						!rNotificationsPermission?.granted
							? rNotificationsPermission?.canAskAgain && !rNotificationsPermission.granted
								? handleRequestNotificationsPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					{!rNotificationsPermission?.granted
						? rNotificationsPermission?.canAskAgain && !rNotificationsPermission.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started && (
					<Button size={'lg'} width={'95%'} onPress={() => navigation.goBack()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				)}
				{started && <Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>}
			</VStack>
		</Box>
	)
}

export default NotificationsPermissionScreen
