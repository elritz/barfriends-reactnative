import SearchCard from '../components/SearchCard'
import { useReactiveVar } from '@apollo/client'
import { SearchTextScreenRouteProp } from '@components/molecules/search/searchtext/SearchTextScreenInput'
import { TOP_SEARCH_INPUT_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import {
	Box,
	ScrollView,
	Text,
	Heading,
	HStack,
	Icon,
	IconButton,
	Skeleton,
	VStack,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchTextScreen = () => {
	const route = useRoute<SearchTextScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const insets = useSafeAreaInsets()

	const { data, loading, error } = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		skip: !route.params.searchText?.length,
		variables: {
			search: String(route.params.searchText),
		},
		onError: error => {
			console.log('error :>> ', error)
		},
		onCompleted: data => {},
	})

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	const filteredRecentSearches = getUniqueListBy(
		rAuthorizationVar?.DeviceProfile?.Profile.resentSearches?.searches,
		'search',
	)

	if (loading) {
		return (
			<ScrollView
				scrollEnabled={false}
				contentInset={{ top: insets.top + TOP_SEARCH_INPUT_HEIGHT }}
				keyboardDismissMode='on-drag'
				automaticallyAdjustKeyboardInsets
				px={3}
			>
				{[...Array(20)].map(() => {
					return (
						<HStack px={2} h={'60px'} w='90%'>
							<Skeleton h='40px' w={'40px'} borderRadius={'md'} />
							<Skeleton.Text px='4' lines={2} />
						</HStack>
					)
				})}
			</ScrollView>
		)
	}

	if (!route.params.searchText?.length) {
		return (
			<ScrollView
				scrollEnabled={true}
				contentInset={{
					top: insets.top + TOP_SEARCH_INPUT_HEIGHT,
				}}
				flex={1}
				keyboardDismissMode='on-drag'
				px={3}
			>
				<Heading size={'sm'} my={4}>
					Recent
				</Heading>
				{filteredRecentSearches.map((item: any, index) => {
					return (
						<HStack
							h={'55px'}
							w={'100%'}
							justifyContent={'space-between'}
							alignItems={'center'}
							space={3}
							px={2}
						>
							<HStack alignItems={'center'} space={3}>
								<IconButton
									variant={'outline'}
									size={'sm'}
									borderRadius={'lg'}
									borderColor={'secondary.700'}
									icon={<Icon as={Ionicons} color={'secondary.700'} name='ios-search' size={'md'} />}
								/>
								<VStack>
									<Text fontSize={'md'} fontWeight={'medium'}>
										{item.search}
									</Text>
								</VStack>
							</HStack>
							{/* <Icon as={Ionicons} color={'secondary.700'} name='close-circle' size={'md'} /> */}
						</HStack>
					)
				})}
			</ScrollView>
		)
	}

	return (
		<Box safeAreaTop flex={1}>
			<ScrollView
				scrollEnabled={true}
				contentInset={{ top: insets.top }}
				automaticallyAdjustKeyboardInsets
				keyboardDismissMode='on-drag'
			>
				{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length ? (
					<Box h={150} alignItems={'center'} justifyContent={'center'}>
						<Heading>No search results!</Heading>
					</Box>
				) : (
					<>
						{data?.exploreSearch.people?.map((item, index) => {
							return <SearchCard key={index} item={item} />
						})}
						{data?.exploreSearch.venues?.map((item, index) => {
							return <SearchCard key={index} item={item} />
						})}
					</>
				)}
			</ScrollView>
		</Box>
	)
}

export default SearchTextScreen
