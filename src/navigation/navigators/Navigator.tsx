import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME } from '@constants/StorageConstants'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useGetNotificationsQuery } from '@graphql/generated'
import AppLinkingConfiguration from '@navigation/AppLinkingConfiguration'
import RootNavigator from '@navigation/navigators/rootnavigator/RootNavigator'
import SplashScreen from '@navigation/screens/SplashScreen'
import AnimatedSplashScreen from '@navigation/screens/Splashscreen/AnimatedSplashScreen'
import { LocalStoragePreferenceThemeType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { getExpoPushTokenAsync } from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
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
			LOCAL_STORAGE_PREFERENCE_THEME_COLOR_SCHEME,
		)
		const valueLocalStorageColorScheme: LocalStoragePreferenceThemeType = JSON.parse(
			String(localStorageColorScheme),
		)

		await toggleThemes({ colorScheme: valueLocalStorageColorScheme.colorScheme })
	}
	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			const currentDeviceAppearance = Appearance.getColorScheme()
			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				setTheme()
			}
			if (rThemeVar.localStorageColorScheme === 'system') {
				if (currentDeviceAppearance !== rThemeVar.colorScheme) {
					setTheme()
				}
			}
			/// beef yaki noodles
			/// 40 guiza

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
		<NavigationContainer theme={memTheme.rn} linking={AppLinkingConfiguration}>
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
