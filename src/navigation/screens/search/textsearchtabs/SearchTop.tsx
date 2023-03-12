import SearchCard from '../components/SearchCard'
import { SearchResultTabStackParamList } from '@ctypes/app'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Center, Heading, ScrollView } from 'native-base'

// TODO: FN(SearchPage) finish the searching ability on this page using route prop from params
export type SearchTopTabStackRouteProp = RouteProp<SearchResultTabStackParamList, 'TopScreen'>

export default function SearchTop() {
	const { params } = useRoute<SearchTopTabStackRouteProp>()

	if (params?.data?.people?.length && params?.data?.venues?.length) {
		return (
			<Box safeAreaTop>
				<Center>
					<Heading>No search results</Heading>
				</Center>
			</Box>
		)
	}

	return (
		<Box style={{ flex: 1 }}>
			<ScrollView>
				{params?.data?.people.map(item => {
					return <SearchCard item={item} />
				})}
			</ScrollView>
		</Box>
	)
}
