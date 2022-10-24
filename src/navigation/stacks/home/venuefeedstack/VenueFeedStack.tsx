import { useReactiveVar } from '@apollo/client'
import VenueSearchInputDisable from '@components/molecules/search/venuefeed/VenueSearchInputDisable'
import VenueFeedScreen from '@navigation/screens/hometabs/venuesfeed/VenueFeedScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeReactiveVar } from '@reactive'
import { HomeTabStackParamList } from '@types'
import { BlurView } from 'expo-blur'
import { VStack } from 'native-base'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<HomeTabStackParamList>()

function VenueFeedStack() {
	const themeContext = useContext(ThemeContext)
	const theme = useReactiveVar(ThemeReactiveVar)

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
							<VStack height={105} justifyContent={'flex-end'}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
								) : (
									<View
										style={[
											StyleSheet.absoluteFill,
											{ backgroundColor: themeContext.palette.primary.background },
										]}
									/>
								)}
								<VenueSearchInputDisable />
							</VStack>
						)
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default VenueFeedStack
