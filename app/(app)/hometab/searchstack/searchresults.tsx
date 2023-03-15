import { TOP_SEARCH_INPUT_HEIGHT, TOP_TAB_BAR_HEIGHT } from '@constants/Layout'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { Box, ScrollView } from 'native-base'
import { useState } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TabView, SceneMap } from 'react-native-tab-view'

const FirstRoute = () => {
	const insets = useSafeAreaInsets()
	return (
		<ScrollView
			style={{
				backgroundColor: '#ff4081',
				marginBottom:
					insets.bottom !== 0
						? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
						: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
			}}
			contentInset={{
				bottom:
					insets.bottom !== 0
						? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
						: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
			}}
		>
			{[...Array(20)].map((item, index) => {
				return (
					<Box key={index} bg={'blue.50'} height={50}>
						{index}
					</Box>
				)
			})}
		</ScrollView>
	)
}

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
})

export default function searchresulttabs() {
	const layout = useWindowDimensions()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'first', title: 'First' },
		{ key: 'second', title: 'Second' },
	])
	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			style={{
				top: TOP_SEARCH_INPUT_HEIGHT + TOP_TAB_BAR_HEIGHT,
			}}
			initialLayout={{ width: layout.width }}
		/>
	)
}
