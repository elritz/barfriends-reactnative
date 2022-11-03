import SearchFilterTabStack from '../../searchfiltertabstack/SearchFilterTabStack'
import { useReactiveVar } from '@apollo/client'
import SearchTopTabStackInput from '@components/molecules/search/SearchTopTabStackInput'
import SearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import ExploreSearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import ExploreScreen from '@navigation/screens/hometabs/explore/ExploreScreen'
import SearchTextScreen from '@navigation/screens/search/searchtext/SearchTextScreen'
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import {
	createStackNavigator,
	HeaderStyleInterpolators,
	TransitionPresets,
	TransitionSpecs,
} from '@react-navigation/stack'
import { ThemeReactiveVar } from '@reactive'
import { ExploreFilterTabParamList, HomeTabNavigatorParamList } from '@types'
import { BlurView } from 'expo-blur'
import { Box } from 'native-base'
import { VStack } from 'native-base'
import { Platform, StyleSheet, Animated } from 'react-native'

const ScreenStack = createStackNavigator<ExploreFilterTabParamList>()
export type ExploreFilterTabSearchResultRouteProp = RouteProp<
	HomeTabNavigatorParamList,
	'ExploreStack'
>

function ExploreStack() {
	const navigation = useNavigation()

	const theme = useReactiveVar(ThemeReactiveVar)

	type InputTypeProps = {
		disabled: boolean
	}
	const Input = ({ disabled }: InputTypeProps) => {
		return (
			<VStack height={105} justifyContent={'flex-end'} pb={2}>
				{Platform.OS !== 'ios' ? (
					<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
				) : (
					<Box background={'secondary.100'} style={[StyleSheet.absoluteFill]} />
				)}
				{disabled ? (
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
				) : (
					<SearchTextScreenInput />
				)}
			</VStack>
		)
	}

	return (
		<ScreenStack.Navigator screenOptions={{}}>
			<ScreenStack.Screen
				name='ExploreScreen'
				options={{
					headerShown: true,
					headerTransparent: true,
					gestureResponseDistance: 240,
					gestureDirection: 'horizontal',
					header: () => {
						return (
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
								) : (
									<Box style={[StyleSheet.absoluteFill]} />
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
				component={ExploreScreen}
			/>
			<ScreenStack.Screen
				name='SearchTextScreen'
				options={{
					header: () => {
						return (
							<VStack height={105} justifyContent={'flex-end'} pb={2}>
								{Platform.OS !== 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={theme} intensity={80} />
								) : (
									<Box background={'secondary.100'} style={[StyleSheet.absoluteFill]} />
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
					header: () => {
						return (
							<Box
								style={{
									flexDirection: 'column-reverse',
								}}
							>
								<Box style={[StyleSheet.absoluteFill]} />
								<SearchTopTabStackInput />
							</Box>
						)
					},
					// transitionSpec: {
					// 	open: {
					// 		animation: 'timing',
					// 		config: {
					// 			duration: 0,
					// 		},
					// 	},
					// 	close: {
					// 		animation: 'timing',
					// 		config: {
					// 			duration: 150,
					// 		},
					// 	},
					// },
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default ExploreStack
