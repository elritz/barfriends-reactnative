import { useRoute } from '@react-navigation/native'
import { Center, Heading } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchVenues() {
	const route = useRoute()
	const params: any = route.params

	return (
		<SafeAreaView style={{ backgroundColor: 'blue', flex: 1 }}>
			<Center>
				<Heading size={'3xl'}>{params?.searchText}</Heading>
			</Center>
		</SafeAreaView>
	)
}
