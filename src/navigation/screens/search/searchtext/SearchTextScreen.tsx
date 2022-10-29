import { SearchTextScreenRouteProp } from '@components/molecules/search/searchtext/SearchTextScreenInput'
import { useRoute } from '@react-navigation/native'
import { Box, Heading } from 'native-base'
import { ScrollView } from 'react-native'

const SearchTextScreen = () => {
	const route = useRoute<SearchTextScreenRouteProp>()

	const params = route.params

	return (
		<Box flex={1} background={'red'}>
			<ScrollView
				keyboardDismissMode='interactive'
				style={{ backgroundColor: 'orange', paddingTop: 90, paddingHorizontal: 10 }}
			>
				<Heading style={{ textAlign: 'center' }}>searchTextScreen</Heading>
				<Heading style={{ textAlign: 'center' }}>{params?.searchText}</Heading>
			</ScrollView>
		</Box>
	)
}

export default SearchTextScreen
