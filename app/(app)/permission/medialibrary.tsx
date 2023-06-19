import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicMedia from '@assets/images/media/IllustrationDynamicMedia'
import { Heading } from '@components/core'
import PermissionDetailItem from '@components/screens/permissions/PermissionDetailItem'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { PermissionMediaReactiveVar } from '@reactive'
import useTimer2 from '@util/hooks/useTimer2'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as MediaLibrary from 'expo-media-library'
import { Button, Divider, ScrollView } from 'native-base'
import { Box, VStack, Text } from 'native-base'
import { useEffect, useRef } from 'react'
import { AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To access photos, record videos from your device.',
		iconName: 'photo-size-select-actual',
		iconType: MaterialIcons,
	},
	{
		title: 'How we’ll use this',
		detail: 'To create your content and share.',
		iconName: 'android-messages',
		iconType: MaterialCommunityIcons,
	},
	{
		title: 'How theses settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: Ionicons,
	},
]

export default () => {
	const appStateRef = useRef(AppState.currentState)
	const [status, requestPermission] = MediaLibrary.usePermissions()
	const navigation = useNavigation()
	const rPermissionMedia = useReactiveVar(PermissionMediaReactiveVar)
	const { finished, start, seconds, started } = useTimer2('0:2')

	useEffect(() => {
		if (status) {
			PermissionMediaReactiveVar(status)
		}
	}, [status])

	const askMediaLibraryPermissionAsync = async () => {
		const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
		PermissionMediaReactiveVar(mediaLibraryPermission)
		if (mediaLibraryPermission.granted && mediaLibraryPermission.status === 'granted') {
			start()
		}
	}

	const openPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
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
			const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
			PermissionMediaReactiveVar(mediaLibraryPermission)
			if (mediaLibraryPermission.granted && mediaLibraryPermission.status === 'granted') {
				start()
			}
		}
		appStateRef.current = nextAppState
	}

	finished(() => {
		navigation.goBack()
	})

	return (
		<Box style={{ flex: 1 }}>
			<Box style={{ flex: 1 }}>
				<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
					<IllustrationDynamicMedia width={60} height={60} />
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
						Allow Barfriends to access your photos and videos
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
			</Box>
			<VStack safeAreaBottom space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						rPermissionMedia?.canAskAgain ? askMediaLibraryPermissionAsync() : openPhoneSettings()
					}
				>
					{!rPermissionMedia?.granted
						? rPermissionMedia?.canAskAgain && !rPermissionMedia.granted
							? 'Continue'
							: 'Go to Phone Settings'
						: 'Granted'}
				</Button>
				{!started ? (
					<Button size={'lg'} width={'95%'} onPress={() => navigation.goBack()} variant={'ghost'}>
						<Text fontWeight={'medium'}>Close</Text>
					</Button>
				) : (
					<Button size={'lg'} width={'95%'} onPress={() => navigation.goBack()} variant={'ghost'}>
						{started && (
							<Box h={'20px'}>{<Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>
						)}
					</Button>
				)}
			</VStack>
		</Box>
	)
}
