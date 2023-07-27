// TODO: FN(Open camera app) ln:66
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Divider, Heading, Text, VStack } from '@components/core'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { PermissionMicrophoneReactiveVar, ThemeReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import { Camera, requestMicrophonePermissionsAsync } from 'expo-camera'
import * as Device from 'expo-device'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, ScrollView, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const appStateRef = useRef(AppState.currentState)
	const isFocused = useIsFocused()
	const rMicrophonePermission = useReactiveVar(PermissionMicrophoneReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const { finished, start, seconds, started } = useTimer2('0:2')

	const details = [
		{
			title: 'How you’ll use this',
			detail: 'To capture aduio with videos with your device.',
			icon: (
				<FontAwesome
					name={'microphone'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
		{
			title: 'How we’ll use this',
			detail: 'To show you captured content of visual and audio effects.',
			icon: (
				<MaterialCommunityIcons
					name={'android-messages'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
		{
			title: 'How theses settings work',
			detail:
				'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
			icon: (
				<Ionicons
					name={'ios-settings-sharp'}
					size={25}
					style={{
						marginHorizontal: 7,
					}}
					color={
						rTheme.colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
				/>
			),
		},
	]

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APPLICATION_SETTINGS)
		}
	}
	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Camera Permissions',
			`Camera permissions are currently ${capitalizeFirstLetter(
				capitalizeFirstLetter(rMicrophonePermission?.status),
			)}. If you wish to adjust go to your device settings.`,
			[
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'Settings', onPress: () => handleOpenPhoneSettings() },
			],
		)

	const handleRequestPermission = async () => {
		if (Device.isDevice) {
			const status = await requestMicrophonePermissionsAsync()

			PermissionMicrophoneReactiveVar(status)

			createTwoButtonAlert()
		}
	}
	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			subscription.remove()
		}
	}, [])

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const status = await Camera.getCameraPermissionsAsync()
			PermissionMicrophoneReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				setTimeout(() => {
					router.back()
				}, 2000)
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	finished(() => {
		router.back()
	})

	return (
		<Box bg={'$transparent'} style={{ flex: 1 }} mb={'$5'}>
			<Box bg={'$transparent'} alignItems={'center'} justifyContent={'flex-start'} my={'$5'}>
				<Box
					rounded={'$md'}
					sx={{
						h: 65,
						w: 65,
					}}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<Ionicons
						name='camera'
						size={30}
						color={rTheme.theme?.gluestack.tokens.colors.secondary900 || 'black'}
					/>
				</Box>
				<Divider style={{ width: 50, marginVertical: 10 }} />
				<Heading
					px={'$2'}
					fontWeight={'$black'}
					fontSize={'$3xl'}
					style={{
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Barfriends to access your microphone
				</Heading>
			</Box>
			<ScrollView>
				<Box bg={'$transparent'} sx={{ w: wp(95), flex: 1, alignSelf: 'center' }}>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			<VStack
				space={'md'}
				w={'$full'}
				alignItems={'center'}
				sx={{
					mb: insets.bottom,
				}}
			>
				<Divider w={'95%'} />
				<Button
					size={'md'}
					sx={{
						w: '95%',
					}}
					onPress={() =>
						!rMicrophonePermission?.granted
							? rMicrophonePermission?.canAskAgain && !rMicrophonePermission.granted
								? handleRequestPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					<Text>
						{!rMicrophonePermission?.granted
							? rMicrophonePermission?.canAskAgain && !rMicrophonePermission.granted
								? 'Continue'
								: 'Go to Phone Settings'
							: 'Granted'}
					</Text>
				</Button>
				{!started ? (
					<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
						<Text fontWeight={'$medium'}>Close</Text>
					</Button>
				) : (
					<Button size={'lg'} sx={{ width: '95%' }} onPress={() => router.back()} variant={'link'}>
						{started && (
							<Box
								bg={'$transparent'}
								sx={{
									h: 20,
								}}
							>
								{<Text fontWeight={'$medium'}>Auto close in {seconds}</Text>}
							</Box>
						)}
					</Button>
				)}
			</VStack>
		</Box>
	)
}
