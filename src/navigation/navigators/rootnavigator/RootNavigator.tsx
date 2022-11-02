import ModalNavigator from '../modalnavigator/ModalNavigator'
import PublicNavigator from '../publicnavigator/PublicNavigator'
import CredentialNavigator from '@navigation/navigators/credentialnavigator/CredentialNavigator'
import HomeTabNavigator from '@navigation/navigators/hometabnavigator/HomeTabNavigator'
import MessageRoomNavigator from '@navigation/navigators/messageroomnavigator/MessageRoomNavigator'
import PermissionNavigator from '@navigation/navigators/permissionnavigator/PermissionNavigator'
import ProfileEditorNavigator from '@navigation/navigators/profileeditornavigator/ProfileEditorNavigator'
import SettingsNavigator from '@navigation/stacks/settingsstack/SettingsStack'
import { createStackNavigator } from '@react-navigation/stack'
import { RootNavigatorParamList } from '@types'

const ScreenStack = createStackNavigator<RootNavigatorParamList>()

function RootNavigator() {
	return (
		<ScreenStack.Navigator screenOptions={{ headerShown: false }}>
			<ScreenStack.Screen name='HomeTabNavigator' component={HomeTabNavigator} />
			<ScreenStack.Screen name='CredentialNavigator' component={CredentialNavigator} />
			<ScreenStack.Screen name='SettingsNavigator' component={SettingsNavigator} />
			<ScreenStack.Screen
				name='PermissionNavigator'
				component={PermissionNavigator}
				options={{
					presentation: 'modal',
				}}
			/>
			<ScreenStack.Screen
				name='ModalNavigator'
				component={ModalNavigator}
				options={{
					presentation: 'modal',
				}}
			/>
			<ScreenStack.Screen name='ProfileEditorNavigator' component={ProfileEditorNavigator} />
			<ScreenStack.Screen name='MessageRoomNavigator' component={MessageRoomNavigator} />
			<ScreenStack.Screen name='PublicNavigator' component={PublicNavigator} />
		</ScreenStack.Navigator>
	)
}

export default RootNavigator
