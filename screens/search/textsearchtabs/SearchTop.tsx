import SearchCard from '../components/SearchCard'
import { useRouter, useSearchParams } from 'expo-router'
import { Box, ScrollView, Text } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(SearchPage) finish the searching ability on this page using route prop from params

export default function SearchTop() {
	const router = useRouter()
	const params = useSearchParams()

	console.log('🚀 ~ file: SearchTop.tsx:12 ~ SearchTop ~ params:', params.searchtext)

	const insets = useSafeAreaInsets()
	// if (params?.data?.people?.length && params?.data?.venues?.length) {
	// return (
	// 	<Box
	// 		style={{
	// 			backgroundColor: '#ff4081',
	// 			marginBottom:
	// 				insets.bottom !== 0
	// 					? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
	// 					: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	// 		}}
	// 	>
	// 		<Center>
	// 			<Heading>No search results</Heading>
	// 		</Center>
	// 	</Box>
	// )
	// }

	return (
		<Box style={{ flex: 1 }}>
			<ScrollView>
				{/* {params?.data?.people?.map(item => {
					return <SearchCard item={item} />
				})} */}
				<Text>HELLO THis is the scroll view for the search</Text>
				<Text>{params.searchtext}</Text>
			</ScrollView>
		</Box>
	)
}
