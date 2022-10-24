import LoginStack from '@navigation/stacks/credential/loginstack/LoginStack'
import PersonalCredentialStack from '@navigation/stacks/credential/personalstack/PersonalStack'
import { createStackNavigator } from '@react-navigation/stack'
import { CredentialNavigatorParamList } from '@types'
import React from 'react'

const ScreenStack = createStackNavigator<CredentialNavigatorParamList>()

function CredentialNavigator() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				options={{
					headerShown: false,
				}}
				name='PersonalCredentialStack'
				component={PersonalCredentialStack}
			/>
			<ScreenStack.Screen
				options={{
					headerShown: false,
				}}
				name='LoginCredentialStack'
				component={LoginStack}
			/>
		</ScreenStack.Navigator>
	)
}

export default CredentialNavigator
