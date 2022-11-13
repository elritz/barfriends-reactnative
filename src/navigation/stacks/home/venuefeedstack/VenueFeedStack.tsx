import VenueFeedSearchInput from '@components/molecules/search/venuefeed/VenueFeedSearchInput'
import VenueFeedScreen from '@navigation/screens/hometabs/venuesfeed/VenueFeedScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTabStackParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box, VStack } from 'native-base'
import { Platform, StyleSheet, View } from 'react-native'

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
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box style={[StyleSheet.absoluteFill]} />
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
