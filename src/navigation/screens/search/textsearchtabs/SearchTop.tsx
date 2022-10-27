import { ExploreFilterTabSearchResultRouteProp } from '@components/molecules/search/SearchTopTabStackInput'
import { useRoute } from '@react-navigation/native'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(SearchPage) finish the searching ability on this page using route prop from params

export default function SearchTop() {
	const route = useRoute<ExploreFilterTabSearchResultRouteProp>()
	const routeParams = route.params

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{routeParams.params.searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
