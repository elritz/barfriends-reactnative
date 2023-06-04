import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import SearchAccounts from '@components/screens/search/textsearchtabs/SearchAccounts'
import SearchTop from '@components/screens/search/textsearchtabs/SearchTop'
import SearchVenues from '@components/screens/search/textsearchtabs/SearchVenues'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Text, useTheme } from 'native-base'
import { useContext, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const renderScene = SceneMap({
	// first: SearchTop,
	second: SearchAccounts,
	third: SearchVenues,
})

export default function searchresulttabs() {
	const layout = useWindowDimensions()
	const { top } = useSafeAreaInsets()
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		// { key: 'first', title: 'Top' },
		{ key: 'second', title: 'Accounts' },
		{ key: 'third', title: 'Venues' },
	])

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{
				backgroundColor: theme.colors.primary[500],
			}}
			style={{
				backgroundColor: colorScheme === 'dark' ? theme.colors.dark[50] : theme.colors.light[50],
			}}
			renderLabel={({ route, focused, color }) => {
				return <Text style={{ margin: 8 }}>{route.title}</Text>
			}}
		/>
	)

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			onIndexChange={setIndex}
			style={{
				top: top + SEARCH_BAR_HEIGHT + 15,
			}}
			initialLayout={{ width: layout.width }}
		/>
	)
}
