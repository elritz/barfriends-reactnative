import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE } from '@constants/StorageConstants'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DeviceManager } from '@graphql/generated'
import AppLinkingConfiguration from '@navigation/AppLinkingConfiguration'
import RootNavigator from '@navigation/navigators/rootnavigator/RootNavigator'
import SplashScreen from '@navigation/screens/SplashScreen'
import AnimatedSplashScreen from '@navigation/screens/Splashscreen/AnimatedSplashScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	ThemeColorScheme,
	ThemeColorSchemeParseType,
	ThemeInterface,
	ThemeReactiveVar,
} from '@reactive'
import createTheme from '@util/hooks/theme/createTheme'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { useAssets } from 'expo-asset'
import { StatusBar } from 'expo-status-bar'
// import useDefaultTheme from '@util/hooks/theme/useDefaultTheme'
import { NativeBaseProvider, useColorMode, useColorModeValue } from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Appearance, AppState, ColorSchemeName, useColorScheme } from 'react-native'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

// TODO: FN(Listen to notifications) ln: ... Notifications.addPushTokenListener
interface NavigationProps {}

const Navigator: React.FC<NavigationProps> = () => {
	const appState = useRef(AppState.currentState)
	const [appStateVisible, setAppStateVisible] = useState(appState.current)
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()
	const colorScheme = useThemeColorScheme()
	const deviceColorScheme = useColorScheme()

	const setTheme = async () => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
		)
		const valueLocalStorageColorScheme: ThemeColorSchemeParseType = JSON.parse(
			String(localStorageColorScheme),
		)

		await toggleThemes({ colorScheme: valueLocalStorageColorScheme.colorScheme })
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			const currentDeviceAppearance = Appearance.getColorScheme()
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				console.log('AppState ======== INACTIVE 111111', currentDeviceAppearance)
				console.log('AppState ======== INACTIVE 222222', rThemeVar.colorScheme)
				console.log('AppState ======== INACTIVE 33333', rThemeVar.localStorageColorScheme)
				setTheme()
				console.log('CALLED111111')
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
				if (currentDeviceAppearance !== rThemeVar.colorScheme) {
					console.log('AppState ======== ACTIVE 111111', currentDeviceAppearance)
					console.log('AppState ======== ACTIVE 222222', rThemeVar.colorScheme)
					console.log('AppState ======== ACTIVE 33333', rThemeVar.localStorageColorScheme)
					setTheme()
					console.log('CALLED22222')
				}
			}

			appState.current = nextAppState
		})

		return () => {
			subscription.remove()
		}
	}, [])

	useEffect(() => {
		setTheme()
	}, [])

	const memTheme = useMemo(() => {
		return rThemeVar.theme
	}, [rThemeVar.theme, rThemeVar.colorScheme, colorScheme, deviceColorScheme])

	if (!memTheme) return null

	return (
		<NavigationContainer
			theme={memTheme.rn}
			linking={AppLinkingConfiguration}
			// fallback={<SplashScreen />}
		>
			<StyledThemeProvider theme={memTheme.styled}>
				<NativeBaseProvider theme={memTheme.nb}>
					<BottomSheetModalProvider>
						<RootNavigator />
						<StatusBar animated style={memTheme.styled.theme === 'light' ? 'dark' : 'light'} />
					</BottomSheetModalProvider>
				</NativeBaseProvider>
			</StyledThemeProvider>
		</NavigationContainer>
	)
}

export default Navigator
