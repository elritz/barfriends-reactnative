import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicMedia from '@assets/images/media/IllustrationDynamicMedia'
import { useNavigation } from '@react-navigation/native'
import { PermissionMediaReactiveVar, PermissionMicrophoneReactiveVar } from '@reactive'
import useTimer2 from '@util/hooks/useTimer2'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as MediaLibrary from 'expo-media-library'
import { Button, Divider } from 'native-base'
import { Box, VStack, Text, Heading } from 'native-base'
import { useEffect, useRef, useState } from 'react'
import { Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To access photos, record videos from your device.',
		iconName: 'photo-size-select-actual',
		iconType: 'material',
	},
	{
		title: 'How we’ll use this',
		detail: 'To create your content and share.',
		iconName: 'android-messages',
		iconType: 'material-community',
	},
	{
		title: 'How theses settings work',
		detail:
			'You can change your choices at any time in your device settings. If you allow access now, you wont have to again.',
		iconName: 'ios-settings-sharp',
		iconType: 'ionicon',
	},
]

const MediaLibraryPermissionScreen = () => {
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

	return (
		<Box safeAreaBottom style={{ flex: 1 }}>
			<Box safeAreaBottom style={{ flex: 1 }}>
				<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
					<IllustrationDynamicMedia width={60} height={60} />
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
						Allow Barfriends to access your photos and videos
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
			</Box>
			<VStack space={2} w={'full'} alignItems={'center'}>
				<Divider w={'95%'} />
				<Button
					size={'lg'}
					width={'95%'}
					onPress={() =>
						rPermissionMedia.canAskAgain ? askMediaLibraryPermissionAsync() : openPhoneSettings()
					}
				>
					{rPermissionMedia.canAskAgain && !rPermissionMedia.granted
						? 'Continue'
						: 'Go to Phone Settings'}
				</Button>
				<Button variant={'ghost'} size={'lg'} width={'95%'} onPress={() => navigation.goBack()}>
					<Box h={'20px'}>{started && <Text fontWeight={'medium'}>Auto close in {seconds}</Text>}</Box>
				</Button>
			</VStack>
		</Box>
	)
}

export default MediaLibraryPermissionScreen
