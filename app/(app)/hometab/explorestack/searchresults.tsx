import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Box, ScrollView, Text } from 'native-base'
import { useContext, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { ThemeContext } from 'styled-components/native'

const FirstRoute = () => {
	return (
		<Box bg={'#fffaaa'}>
			<ScrollView flex={1} h={'100%'}>
				{[...Array(20)].map((item, index) => {
					return (
						<Box key={index} bg={'blue.50'} height={50}>
							<Text>{index}</Text>
						</Box>
					)
				})}
			</ScrollView>
		</Box>
	)
}

const SecondRoute = () => (
	<View style={{ flex: 1, backgroundColor: '#673ab7' }}>
		<ScrollView flex={1} h={'100%'}>
			{[...Array(20)].map((item, index) => {
				return (
					<Box key={index} bg={'blue.50'} height={50}>
						<Text>{index}</Text>
					</Box>
				)
			})}
		</ScrollView>
	</View>
)
const ThirdRoute = () => (
	<View style={{ flex: 1, backgroundColor: '#455552' }}>
		<ScrollView flex={1} h={'100%'}>
			{[...Array(20)].map((item, index) => {
				return (
					<Box key={index} bg={'blue.50'} height={50}>
						<Text>{index}</Text>
					</Box>
				)
			})}
		</ScrollView>
	</View>
)

const renderScene = SceneMap({
	first: FirstRoute,
	second: SecondRoute,
	third: ThirdRoute,
})

export default function searchresulttabs() {
	const layout = useWindowDimensions()
	const themeContext = useContext(ThemeContext)
	const { top } = useSafeAreaInsets()

	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'first', title: 'Top' },
		{ key: 'second', title: 'Account' },
		{ key: 'third', title: 'Venues' },
	])

	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: themeContext.palette.primary.color.default }}
			style={{ backgroundColor: themeContext.palette.primary.background.default }}
			renderLabel={({ route, focused, color }) => (
				<Text style={{ color, margin: 8 }}>{route.title}</Text>
			)}
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
