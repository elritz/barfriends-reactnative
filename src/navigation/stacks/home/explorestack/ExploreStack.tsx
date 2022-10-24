import SearchFilterTabStack from '../../searchfiltertabstack/SearchFilterTabStack'
import { useReactiveVar } from '@apollo/client'
import SearchTopTabStackInput from '@components/molecules/search/SearchTopTabStackInput'
import SearchInputDisabled from '@components/molecules/search/explore/ExploreSearchInputDisabled'
import SearchTextScreenInput from '@components/molecules/search/searchtext/SearchTextScreenInput'
import ExploreScreen from '@navigation/screens/hometabs/explore/ExploreScreen'
import SearchTextScreen from '@navigation/screens/search/searchtext/SearchTextScreen'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeReactiveVar } from '@reactive'
import { ExploreFilterTabParamList } from '@types'
import { BlurView } from 'expo-blur'
import { useContext } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<ExploreFilterTabParamList>()

function ExploreStack() {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const theme = useReactiveVar(ThemeReactiveVar)
	const insets = useSafeAreaInsets()
	const handleNavigationToExploreSearchText = () => {
		navigation.navigate('HomeTabNavigator', {
			screen: 'ExploreStack',
			params: {
				screen: 'SearchTextScreen',
			},
		})
	}

	const route: any = useRoute()
	return (
		<ScreenStack.Navigator>
			<ScreenStack.Screen
				name='ExploreScreen'
				component={ExploreScreen}
				options={{
					header: () => {
						return (
							<View
								style={{
									position: 'absolute',
									paddingTop: insets.top,
									flexDirection: 'column-reverse',
								}}
							>
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
								<SearchInputDisabled onPress={handleNavigationToExploreSearchText} />
							</View>
						)
					},
				}}
			/>
			<ScreenStack.Screen
				name='SearchTextScreen'
				component={SearchTextScreen}
				options={{
					header: () => {
						return (
							<View
								style={{
									paddingTop: insets.top,
									flexDirection: 'column-reverse',
								}}
							>
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
								<SearchTextScreenInput />
							</View>
						)
					},
					transitionSpec: {
						open: {
							animation: 'timing',
							config: {
								duration: 0,
							},
						},
						close: {
							animation: 'timing',
							config: {
								duration: 150,
							},
						},
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
							<View
								style={{
									paddingTop: insets.top,
									flexDirection: 'column-reverse',
								}}
							>
								<View
									style={[
										StyleSheet.absoluteFill,
										{ backgroundColor: themeContext.palette.primary.background },
									]}
								/>
								<SearchTopTabStackInput />
							</View>
						)
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default ExploreStack
