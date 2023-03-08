import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicLocation from '@assets/images/location/IllustrationDynamicLocation'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { PermissionBackgroundLocationReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import { Box, VStack, Button, Divider, Heading, Text, ScrollView } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To find venues and event deals around you.',
		iconName: 'ios-location-sharp',
		iconType: Ionicons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To create your own content and share. ',
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

const BackgroundLocationPermissionScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const router = useRouter()
	const isFocused = useIsFocused()
	const rBackgroundLocationPermissionVar = useReactiveVar(PermissionBackgroundLocationReactiveVar)
	const { start, seconds, started } = useTimer2('0:2')
	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Backgrounds Location Permission',
			`Location access is currently active ${capitalizeFirstLetter(
				rBackgroundLocationPermissionVar?.status,
			)}. If you wish to adjust go to your device settings.
			`,
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

	const handleRequestBackgroundLocationPermission = async () => {
		const status = await Location.requestBackgroundPermissionsAsync()
		if (status.granted) {
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Location.getBackgroundPermissionsAsync()
			try {
				PermissionBackgroundLocationReactiveVar(status)
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
			const backgroundlocationpermission = await Location.getBackgroundPermissionsAsync()
			PermissionBackgroundLocationReactiveVar(backgroundlocationpermission)
			if (backgroundlocationpermission.granted && backgroundlocationpermission.status === 'granted') {
				setTimeout(() => {
					router.back()
				}, 1500)
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	return (
		<Box style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<IllustrationDynamicLocation width={60} height={60} />
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
					Allow Barfriends to access Background location
				</Heading>
			</Box>
			<ScrollView>
				<Box width={wp(95)} style={{ flex: 1, alignSelf: 'center' }}>
					{details.map((item, index) => {
						return (
							<View key={index}>
								<PermissionDetailItem {...item} />
							</View>
						)
					})}
				</Box>
			</ScrollView>
			<VStack safeAreaBottom space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						!rBackgroundLocationPermissionVar?.granted
							? rBackgroundLocationPermissionVar?.canAskAgain && !rBackgroundLocationPermissionVar.granted
								? handleRequestBackgroundLocationPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					{!rBackgroundLocationPermissionVar?.granted
						? rBackgroundLocationPermissionVar?.canAskAgain && !rBackgroundLocationPermissionVar.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started ? (
					<Button size={'lg'} width={'95%'} onPress={() => router.back()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				) : (
					<Button size={'lg'} width={'95%'} onPress={() => router.back()} variant={'ghost'}>
						{started && (
							<Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>
						)}
					</Button>
				)}
			</VStack>
		</Box>
	)
}

export default BackgroundLocationPermissionScreen
