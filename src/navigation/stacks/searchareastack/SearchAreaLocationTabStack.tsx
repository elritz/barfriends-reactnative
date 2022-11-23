import { useReactiveVar } from '@apollo/client'
import SearchAreaCountries from '@navigation/screens/search/searcharea/SearchAreaCountries'
import SearchAreaCountryStates from '@navigation/screens/search/searcharea/SearchAreaCountryStates'
import SearchAreaStateCities from '@navigation/screens/search/searcharea/SearchAreaStateCities'
import SearchAccounts from '@navigation/screens/search/textsearchtabs/SearchAccounts'
import SearchTop from '@navigation/screens/search/textsearchtabs/SearchTop'
import SearchVenues from '@navigation/screens/search/textsearchtabs/SearchVenues'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { SearchAreaReactiveVar } from '@reactive'
import {
	ExploreFilterTabParamList,
	SearchAreaLocationStackModalParamList,
	SearchAreaStackParamList,
} from '@types'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createMaterialTopTabNavigator<SearchAreaLocationStackModalParamList>()

interface IColor {
	color: string
}
export type SearchAreaLocationTabStackRouteProp = RouteProp<
	SearchAreaStackParamList,
	'SearchAreaLocationTabStackModal'
>

function SearchAreaLocationTabStack() {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rSearchArea = useReactiveVar(SearchAreaReactiveVar)
	const route = useRoute<SearchAreaLocationTabStackRouteProp>()

	return (
		<ScreenStack.Navigator
			tabBarPosition='top'
			screenOptions={{
				tabBarStyle: {
					backgroundColor: 'themeContext.palette.primary.background.default',
				},
				tabBarShowLabel: true,
				tabBarContentContainerStyle: {
					height: 40,
					alignItems: 'center',
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
				name='SearchCountryTextScreen'
				component={SearchAreaCountries}
				options={{
					tabBarLabel: 'Country',
				}}
				initialParams={{
					searchText: '',
				}}
			/>
			<ScreenStack.Screen
				name='SearchCountryStatesTextScreen'
				component={SearchAreaCountryStates}
				options={{
					tabBarLabel: 'States',
				}}
				initialParams={{
					country: rSearchArea.country || '',
				}}
			/>
			<ScreenStack.Screen
				name='SearchStateCitiesTextScreen'
				component={SearchAreaStateCities}
				options={{
					tabBarLabel: 'Cities',
				}}
				initialParams={{
					state: '',
					country: '',
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default SearchAreaLocationTabStack
