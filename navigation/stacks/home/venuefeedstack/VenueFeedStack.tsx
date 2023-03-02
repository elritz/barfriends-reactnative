import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import { HOME_TAB_TOP_NAIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import VenueFeedScreen from '@navigation/screens/hometabs/venuesfeed/VenueFeedScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTabStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box, VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

const ScreenStack = createStackNavigator<HomeTabStackParamList>()

function VenueFeedStack() {
	const colorScheme = useThemeColorScheme()

	return (
		<ScreenStack.Navigator initialRouteName='VenueFeedScreen'>
			<ScreenStack.Screen
				name='VenueFeedScreen'
				component={VenueFeedScreen}
				options={{
					headerShown: true,
					headerTransparent: true,
					gestureResponseDistance: 240,
					gestureDirection: 'horizontal',
					header: () => {
						return (
							<VStack height={HOME_TAB_TOP_NAIGATION_HEIGHT} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.50' }}
										_dark={{ bg: 'dark.50' }}
										style={[StyleSheet.absoluteFill]}
									/>
								)}
								<VenueFeedSearchInput />
							</VStack>
						)
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default VenueFeedStack
