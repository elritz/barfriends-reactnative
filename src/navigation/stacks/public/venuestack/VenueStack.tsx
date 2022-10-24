import VenueScreen from '@navigation/screens/public/venue/Venue'
import { createStackNavigator } from '@react-navigation/stack'
import { VenueProfileStackParamList } from '@types'

const ScreenStack = createStackNavigator<VenueProfileStackParamList>()

function VenueStack() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='PublicVenueScreen'
				component={VenueScreen}
				options={{
					headerShown: false,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default VenueStack
