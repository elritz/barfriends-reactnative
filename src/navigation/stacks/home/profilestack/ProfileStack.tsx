import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import UserProfileScreen from '@navigation/screens/hometabs/profile/PersonalProfile/PersonalProfile'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileTabStackParamList } from '@types'
import * as Haptics from 'expo-haptics'
import { Icon, IconButton, Pressable } from 'native-base'
import { View } from 'react-native'

// TODO: UX(need to navigate to a setting page for application level setting ie Push Notifications, Location, Network History Deletion)

const ScreenStack = createStackNavigator<ProfileTabStackParamList>()

function PublicPersonalStackNavigation() {
	const navigation = useNavigation()

	const onPressProfileTitle = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
		navigation.navigate('ModalNavigator', {
			screen: 'DeviceManagerModal',
		})
	}

	return (
		<ScreenStack.Navigator
			screenOptions={{
				gestureEnabled: false,
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerTitle: '',
				headerRight: () => (
					<View
						style={{ display: 'flex', flexDirection: 'row', width: 90, justifyContent: 'space-around' }}
					>
						<IconButton
							onPress={() => onPressProfileTitle()}
							icon={<Icon as={MaterialCommunityIcons} name={'account-multiple'} size={30} />}
						/>
						<IconButton
							onPress={() => console.log('TODO')}
							icon={<Icon as={Ionicons} name={'settings-sharp'} size={27} />}
						/>
					</View>
				),
			}}
		>
			<ScreenStack.Screen name='UserProfileScreen' component={UserProfileScreen} />
		</ScreenStack.Navigator>
	)
}

export default PublicPersonalStackNavigation
