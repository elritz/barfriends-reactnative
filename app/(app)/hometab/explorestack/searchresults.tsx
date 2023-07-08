import { useReactiveVar } from '@apollo/client'
import { Text } from '@components/core'
import SearchAccounts from '@components/screens/search/textsearchtabs/SearchAccounts'
import SearchVenues from '@components/screens/search/textsearchtabs/SearchVenues'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'
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
	const rTheme = useReactiveVar(ThemeReactiveVar)
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
				backgroundColor: rTheme.theme?.gluestack.tokens.colors.primary500,
			}}
			style={{
				backgroundColor:
					colorScheme === 'dark'
						? rTheme.theme?.gluestack.tokens.colors.dark50
						: rTheme.theme?.gluestack.tokens.colors.light50,
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
