import { useReactiveVar } from '@apollo/client'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {
	BottomSheetModal,
	BottomSheetScrollView,
	useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import UserProfileScreen from '@navigation/screens/hometabs/profile/Profile'
import ProfileSettingsOptionsScreen from '@navigation/screens/settings/profilesettingoptions/ProfileSettingsOptionsScreen'
import { StackActions, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthorizationReactiveVar } from '@reactive'
import { ProfileTabStackParamList } from '@types'
import * as Haptics from 'expo-haptics'
import { HStack, Icon, IconButton, Pressable, Text, useColorMode, useTheme } from 'native-base'
import { useCallback, useMemo, useRef } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

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
				headerTitle: '',
				headerLeft: () => {
					return (
						<>
							{rAuthorizationVar?.DeviceProfile?.Profile.ProfileType === 'GUEST' ? null : (
								<Pressable onPress={onPressProfileTitle}>
									<HStack ml={2} space={2} alignItems={'center'}>
										<Text fontWeight={'medium'} fontSize={'24px'} maxW={'165px'} ellipsizeMode={'tail'}>
											{rAuthorizationVar?.DeviceProfile?.Profile.IdentifiableInformation?.username}
										</Text>
										<Icon
											as={Ionicons}
											name={'chevron-down'}
											size={'23px'}
											position={'absolute'}
											top={2}
											right={-15}
										/>
									</HStack>
								</Pressable>
							)}
						</>
					)
				},
				headerRight: () => (
					<IconButton
						onPress={() =>
							navigation.dispatch(
								StackActions.push('ProfileSettingsNavigator', {
									screen: 'ProfileSettingsOptionsScreen',
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
