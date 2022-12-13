import SearchCard from '../components/SearchCard'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SearchResultTabStackParamList } from '@types'
import { Box, Center, Heading, ScrollView } from 'native-base'

export type SearchResultTabStackRouteProp = RouteProp<SearchResultTabStackParamList, 'UserScreen'>

export default function SearchAccounts() {
	const { params } = useRoute<SearchResultTabStackRouteProp>()

	if (!params?.data?.people?.length) {
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
				{params?.data?.people?.map(item => {
					console.log('========>', item)
					return <SearchCard item={item} />
				})}
			</ScrollView>
		</Box>
	)
}
