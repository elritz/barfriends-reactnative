import SearchCard from '../components/SearchCard'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Box, Center, Heading, ScrollView } from 'native-base'
import { SearchResultTabStackParamList } from 'src/types/app'

export type SearchVenueScreenRouteProp = RouteProp<SearchResultTabStackParamList, 'TopScreen'>

export default function SearchVenues() {
	const { params } = useRoute<SearchVenueScreenRouteProp>()

	if (!params?.data?.venues?.length) {
		return (
			<Box safeAreaTop>
				<Center>
					<Heading>No search results</Heading>
				</Center>
			</Box>
		)
	}
	return (
		<Box safeAreaTop style={{ flex: 1 }}>
			<ScrollView>
				{params?.data?.venues?.map(item => {
					return <SearchCard item={item} />
				})}
			</ScrollView>
		</Box>
	)
}
