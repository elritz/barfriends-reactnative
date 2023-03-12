import { ExploreFilterTabParamList, InviteStackParamList } from '@ctypes/app'
import { InviteOutVenueModal } from '@navigation/screens/modals/invite/InviteModal'
import { RouteProp, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const ScreenStack = createStackNavigator<InviteStackParamList>()

interface IColor {
	color: string
}

export type SearchFilterTabStackRouteProp = RouteProp<
	ExploreFilterTabParamList,
	'SearchResultTabStack'
>

function InviteStackNavigiation() {
	const route = useRoute<SearchFilterTabStackRouteProp>()
	return (
		<ScreenStack.Navigator screenOptions={{}}>
			<ScreenStack.Screen name='VenueInviteModal' component={InviteOutVenueModal} />
		</ScreenStack.Navigator>
	)
}

export default InviteStackNavigiation
