import SearchCard from '../components/SearchCard'
import { SearchTextScreenRouteProp } from '@components/molecules/search/searchtext/SearchTextScreenInput'
import { useRoute } from '@react-navigation/native'
import { Box, ScrollView, Text, Center } from 'native-base'

const SearchTextScreen = () => {
	const route = useRoute<SearchTextScreenRouteProp>()
	const params = route.params

	console.log(
		'🚀 -------------------------------------------------------------------------------------------------🚀',
	)
	console.log(
		'🚀 ~ file: SearchTextScreen.tsx:11 ~ SearchTextScreen ~ params?.data?.venues',
		params?.data?.venues,
		params?.data?.people,
	)
	console.log(
		'🚀 -------------------------------------------------------------------------------------------------🚀',
	)
	if (!params?.data?.venues?.length && !params?.data?.people?.length) {
		return (
			<Box flex={1} background={'red'}>
				<Center>
					<Text>RECENT SESRCHES</Text>
				</Center>
			</Box>
		)
	}

	return (
		<Box safeAreaTop flex={1}>
			<ScrollView
				contentInset={{ top: 60 }}
				automaticallyAdjustKeyboardInsets
				keyboardDismissMode='on-drag'
			>
				{params?.data?.people?.map(item => {
					console.log('========>', item)
					return <SearchCard item={item} />
				})}
				{params?.data?.venues?.map(item => {
					return <SearchCard item={item} />
				})}
			</ScrollView>
		</Box>
	)
}

export default SearchTextScreen
