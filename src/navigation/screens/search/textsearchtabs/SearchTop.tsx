import SearchCard from '../components/SearchCard'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SearchResultTabStackParamList } from '@types'
import { Box, Center, Heading, ScrollView } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(SearchPage) finish the searching ability on this page using route prop from params
export type SearchTopTabStackRouteProp = RouteProp<SearchResultTabStackParamList, 'TopScreen'>

export default function SearchTop() {
	const { params } = useRoute<SearchTopTabStackRouteProp>()
	if (params?.data?.people?.length && params?.data?.venues?.length) return null
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
