import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicNetwork from '@assets/images/network/IllustrationDynamicNetwork'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { DeviceNetworkInfoReactiveVar, PermissionForegroundLocationReactiveVar } from '@reactive'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import { Button, Divider } from 'native-base'
import { Box, Heading, Text } from 'native-base'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppState, Platform, View, ScrollView } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const NetworkPermissionScreen = () => {
	const appStateRef = useRef(AppState.currentState)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const themeContext = useContext(ThemeContext)
	const rDeviceNetworkVar = useReactiveVar(DeviceNetworkInfoReactiveVar)
	const [appStateVisible, setAppStateVisible] = useState(appStateRef.current)

	const handleAppStateChange = async (nextAppState: any) => {
		if (/inactive|background/.exec(appStateRef.current) && nextAppState === 'active') {
			const locationpermission = await Location.getForegroundPermissionsAsync()
			PermissionForegroundLocationReactiveVar(locationpermission)
			if (locationpermission.granted && locationpermission.status === 'granted') {
				setTimeout(() => {
					navigation.goBack()
				}, 2500)
				// TODO: FN() check if location permission is enabled and go somewhere with it
			}
		}
		appStateRef.current = nextAppState
		setAppStateVisible(appStateRef.current)
	}

	const openPhoneSettings = async () => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings://')
		} else {
			IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS)
		}
	}

	useEffect(() => {
		async function loadPermissionsAsync() {
			const status = await Location.getForegroundPermissionsAsync()
			try {
				PermissionForegroundLocationReactiveVar(status)
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
	}, [appStateVisible])

	return (
		<Box flex={1} flexDir={'column'} w={'95%'} justifyContent={'space-around'} alignSelf={'center'}>
			<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
				<View style={{ alignItems: 'center', marginVertical: 40 }}>
					<IllustrationDynamicNetwork width={200} />
					<Heading my={4} textTransform={'uppercase'} textAlign={'center'}>
						Network Connection
					</Heading>
					{rDeviceNetworkVar.isConnected ? (
						<Text textAlign={'center'}>
							Your mobile device is connected to our service using {rDeviceNetworkVar.type}.
						</Text>
					) : (
						<Text textAlign={'center'}>To update content check your device network connection.</Text>
					)}
				</View>
				<View style={{ paddingVertical: 20, width: '90%', alignItems: 'center' }}>
					{!rDeviceNetworkVar.isConnected && (
						<Button
							variant={'solid'}
							onPress={() => openPhoneSettings()}
							borderRadius={'lg'}
							px={'20px'}
							_text={{
								color: 'primary.500',
								fontSize: 20,
							}}
							width={'90%'}
						>
							Phone settings
						</Button>
					)}
					<Divider />
					<Button
						variant={'ghost'}
						onPress={() => navigation.goBack()}
						borderRadius={'lg'}
						px={20}
						justifyContent={'center'}
						_text={{
							color: themeContext.palette.secondary.color.default,
							fontWeight: '600',
							fontSize: 20,
						}}
						margin={'15px'}
						width={'175px'}
					>
						Dismiss
					</Button>
				</View>
			</ScrollView>
		</Box>
	)
}

export default NetworkPermissionScreen