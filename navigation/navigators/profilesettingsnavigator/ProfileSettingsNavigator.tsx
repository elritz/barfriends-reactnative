import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import AppearanceSettingsScreen from '@navigation/screens/settings/appearancesettings'
import ProfileNotificationsSettingsScreen from '@navigation/screens/settings/profilenotificationssettings/ProfileNotificationsSettingsScreen'
import ProfileSettingsOptionsScreen from '@navigation/screens/settings/profilesettingoptions/ProfileSettingsOptionsScreen'
import SecuritySettingsScreen from '@navigation/screens/settings/securitysettings/SecuritySettingsScreen'
import ProfileEditorStack from '@navigation/stacks/settings/profileeditorstack/ProfileEditorStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileSettingsNavigatorParamList } from '@types'
import LogoTransparent from 'assets/images/company/LogoTransparent'
import { useColorMode, useTheme } from 'native-base'

const ScreenStack = createNativeStackNavigator<ProfileSettingsNavigatorParamList>()

function ProfileSettingsNavigator() {
	const theme = useTheme()
	const colorScheme = useColorMode()

	return (
		<ScreenStack.Navigator
			screenOptions={{
				presentation: 'modal',
				headerStyle: {
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		>
			<ScreenStack.Screen
				name='ProfileSettingsOptionsScreen'
				component={ProfileSettingsOptionsScreen}
			/>
			<ScreenStack.Screen name='ProfileEditorStack' component={ProfileEditorStack} />
			<ScreenStack.Screen
				name='NotificationsSettingsScreen'
				component={ProfileNotificationsSettingsScreen}
			/>
			<ScreenStack.Screen name='SecuritySettingsScreen' component={SecuritySettingsScreen} />
			<ScreenStack.Screen name='AppearanceSettingsScreen' component={AppearanceSettingsScreen} />
		</ScreenStack.Navigator>
	)
}

export default ProfileSettingsNavigator
