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
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const colorScheme = useColorScheme()

	const memTheme = useMemo(() => {
		return rThemeVar.theme
	}, [rThemeVar.theme, rThemeVar.colorScheme])

	setTheme({
		colorScheme,
		rAuthorizationVar,
		rThemeVar,
	})

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

type setThemeProps = {
	rAuthorizationVar: DeviceManager
	colorScheme: ColorSchemeName
	rThemeVar: ThemeInterface
	newColorScheme?: 'light' | 'dark' | 'system' | null
}

export const setTheme = async ({
	rAuthorizationVar,
	colorScheme,
	rThemeVar,
	newColorScheme,
}: setThemeProps) => {
	const { toggleColorMode } = useColorMode()
	const themeSwitch = async () => {
		let switchColor = rThemeVar.colorScheme
		const dataTheme = rAuthorizationVar.DeviceProfile.Profile.ThemeManager.activeTheme.mobile[0]

		if (newColorScheme) {
			switchColor = newColorScheme
			const initialThemeColorSchemeState = {
				colorScheme: newColorScheme,
			}
			const newThemeColorScheme = JSON.stringify(initialThemeColorSchemeState)
			await AsyncStorage.setItem(LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE, newThemeColorScheme)
		}

		switch (switchColor) {
			case 'system':
				console.log('HERE1')
				const sTheme = createTheme({ themeScheme: colorScheme, theme: dataTheme })
				ThemeReactiveVar({
					...rThemeVar,
					theme: sTheme,
				})
				break
			case 'light':
				console.log('HERE2')
				const lTheme = createTheme({ themeScheme: 'light', theme: dataTheme })
				toggleColorMode()
				ThemeReactiveVar({
					...rThemeVar,
					theme: lTheme,
				})
				break
			case 'dark':
				console.log('HERE3')
				const dTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
				toggleColorMode()
				ThemeReactiveVar({
					...rThemeVar,
					theme: dTheme,
				})
				break
			default:
				console.log('HERE4')
				const defaultTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
				ThemeReactiveVar({
					...rThemeVar,
					theme: defaultTheme,
				})
		}
	}

	useEffect(() => {
		themeSwitch()
	}, [])

	return {
		theme: rThemeVar.theme,
	}
}

export const useToggleTheme = () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { setColorMode } = useColorMode()
	const colorScheme = useColorScheme()

	const dataTheme = rAuthorizationVar.DeviceProfile.Profile.ThemeManager.activeTheme.mobile[0]

	const toggleTheme = useCallback(async ({ newColorScheme }) => {
		const localStorageColorScheme = await AsyncStorage.getItem(
			LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
		)
		const valueLocalStorageColorScheme = JSON.parse(localStorageColorScheme)
		if (newColorScheme !== valueLocalStorageColorScheme.colorScheme) {
			const initialThemeColorSchemeState = {
				colorScheme: newColorScheme,
			}
			const newLocalStorageColorScheme = JSON.stringify(initialThemeColorSchemeState)
			await AsyncStorage.setItem(
				LOCAL_STORAGE_THEME_COLOR_SCHEME_PREFERENCE,
				newLocalStorageColorScheme,
			)

			switch (newColorScheme) {
				case 'system':
					console.log('HERE SYSTEM')
					const sTheme = createTheme({ themeScheme: colorScheme, theme: dataTheme })
					setColorMode(colorScheme)
					ThemeReactiveVar({
						colorScheme: 'system',
						theme: sTheme,
					})
					break
				case 'light':
					setColorMode('light')
					const lTheme = createTheme({ themeScheme: 'light', theme: dataTheme })
					ThemeReactiveVar({
						colorScheme: 'light',
						theme: lTheme,
					})
					break
				case 'dark':
					setColorMode('dark')
					const dTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
					ThemeReactiveVar({
						colorScheme: 'dark',
						theme: dTheme,
					})
					break
				default:
					console.log('HERE DEFAULT')
					setColorMode('dark')
					const defaultTheme = createTheme({ themeScheme: 'dark', theme: dataTheme })
					ThemeReactiveVar({
						colorScheme: 'dark',
						theme: defaultTheme,
					})
			}
			// if (newColorScheme === 'system' && newColorScheme !== colorMode) {
			// 	toggleColorMode()
			// } else if (newColorScheme !== colorMode) {
			// 	toggleColorMode()
			// }
		}
	}, [])

	return [rThemeVar, toggleTheme]
}
