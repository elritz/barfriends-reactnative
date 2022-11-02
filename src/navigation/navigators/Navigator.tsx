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
import AnimatedAppLoader from '@navigation/screens/Splashscreen/AnimatedAppLoader'
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
import { secureStorageItemDelete, secureStorageItemRead } from '@util/hooks/local/useSecureStorage'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { setDefaultTheme } from '@util/hooks/theme/useDefaultTheme'
import { Camera } from 'expo-camera'
import { getBackgroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location'
import { getPermissionsAsync } from 'expo-media-library'
import * as Notifications from 'expo-notifications'
import { NativeBaseProvider } from 'native-base'
import React, { useEffect } from 'react'
import { ColorSchemeName } from 'react-native'
import { AuthorizationDecoded } from 'src/types/app'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

// TODO: FN(Listen to notifications) ln: ... Notifications.addPushTokenListener
interface NavigationProps {
	colorScheme: ColorSchemeName
}

const Navigator: React.FC<NavigationProps> = ({ colorScheme }: NavigationProps) => {
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const {
		themes: { nativebase, rn, styled },
	} = setDefaultTheme()

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

	// const ReactNavigationTheme: Theme = {
	// 	...DefaultTheme,
	// 	colors: {
	// 		...DefaultTheme.colors,
	// 		background: themes.themes.styled.palette.primary.background,
	// 		primary: themes.themes.styled.palette.company.primary,
	// 		card: themes.themes.styled.palette.secondary.background,
	// 		text: themes.themes.styled.palette.primary.color.primary,
	// 		border: themes.themes.styled.palette.primary.color.secondary,
	// 		notification: themes.themes.styled.palette.company.tertiary,
	// 	},
	// }

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
			console.log('🚀 ~ file: Navigator.tsx ~ line 156 ~ data', data)
			if (data.createGuestProfile.__typename === 'CreateProfileResponse') {
				createADeviceManagerMutation({
					variables: {
						profileId: data.createGuestProfile.Profile.id,
					},
				})
			}
		},
	})
	console.log('🚀 ~ file: Navigator.tsx ~ line 164 ~ error', error)

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
		console.log(
			'🚀 ~ file: Navigator.tsx ~ line 199 ~ applicationAuthorization ~ getAuthorization',
			getAuthorization,
		)

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
			theme={rn}
			linking={AppLinkingConfiguration}
			// fallback={<SplashScreen />}
		>
			<StyledThemeProvider theme={styled}>
				<NativeBaseProvider theme={nativebase}>
					<BottomSheetModalProvider>
						<AnimatedAppLoader>
							<RootNavigator />
						</AnimatedAppLoader>
					</BottomSheetModalProvider>
				</NativeBaseProvider>
			</StyledThemeProvider>
		</NavigationContainer>
	)
}

export default Navigator
