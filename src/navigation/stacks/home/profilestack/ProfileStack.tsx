import { useReactiveVar } from '@apollo/client'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import UserProfileScreen from '@navigation/screens/hometabs/profile/Profile'
import { StackActions, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthorizationReactiveVar } from '@reactive'
import { ProfileTabStackParamList } from '@types'
import * as Haptics from 'expo-haptics'
import { HStack, Icon, IconButton, Pressable, Text, useColorMode, useTheme } from 'native-base'
import { View } from 'react-native'

// TODO: UX(need to navigate to a setting page for application level setting ie Push Notifications, Location, Network History Deletion)

const ScreenStack = createStackNavigator<ProfileTabStackParamList>()

function PublicPersonalStackNavigation() {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const theme = useTheme()
	const colorScheme = useColorMode()

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
					backgroundColor:
						colorScheme.colorMode === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				},
				headerTitle: () => {
					return (
						<Pressable onPress={onPressProfileTitle}>
							<HStack space={2} alignItems={'center'}>
								<Text fontWeight={'bold'} fontSize={'lg'} maxW={'165px'} ellipsizeMode={'tail'}>
									{rAuthorizationVar?.DeviceProfile?.Profile.IdentifiableInformation?.username}
								</Text>
								<Icon
									as={FontAwesome}
									name={'caret-down'}
									size={'25px'}
									position={'absolute'}
									right={-20}
								/>
							</HStack>
						</Pressable>
					)
				},
				headerLeft: () => null,
				headerRight: () => (
					<IconButton
						onPress={() =>
							navigation.dispatch(
								StackActions.push('ProfileEditorNavigator', {
									screen: 'EditableOptionsScreen',
								}),
							)
						}
						_pressed={{
							bg: 'transparent',
						}}
						icon={<Icon as={MaterialCommunityIcons} name={'dots-horizontal'} size={30} />}
					/>
				),
			}}
		>
			<ScreenStack.Screen name='UserProfileScreen' component={UserProfileScreen} />
		</ScreenStack.Navigator>
	)
}

export default PublicPersonalStackNavigation
