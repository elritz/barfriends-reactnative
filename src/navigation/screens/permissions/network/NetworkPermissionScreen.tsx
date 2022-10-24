import { useReactiveVar } from '@apollo/client'
import IllustrationDynamicNetwork from '@assets/images/network/IllustrationDynamicNetwork'
import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import RNEText600 from '@components/atoms/typography/RNETypography/text/RNEText600'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { DeviceNetworkInfoReactiveVar, ForegroundLocationPermissionReactiveVar } from '@reactive'
import { Button, Divider } from '@rneui/base'
import * as IntentLauncher from 'expo-intent-launcher'
import * as Linking from 'expo-linking'
import * as Location from 'expo-location'
import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppState, Platform, View, ScrollView } from 'react-native'
import SimpleEmoji from 'simple-react-native-emoji'
import styled from 'styled-components/native'
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
			ForegroundLocationPermissionReactiveVar(locationpermission)
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
				ForegroundLocationPermissionReactiveVar(status)
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
		<OuterView>
			<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
				<View style={{ alignItems: 'center', marginVertical: 40 }}>
					<IllustrationDynamicNetwork width={200} />
					<RNEHeading1000
						style={{ marginVertical: 15, textTransform: 'uppercase', textAlign: 'center' }}
					>
						Network Connection
					</RNEHeading1000>
					{rDeviceNetworkVar.isConnected ? (
						<RNEText600 style={{ textAlign: 'center' }}>
							Your mobile device is connected to our service using {rDeviceNetworkVar.type}.
						</RNEText600>
					) : (
						<RNEText600 style={{ textAlign: 'center' }}>
							To update content check your device network connection.
						</RNEText600>
					)}
				</View>
				<View style={{ paddingVertical: 20, width: '90%', alignItems: 'center' }}>
					{!rDeviceNetworkVar.isConnected && (
						<Button
							type='solid'
							title={'Phone settings'}
							onPress={() => openPhoneSettings()}
							buttonStyle={{
								backgroundColor: themeContext.palette.highlight.background.secondary,
								borderRadius: 20,
								paddingHorizontal: 20,
							}}
							titleStyle={{
								color: themeContext.palette.highlight.color.secondary,
								fontSize: 20,
							}}
							containerStyle={{
								width: '90%',
							}}
						/>
					)}
					<Divider />
					<Button
						title={'Dismiss'}
						type='clear'
						onPress={() => navigation.goBack()}
						buttonStyle={{
							borderRadius: 50,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						titleStyle={{
							color: themeContext.palette.secondary.color.primary,
							fontWeight: '600',
							fontSize: 20,
						}}
						containerStyle={{
							margin: 15,
							width: 175,
						}}
					/>
				</View>
			</ScrollView>
		</OuterView>
	)
}

export default NetworkPermissionScreen

const OuterView = styled.SafeAreaView`
	flex: 1;
	flex-direction: column;
	width: 95%;
	justify-content: space-around;
	align-self: center;
`
