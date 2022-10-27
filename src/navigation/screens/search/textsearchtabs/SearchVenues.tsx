import { RouteProp, useRoute } from '@react-navigation/native'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchResultTabStackParamList } from 'src/types/app'

export type SearchVenueScreenRouteProp = RouteProp<SearchResultTabStackParamList, 'VenueScreen'>

export default function SearchVenues() {
	const route = useRoute<SearchVenueScreenRouteProp>()
	const params = route.params

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{params.searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
