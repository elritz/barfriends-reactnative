import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { TermsServicePrivacyTabStackParamList } from '@ctypes/app'
import Privacy from '@navigation/screens/credential/settings/privacy/Privacy'
import TermsOfService from '@navigation/screens/credential/settings/services/Services'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<TermsServicePrivacyTabStackParamList>()

function TermsServicePrivacyNavigationTab() {
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	return (
		<ScreenStack.Navigator
			screenOptions={{
				tabBarContentContainerStyle: {
					backgroundColor: themeContext.palette.primary.background.default,
					height: TAB_NAVIGATION_HEIGHT,
				},
				tabBarInactiveTintColor: theme.colors.gray[400],
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
