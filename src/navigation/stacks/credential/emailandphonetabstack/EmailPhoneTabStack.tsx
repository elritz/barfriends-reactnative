import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import EmailScreen from '@navigation/screens/credential/email/EmailScreen'
import PhoneScreen from '@navigation/screens/credential/phone/PhoneScreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { EmailPhoneTabStackParamlist } from '@types'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<EmailPhoneTabStackParamlist>()

function EmailPhoneTabStack() {
	const themeContext = useContext(ThemeContext)
	return (
		<ScreenStack.Navigator
			initialRouteName='PhoneScreen'
			keyboardDismissMode='none'
			tabBarPosition='top'
			screenOptions={{
				tabBarContentContainerStyle: {
					backgroundColor: themeContext.palette.primary.background,
					height: TAB_NAVIGATION_HEIGHT,
				},
				tabBarInactiveTintColor: themeContext.palette.disabled.background,
				tabBarActiveTintColor: themeContext.palette.active.color.primary,
				tabBarIndicatorStyle: {
					backgroundColor: themeContext.palette.active.color.primary,
					bottom: -1,
					borderBottomWidth: 2,
					borderBottomColor: themeContext.palette.active.color.primary,
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
