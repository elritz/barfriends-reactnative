import { RouteProp, useRoute } from '@react-navigation/native'
import { SearchResultTabStackParamList } from '@types'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(SearchPage) finish the searching ability on this page using route prop from params
export type SearchResultTabStackRouteProp = RouteProp<SearchResultTabStackParamList, 'TopScreen'>

export default function SearchTop() {
	const route = useRoute<SearchResultTabStackRouteProp>()
	console.log('🚀 ~ file: SearchTop.tsx ~ line 11 ~ SearchTop ~ route', route)

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{route.params.searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
