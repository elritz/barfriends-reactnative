import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { EmailPhoneTabStackParamlist } from '@ctypes'
import EmailScreen from '@navigation/screens/credential/email/EmailScreen'
import PhoneScreen from '@navigation/screens/credential/phone/PhoneScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<EmailPhoneTabStackParamlist>()

function EmailPhoneTabStack() {
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	return (
		<ScreenStack.Navigator
			initialRouteName='PhoneScreen'
			keyboardDismissMode='none'
			tabBarPosition='top'
			screenOptions={{
				tabBarContentContainerStyle: {
					backgroundColor: themeContext.palette.primary.background.default,
					height: TAB_NAVIGATION_HEIGHT,
				},
				tabBarInactiveTintColor: theme.colors.primary[500],
				tabBarActiveTintColor: theme.colors.primary[500],
				tabBarIndicatorStyle: {
					backgroundColor: theme.colors.primary[500],
					bottom: -1,
					borderBottomWidth: 2,
					borderBottomColor: theme.colors.primary[500],
				},
			}}
		>
			<ScreenStack.Screen
				options={{ tabBarLabel: 'Phone' }}
				name='PhoneScreen'
				component={PhoneScreen}
			/>
			<ScreenStack.Screen
				options={{ tabBarLabel: 'Email' }}
				name='EmailScreen'
				component={EmailScreen}
			/>
		</ScreenStack.Navigator>
	)
}

export default EmailPhoneTabStack
