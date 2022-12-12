import SearchFilterTabStack from '../../searchfiltertabstack/SearchFilterTabStack'
import SearchTopTabStackInput from '@components/molecules/search/SearchTopTabStackInput'
import ExploreSearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import ExploreScreen from '@navigation/screens/hometabs/explore/ExploreScreen'
import SearchTextScreen from '@navigation/screens/search/searchtext/SearchTextScreen'
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import {
	CardStyleInterpolators,
	createStackNavigator,
	HeaderStyleInterpolators,
} from '@react-navigation/stack'
import { ExploreFilterTabParamList, HomeTabNavigatorParamList } from '@types'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box } from 'native-base'
import { VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

const ScreenStack = createStackNavigator<ExploreFilterTabParamList>()
export type ExploreFilterTabSearchResultRouteProp = RouteProp<
	HomeTabNavigatorParamList,
	'ExploreStack'
>

function ExploreStack() {
	const navigation = useNavigation()
	const route = useRoute()
	const colorScheme = useThemeColorScheme()

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
					headerStyleInterpolator: HeaderStyleInterpolators.forFade,
					cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
					header: () => {
						return (
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
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
										navigation.dispatch(
											StackActions.push('HomeTabNavigator', {
												screen: 'ExploreStack',
												params: {
													screen: 'SearchTextScreen',
												},
											}),
										)
									}
								/>
							</VStack>
						)
					},
				}}
			/>
			<ScreenStack.Screen
				name='SearchTextScreen'
				options={{
					headerStyleInterpolator: HeaderStyleInterpolators.forFade,
					cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
					headerTransparent: true,
					header: () => {
						return (
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
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
				component={SearchTextScreen}
			/>

			<ScreenStack.Screen
				name='SearchResultTabStack'
				component={SearchFilterTabStack}
				options={{
					headerTransparent: true,
					gestureResponseDistance: 1000,
					headerStyleInterpolator: HeaderStyleInterpolators.forFade,
					cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
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
		</ScreenStack.Navigator>
	)
}

export default ExploreStack
