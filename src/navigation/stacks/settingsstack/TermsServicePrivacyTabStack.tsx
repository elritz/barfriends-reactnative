import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import Privacy from '@navigation/screens/credential/settings/privacy/Privacy'
import TermsOfService from '@navigation/screens/credential/settings/services/Services'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TermsServicePrivacyTabStackParamList } from '@types'
import * as React from 'react'
import { TabBarIndicator } from 'react-native-tab-view'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<TermsServicePrivacyTabStackParamList>()

function TermsServicePrivacyNavigationTab() {
	const themeContext = React.useContext(ThemeContext)
	return (
		<ScreenStack.Navigator
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
				name='ServiceScreen'
				component={TermsOfService}
				options={{ title: 'Terms of Service' }}
			/>
			<ScreenStack.Screen
				name='PrivacyScreen'
				component={Privacy}
				options={{ title: 'Privacy Policy' }}
			/>
		</ScreenStack.Navigator>
	)
}

export default TermsServicePrivacyNavigationTab
