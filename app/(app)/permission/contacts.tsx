// TODO: UX(handleAppStateChange) check if location permission is enabled and go somewhere with it
import { useReactiveVar } from '@apollo/client'
import { Heading } from '@components/core'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import {
	AntDesign,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { ContactsReactiveVar, PermissionContactsReactiveVar } from '@reactive'
import { capitalizeFirstLetter } from '@util/@fn/capitalizeFirstLetter'
import useTimer2 from '@util/hooks/useTimer2'
import * as Contacts from 'expo-contacts'
import * as Device from 'expo-device'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { Box, VStack, Button, Divider, Icon, Text, ScrollView } from 'native-base'
import { useEffect, useRef } from 'react'
import { Alert, AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To share, friend and invite to events and venues.',
		iconName: 'contact-page',
		iconType: MaterialIcons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To show you your contacts.',
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

export default () => {
	const appStateRef = useRef(AppState.currentState)
	const router = useRouter()
	const isFocused = useIsFocused()
	const rContactPermission = useReactiveVar(PermissionContactsReactiveVar)

	const { finished, start, seconds, started } = useTimer2('0:2')

	const createTwoButtonAlert = () =>
		Alert.alert(
			'Barfriends Contacts Permission',
			`Contacts are currently ${capitalizeFirstLetter(
				capitalizeFirstLetter(rContactPermission?.status),
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

	const handleOpenPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			Linking.openURL('app-settings://')
		}
	}

	const handleRequestPermission = async () => {
		const status = await Contacts.requestPermissionsAsync()
		if (Device.isDevice) {
			PermissionContactsReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					ContactsReactiveVar(data)
				}
				start()
			}
		} else {
			createTwoButtonAlert()
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Contacts.getPermissionsAsync()
			try {
				PermissionContactsReactiveVar(status)

				if (status.granted && status.status === 'granted') {
					const { data } = await Contacts.getContactsAsync()
					if (data.length) {
						ContactsReactiveVar(data)
					}
				}
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
			const status = await Contacts.getPermissionsAsync()
			PermissionContactsReactiveVar(status)
			if (status.granted && status.status === 'granted') {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					ContactsReactiveVar(data)
				}
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	finished(() => {
		router.back()
	})

	return (
		<Box style={{ flex: 1 }}>
			<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
				<Box
					borderRadius={'md'}
					h={65}
					w={65}
					alignItems={'center'}
					justifyContent={'center'}
					bg={'#ff7000'}
				>
					<Icon as={FontAwesome} color={'secondary.800'} name={'user'} size={9} />
				</Box>
				<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
				<Heading
					fontWeight={'$black'}
					fontSize={'$3xl'}
					style={{
						width: wp(95),
						maxWidth: 300,
						textAlign: 'center',
					}}
					allowFontScaling
					adjustsFontSizeToFit
					numberOfLines={3}
				>
					Allow Barfriends access to your contacts
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
						!rContactPermission?.granted
							? rContactPermission?.canAskAgain && !rContactPermission.granted
								? handleRequestPermission()
								: handleOpenPhoneSettings()
							: createTwoButtonAlert()
					}
				>
					{!rContactPermission?.granted
						? rContactPermission?.canAskAgain && !rContactPermission.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started && (
					<Button size={'lg'} width={'95%'} onPress={() => router.back()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				)}
				{started && <Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>}
			</VStack>
		</Box>
	)
}
