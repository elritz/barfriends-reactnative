import SearchFilterTabStack from '../../searchfiltertabstack/SearchFilterTabStack'
import ExploreSearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import SearchTopTabStackInput from '@components/molecules/search/searchtoptabs/SearchTopTabStackInput'
import { ExploreFilterTabParamList, HomeTabNavigatorParamList } from '@ctypes/app'
import PublicNavigator from '@navigation/navigators/publicnavigator/PublicNavigator'
import ExploreScreen from '@navigation/screens/hometabs/explore/ExploreScreen'
import SearchTextScreen from '@navigation/screens/search/searchtext/SearchTextScreen'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box, useTheme } from 'native-base'
import { VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

const ScreenStack = createStackNavigator<ExploreFilterTabParamList>()

export type ExploreFilterTabSearchResultRouteProp = RouteProp<
	HomeTabNavigatorParamList,
	'ExploreStack'
>

function ExploreStack() {
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()

	return (
		<ScreenStack.Navigator screenOptions={{}}>
			<ScreenStack.Screen
				name='ExploreScreen'
				component={ExploreScreen}
				options={{
					headerShown: true,
					headerTransparent: true,
					gestureResponseDistance: 240,
					gestureDirection: 'horizontal',
					header: () => {
						return (
							<VStack height={90} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.50' }}
										_dark={{ bg: 'dark.50' }}
										style={[StyleSheet.absoluteFill]}
									/>
								)}
								<ExploreSearchInputDisabled
									onPress={() =>
										navigation.navigate('HomeTabNavigator', {
											screen: 'ExploreStack',
											params: {
												screen: 'SearchTextScreen',
												params: {
													searchText: '',
												},
											},
										})
									}
								/>
							</VStack>
						)
					},
				}}
			/>
			<ScreenStack.Screen
				name='SearchTextScreen'
				component={SearchTextScreen}
				options={{
					headerTransparent: true,
					header: () => {
						return (
							<VStack height={90} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.50' }}
										_dark={{ bg: 'dark.50' }}
										style={[StyleSheet.absoluteFill]}
									/>
								)}
								<SearchTextScreenInput />
							</VStack>
						)
					},
				}}
			/>

			<ScreenStack.Screen
				name='SearchResultTabStack'
				component={SearchFilterTabStack}
				options={{
					headerTransparent: true,
					gestureResponseDistance: 1000,
					header: () => {
						return (
							<Box
								style={{
									flexDirection: 'column-reverse',
								}}
								pb={2}
							>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.50' }}
										_dark={{ bg: 'dark.50' }}
										style={[StyleSheet.absoluteFill]}
									/>
								)}
								<SearchTopTabStackInput />
							</Box>
						)
					},
				}}
			/>
			<ScreenStack.Screen
				name='PublicNavigator'
				component={PublicNavigator}
				options={{ headerShown: false }}
			/>
		</ScreenStack.Navigator>
	)
}

export default ExploreStack
