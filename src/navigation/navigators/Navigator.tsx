import { useReactiveVar } from '@apollo/client'
import { AUTHORIZATION, LOCAL_STORAGE_SEARCH_AREA } from '@constants/StorageConstants'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import {
	DeviceManager,
	useCreateADeviceManagerMutation,
	useCreateGuestProfileMutation,
	useRefreshDeviceManagerMutation,
	useSwitchDeviceProfileMutation,
	useUpdateOneProfileMutation,
} from '@graphql/generated'
import AppLinkingConfiguration from '@navigation/AppLinkingConfiguration'
import RootNavigator from '@navigation/navigators/rootnavigator/RootNavigator'
import SplashScreen from '@navigation/screens/SplashScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	PermissionCameraReactiveVar,
	ForegroundLocationPermissionReactiveVar,
	PermissionMediaReactiveVar,
	PermissionMicrophoneReactiveVar,
	SearchAreaReactiveVar,
	SearchAreaType,
	BackgroundLocationPermissionReactiveVar,
} from '@reactive'
import { ThemeProvider as RNEThemeProvider } from '@rneui/themed'
import useCheckLocalStorageForAuthorizationToken from '@util/hooks/auth/useCheckLocalStorageForAuthorizationToken'
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { setDefaultTheme } from '@util/hooks/theme/useDefaultTheme'
import * as Application from 'expo-application'
import { Camera } from 'expo-camera'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { NativeBaseProvider } from 'native-base'
import React, { useEffect } from 'react'
import { ColorSchemeName, View } from 'react-native'
import { AuthorizationDecoded } from 'src/types/app'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

// TODO: FN(Listen to notifications) ln: ... Notifications.addPushTokenListener
interface NavigationProps {
	colorScheme: ColorSchemeName
}

const Navigator: React.FC<NavigationProps> = ({ colorScheme }: NavigationProps) => {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const themesObject = setDefaultTheme()

	const setLocalStorageData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_SEARCH_AREA)
			if (jsonValue != null) {
				const values: SearchAreaType = JSON.parse(jsonValue)
				if (values.useCurrentLocation) {
					await useSetSearchAreaWithLocation()
				} else {
					SearchAreaReactiveVar({
						...rSearchAreaVar,
						city: values.city,
						country: values.country,
						state: values.state,
						coords: {
							latitude: Number(values.coords.latitude),
							longitude: Number(values.coords.longitude),
						},
						distance: values.distance,
						kRing: 2,
					})
				}
			} else {
				const newSearchAreaValue = JSON.stringify(valueLessSearchArea)
				await AsyncStorage.setItem(LOCAL_STORAGE_SEARCH_AREA, newSearchAreaValue)
			}
		} catch (e) {
			// error reading value
		}
	}

	const setPermissions = async () => {
		const cameraPermission = await Camera.getCameraPermissionsAsync()
		const microphonePermission = await Camera.getMicrophonePermissionsAsync()
		const foregroundLocationPermission = await getForegroundPermissionsAsync()
		const backgroundLocationPermission = await getBackgroundPermissionsAsync()
		const mediaLibraryPermission = await getPermissionsAsync()

		PermissionCameraReactiveVar(cameraPermission)
		PermissionMicrophoneReactiveVar(microphonePermission)
		ForegroundLocationPermissionReactiveVar(foregroundLocationPermission)
		BackgroundLocationPermissionReactiveVar(backgroundLocationPermission)
		PermissionMediaReactiveVar(mediaLibraryPermission)
	}
	const setExpo = async () => {
		const cameraPermission = await Camera.getCameraPermissionsAsync()
	}

	const valueLessSearchArea: SearchAreaType = {
		...rSearchAreaVar,
		useCurrentLocation: false,
		country: '',
		state: '',
		city: '',
		coords: {
			latitude: undefined,
			longitude: undefined,
		},
	}

	const ReactNavigationTheme: Theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: themesObject.themes.styled.palette.primary.background,
			primary: themesObject.themes.styled.palette.company.primary,
			card: themesObject.themes.styled.palette.secondary.background,
			text: themesObject.themes.styled.palette.primary.color.primary,
			border: themesObject.themes.styled.palette.primary.color.secondary,
			notification: themesObject.themes.styled.palette.company.tertiary,
		},
	}

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}
			},
		})

	const [refreshDeviceManagerMutation, { data: RDMData, loading: RDMLoading, error: RDMError }] =
		useRefreshDeviceManagerMutation({
			fetchPolicy: 'network-only',
			onCompleted: data => {
				if (
					data.refreshDeviceManager.__typename === 'DeviceManager' ||
					data.refreshDeviceManager.__typename === 'Success'
				) {
					const deviceManager = data.refreshDeviceManager as DeviceManager
					AuthorizationReactiveVar(deviceManager)
				}

				if (data.refreshDeviceManager.__typename === 'Error') {
					createADeviceManagerMutation()
				}
			},
		})

	const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
		onCompleted: async data => {
			if (data.createGuestProfile.__typename === 'CreateProfileResponse') {
				createADeviceManagerMutation({
					variables: {
						profileId: data.createGuestProfile.Profile.id,
					},
				})
			}
		},
	})

	const [createADeviceManagerMutation, { data: CDMData, loading: CDMLoading, error: CDMError }] =
		useCreateADeviceManagerMutation({
			onCompleted: async data => {
				if (
					data.createADeviceManager.__typename === 'Success' ||
					data.createADeviceManager.__typename === 'DeviceManager'
				) {
					updateOneProfileMutation({
						variables: {
							where: {
								id: rAuthorizationVar.DeviceProfile.Profile.id,
							},
							data: {
								DeviceManager: {
									push: rAuthorizationVar.id,
								},
							},
						},
					})
				}
			},
		})

	const [updateOneProfileMutation, { data: UOPData, loading: UOPLoading, error: UOPError }] =
		useUpdateOneProfileMutation()

	const applicationAuthorization = async () => {
		// const removeLocalAuhtorizationToken = await secureStorageItemDelete({
		// 	key: AUTHORIZATION,
		// })
		const getAuthorization = (await secureStorageItemRead({
			key: AUTHORIZATION,
			decode: true,
		})) as AuthorizationDecoded

		if (!getAuthorization) {
			createGuestProfileMutation()
		} else {
			refreshDeviceManagerMutation()
		}
	}

	useEffect(() => {
		setPermissions()
		setLocalStorageData()
		applicationAuthorization()
	}, [])

	useEffect(() => {
		const subscription = Notifications.addPushTokenListener(e => {})
		return () => subscription.remove()
	}, [])

	if (!RDMData || RDMLoading || CDMLoading) return null

	return (
		<NavigationContainer
			theme={ReactNavigationTheme}
			linking={AppLinkingConfiguration}
			// fallback={<SplashScreen />}
		>
			<StyledThemeProvider theme={themesObject.themes.styled}>
				<NativeBaseProvider theme={themesObject.themes.nativebase}>
					<RNEThemeProvider theme={themesObject.themes.rne}>
						<BottomSheetModalProvider>
							<RootNavigator />
						</BottomSheetModalProvider>
					</RNEThemeProvider>
				</NativeBaseProvider>
			</StyledThemeProvider>
		</NavigationContainer>
	)
}

export default Navigator
