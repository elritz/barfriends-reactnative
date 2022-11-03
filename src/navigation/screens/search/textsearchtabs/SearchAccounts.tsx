import { ExploreFilterTabSearchResultRouteProp } from '@components/molecules/search/SearchTopTabStackInput'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SearchResultTabStackParamList } from '@types'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export type SearchResultTabStackRouteProp = RouteProp<SearchResultTabStackParamList, 'TopScreen'>

export default function SearchAccounts() {
	const route = useRoute<SearchResultTabStackRouteProp>()
	const searchText = route.params.searchText

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
