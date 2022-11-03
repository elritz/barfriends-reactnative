import ShowCaseScroll from './ShowCaseScroll'
import { Box, ScrollView, View, VStack } from 'native-base'

const ExploreScreen = () => {
	return (
		<Box
			_dark={{ backgroundColor: 'dark.50' }}
			_light={{ backgroundColor: 'light.300' }}
			style={{ flex: 1 }}
		>
			<ScrollView>
				<ShowCaseScroll />
			</ScrollView>
		</Box>
	)
}
export default ExploreScreen
