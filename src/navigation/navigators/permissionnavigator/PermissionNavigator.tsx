import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import NavigationDragIcon from '@components/atoms/icons/navigationdragicon/NavigationDragIcon'
import CameraPermissionScreen from '@navigation/screens/permissions/camera/CameraPermissionScreen'
import BackgroundLocationPermissionScreen from '@navigation/screens/permissions/location/BackgroundLocationPermissionScreen'
import ForegroundLocationPermissionScreen from '@navigation/screens/permissions/location/ForegroundLocationPermissionScreen'
import ForegroundLocationPermissionSearchAreaScreen from '@navigation/screens/permissions/location/ForegroundLocationPermissionSearchAreaScreen'
import MediaLibraryPermissionScreen from '@navigation/screens/permissions/medialibrary/MediaLibraryPermissionScreen'
import NetworkPermissionScreen from '@navigation/screens/permissions/network/NetworkPermissionScreen'
import NotificationsPermissionScreen from '@navigation/screens/permissions/notifications/NotificationsPermissionScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PermissionNavigatorParamList } from '@types'

const ScreenStack = createNativeStackNavigator<PermissionNavigatorParamList>()

function PermissionNavigator() {
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='NetworkInformationScreen'
				component={NetworkPermissionScreen}
				options={{
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<ScreenStack.Group>
				<ScreenStack.Screen
					name='CameraPermissionScreen'
					component={CameraPermissionScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
				<ScreenStack.Screen
					name='ForegroundLocationPermissionSearchAreaScreen'
					component={ForegroundLocationPermissionSearchAreaScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
				<ScreenStack.Screen
					name='ForegroundLocationPermissionScreen'
					component={ForegroundLocationPermissionScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
				<ScreenStack.Screen
					name='BackgroundLocationPermissionScreen'
					component={BackgroundLocationPermissionScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
				<ScreenStack.Screen
					name='MediaLibraryPermissionScreen'
					component={MediaLibraryPermissionScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
				<ScreenStack.Screen
					name='NotificationsPermissionScreen'
					component={NotificationsPermissionScreen}
					options={{
						headerStyle: {
							backgroundColor: 'transparent',
						},
						headerTitle: () => <NavigationDragIcon />,
						headerLeft: () => null,
					}}
				/>
			</ScreenStack.Group>
		</ScreenStack.Navigator>
	)
}

export default PermissionNavigator
