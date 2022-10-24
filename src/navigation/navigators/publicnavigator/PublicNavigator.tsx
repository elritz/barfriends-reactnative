import PersonalStack from '@navigation/stacks/public/personalstack/PersonalStack'
import VenueStack from '@navigation/stacks/public/venuestack/VenueStack'
import { createStackNavigator } from '@react-navigation/stack'
import { PublicNavigatorParamList } from '@types'
import React from 'react'

const ScreenStack = createStackNavigator<PublicNavigatorParamList>()

function PublicNavigator() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				options={{
					headerShown: false,
				}}
				name='PersonalStack'
				component={PersonalStack}
			/>
			<ScreenStack.Screen
				options={{
					headerShown: false,
				}}
				name='VenueStack'
				component={VenueStack}
			/>
		</ScreenStack.Navigator>
	)
}

export default PublicNavigator
