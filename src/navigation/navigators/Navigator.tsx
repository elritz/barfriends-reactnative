import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE } from '@constants/StorageConstants'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { DeviceManager } from '@graphql/generated'
import AppLinkingConfiguration from '@navigation/AppLinkingConfiguration'
import RootNavigator from '@navigation/navigators/rootnavigator/RootNavigator'
import AnimatedAppLoader from '@navigation/screens/Splashscreen/AnimatedAppLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import {
	AuthorizationReactiveVar,
	ThemeColorScheme,
	ThemeInterface,
	ThemeReactiveVar,
} from '@reactive'
import createTheme from '@util/hooks/theme/createTheme'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { StatusBar } from 'expo-status-bar'
// import useDefaultTheme from '@util/hooks/theme/useDefaultTheme'
import { NativeBaseProvider, useColorMode } from 'native-base'
import React, { useCallback, useEffect, useMemo } from 'react'
import { ColorSchemeName, useColorScheme } from 'react-native'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

// TODO: FN(Listen to notifications) ln: ... Notifications.addPushTokenListener
interface NavigationProps {}

const Navigator: React.FC<NavigationProps> = () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const memTheme = useMemo(() => {
		return rThemeVar.theme
	}, [rThemeVar.theme])

	useEffect(() => {
		const setTheme = async () => {
			await toggleThemes({})
		}
		setTheme()
	}, [])

	if (!rThemeVar.theme) return null

	return (
		<NavigationContainer
			theme={memTheme.rn}
			linking={AppLinkingConfiguration}
			// fallback={<SplashScreen />}
		>
			<StyledThemeProvider theme={memTheme.styled}>
				<NativeBaseProvider theme={memTheme.nb}>
					<BottomSheetModalProvider>
						<AnimatedAppLoader>
							<RootNavigator />
							<StatusBar animated style={memTheme.styled.theme === 'light' ? 'dark' : 'light'} />
						</AnimatedAppLoader>
					</BottomSheetModalProvider>
				</NativeBaseProvider>
			</StyledThemeProvider>
		</NavigationContainer>
	)
}

export default Navigator
