import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import AuthenticatorScreen from '@navigation/screens/credential/login/authenticator/AuthenticatorScreen'
import ConfirmationCodeScreen from '@navigation/screens/credential/login/code/ConfirmationCodeScreen'
import DeviceManagerScreen from '@navigation/screens/credential/login/devicemanager/DeviceManager'
import PasswordLoginScreen from '@navigation/screens/credential/login/passwordlogin/PasswordLoginScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginStackParamList } from '@types'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<LoginStackParamList>()

function LoginStack() {
	const themeContext = useContext(ThemeContext)
	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		>
			<ScreenStack.Screen
				name='AuthenticatorScreen'
				component={AuthenticatorScreen}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background.default,
					},
				}}
			/>
			<ScreenStack.Screen
				name='ConfirmationCodeScreen'
				component={ConfirmationCodeScreen}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background.default,
					},
				}}
			/>
			<ScreenStack.Screen
				name='DeviceManagerScreen'
				component={DeviceManagerScreen}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background.default,
					},
				}}
			/>
			<ScreenStack.Screen
				name='PasswordLoginScreen'
				component={PasswordLoginScreen}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background.default,
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default LoginStack
