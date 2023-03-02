import SearchCard from '../components/SearchCard'
import { SearchTextScreenRouteProp } from '@components/molecules/search/searchtext/SearchTextScreenInput'
import { useRoute } from '@react-navigation/native'
import { Box, ScrollView, Text, Center } from 'native-base'

const SearchTextScreen = () => {
	const route = useRoute<SearchTextScreenRouteProp>()
	const params = route.params

	if (!params?.data?.venues?.length && !params?.data?.people?.length) {
		return (
			<Box flex={1} background={'red'}>
				<Center>
					<Text>RECENT SESRCHES</Text>
				</Center>
			</Box>
		)
	}

	return (
		<Box safeAreaTop flex={1}>
			<ScrollView
				contentInset={{ top: 60 }}
				automaticallyAdjustKeyboardInsets
				keyboardDismissMode='on-drag'
			>
				{params?.data?.people?.map(item => {
					return <SearchCard item={item} />
				})}
				{params?.data?.venues?.map(item => {
					return <SearchCard item={item} />
				})}
			</ScrollView>
		</Box>
	)
}

export default SearchTextScreen
