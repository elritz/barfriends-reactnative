import { TOP_SEARCH_INPUT_HEIGHT } from '@constants/ReactNavigationConstants'
import { ExploreFilterTabParamList, SearchResultTabStackParamList } from '@ctypes/app'
import SearchAccounts from '@navigation/screens/search/textsearchtabs/SearchAccounts'
import SearchTop from '@navigation/screens/search/textsearchtabs/SearchTop'
import SearchVenues from '@navigation/screens/search/textsearchtabs/SearchVenues'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<SearchResultTabStackParamList>()

interface IColor {
	color: string
}
export type SearchFilterTabStackRouteProp = RouteProp<
	ExploreFilterTabParamList,
	'SearchResultTabStack'
>

function SearchFilterTabStack() {
	const themeContext = useContext(ThemeContext)
	const route = useRoute<SearchFilterTabStackRouteProp>()
	const insets = useSafeAreaInsets()

	return (
		<ScreenStack.Navigator
			tabBarPosition='top'
			screenOptions={{
				tabBarStyle: {
					backgroundColor: 'themeContext.palette.primary.background.default',
					marginTop: insets.top + TOP_SEARCH_INPUT_HEIGHT,
				},
				tabBarShowLabel: true,
				tabBarContentContainerStyle: {
					alignItems: 'center',
				},
				tabBarIconStyle: {
					height: 20,
				},
				tabBarIndicatorStyle: {
					backgroundColor: themeContext.palette.company.accent,
					bottom: -2,
					borderBottomWidth: 3,
					borderRadius: 0,
				},
				tabBarLabelStyle: {
					fontSize: 15,
					fontWeight: '500',
					textTransform: 'capitalize',
				},
			}}
		>
			<ScreenStack.Screen
				name='TopScreen'
				component={SearchTop}
				options={{
					tabBarLabel: 'Top',
				}}
				initialParams={{
					searchText: route.params?.params?.searchText,
					data: route.params?.params?.data,
				}}
			/>
			<ScreenStack.Screen
				name='VenueScreen'
				component={SearchVenues}
				options={{
					tabBarLabel: 'Venues',
				}}
				initialParams={{
					searchText: route.params?.params?.searchText,
					data: route.params?.params?.data,
				}}
			/>
			<ScreenStack.Screen
				name='UserScreen'
				component={SearchAccounts}
				options={{
					tabBarLabel: 'Accounts',
				}}
				initialParams={{
					searchText: route.params?.params?.searchText,
					data: route.params?.params?.data,
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default SearchFilterTabStack
