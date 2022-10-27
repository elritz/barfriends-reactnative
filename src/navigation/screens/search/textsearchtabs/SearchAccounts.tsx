import { ExploreFilterTabSearchResultRouteProp } from '@components/molecules/search/SearchTopTabStackInput'
import { useRoute } from '@react-navigation/native'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchAccounts() {
	const route = useRoute<ExploreFilterTabSearchResultRouteProp>()
	const searchText = route.params.params.searchText

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
