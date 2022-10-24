import ShowCaseScroll from './ShowCaseScroll'
import { Box, ScrollView } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

const ExploreScreen = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<ShowCaseScroll />
			</ScrollView>
		</SafeAreaView>
	)
}
export default ExploreScreen
