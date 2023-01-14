import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import EmojimoodScreen from '@navigation/screens/editors/emojimoodscreen/EmojimoodScreen'
import TonightScreen from '@navigation/screens/hometabs/tonight/Tonight'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TonightTabStackParamList } from '@types'
import { useForm } from 'react-hook-form'

const ScreenStack = createNativeStackNavigator<TonightTabStackParamList>()
function TonightNavigator() {
	const methods = useForm({
		defaultValues: {
			searchtext: '',
			done: false,
		},
	})

	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='TonightScreen'
				component={TonightScreen}
				options={{ headerShown: false }}
			/>
			<ScreenStack.Screen
				name='SelectEmojimoodScreen'
				component={EmojimoodScreen}
				options={{
					headerShown: true,
					presentation: 'modal',
					headerTitle: () => <NavigationDragIcon />,
					headerLeft: () => null,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default TonightNavigator
