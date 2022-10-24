import PersonalScreen from '@navigation/screens/public/personal/Personal'
import { createStackNavigator } from '@react-navigation/stack'
import { PersonalProfileStackParamList } from '@types'
import React, { useContext } from 'react'

const ScreenStack = createStackNavigator<PersonalProfileStackParamList>()

function PersonalStack() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='PublicPersonalScreen'
				component={PersonalScreen}
				options={{
					headerShown: false,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerTitle: 'Public Personal Screen',
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default PersonalStack
