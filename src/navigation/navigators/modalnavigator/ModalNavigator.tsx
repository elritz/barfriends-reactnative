import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import DeviceManagerModal from '@navigation/screens/modals/devicemanager/DeviceManagerModal'
import { MediaLibraryModal } from '@navigation/screens/modals/medialibrary/MediaLibraryModal'
import SearchAreaStackNavigation from '@navigation/stacks/searchareastack/SearchAreaStack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ModalNavigatorParamList } from '@types'

const ScreenStack = createNativeStackNavigator<ModalNavigatorParamList>()

function ModalNavigator() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='MediaLibraryModal'
				component={MediaLibraryModal}
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerTitle: () => <NavigationDragIcon />,
					headerLeft: () => null,
				}}
			/>
			<ScreenStack.Screen
				name='DeviceManagerModal'
				component={DeviceManagerModal}
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerTitle: () => <NavigationDragIcon />,
					headerLeft: () => null,
				}}
			/>
			<ScreenStack.Screen
				name='SearchAreaModalStack'
				component={SearchAreaStackNavigation}
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: 'transparent',
					},
					// headerTitle: () => <NavigationDragIcon />,
					headerShown: false,
					headerTitle: () => '',
					headerLeft: () => null,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default ModalNavigator
