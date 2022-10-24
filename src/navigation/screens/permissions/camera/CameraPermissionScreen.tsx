import PermissionDetailItem from '../PermissionDetailItem'
import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicMedia from '@assets/images/media/IllustrationDynamicMedia'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { PermissionCameraReactiveVar, PermissionMediaReactiveVar } from '@reactive'
import { Button, Divider } from '@rneui/themed'
import { Text } from '@rneui/themed'
import { Camera, CameraType } from 'expo-camera'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as MediaLibrary from 'expo-media-library'
import { Box } from 'native-base'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppState, Platform, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import styled from 'styled-components/native'
import { ThemeContext } from 'styled-components/native'

// TODO: FN(Open camera app)

const details = [
	{
		title: 'How you’ll use this',
		detail: 'To take photos, record videos from your device.',
		iconName: 'camera',
		iconType: 'ant-design',
	},
	{
		title: 'How we’ll use this',
		detail: 'To show you captured content of visual and audio effects.',
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

const CameraPermissionScreen = () => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const appStateRef = useRef(AppState.currentState)
	const isFocused = useIsFocused()
	const rPermissionCamera = useReactiveVar(PermissionCameraReactiveVar)

	const handleAppStateChange = (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
		}
		appStateRef.current = nextAppState
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			try {
				const status = await Camera.getCameraPermissionsAsync()
				PermissionCameraReactiveVar(status)
			} catch (e) {
				console.warn(e)
			}
		}
		loadPermissionsAsync()
	}, [isFocused])

	const openCameraApp = async () => {
		console.log('opencamera')
	}
	const openPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	const DetailView = () => {
		return (
			<Box safeAreaBottom style={{ flex: 1 }}>
				<Box alignItems={'center'} justifyContent={'flex-start'} marginY={5}>
					<IllustrationDynamicMedia width={60} height={60} />
					<Divider width={2} style={{ width: 50, marginVertical: 10 }} />
					<Text
						h3
						h3Style={{ fontWeight: '900' }}
						style={{
							width: wp(95),
							maxWidth: 300,
							textAlign: 'center',
						}}
						allowFontScaling
						adjustsFontSizeToFit
						numberOfLines={3}
					>
						Allow Barfriends to access your camera and microphone
					</Text>
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
		)
	}

	return (
		<Box safeAreaBottom style={{ flex: 1 }}>
			<DetailView />
			<View>
				<Divider width={0.5} />
				{rPermissionCamera.granted && (
					<Button
						type='clear'
						title={'Open camera'}
						onPress={() => openCameraApp()}
						titleStyle={{
							color: themeContext.palette.primary.color.primary,
							fontWeight: 'bold',
						}}
						containerStyle={{
							marginTop: 10,
						}}
					/>
				)}
				<Button
					title={
						rPermissionCamera.canAskAgain && !rPermissionCamera.granted
							? 'Continue'
							: 'Go to Phone Settings'
					}
					onPress={() =>
						rPermissionCamera.canAskAgain && !rPermissionCamera.granted
							? console.log('hi')
							: openPhoneSettings()
					}
					containerStyle={{
						width: '100%',
						marginVertical: 10,
						paddingHorizontal: 20,
					}}
					buttonStyle={{
						justifyContent: 'center',
						backgroundColor: themeContext.palette.bfscompany.tertiary,
					}}
					titleStyle={{
						fontWeight: 'bold',
					}}
				/>
			</View>
		</Box>
	)
}

export default CameraPermissionScreen
