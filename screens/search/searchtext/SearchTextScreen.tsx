import SearchCard from '../components/SearchCard'
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import {
	Box,
	ScrollView,
	Text,
	Heading,
	IconButton,
	HStack,
	Icon,
	VStack,
	Skeleton,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchTextScreen = () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		skip: !params.searchText?.length,
		variables: {
			search: String(params.searchText),
		},
		onError: error => {
			console.log('error :>> ', error)
		},
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
				contentInset={{ top: insets.top }}
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

	if (!params.searchText?.length) {
		return (
			<ScrollView
				scrollEnabled={true}
				automaticallyAdjustContentInsets
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior='automatic'
				contentInset={{ top: insets.top }}
				flex={1}
				keyboardDismissMode='on-drag'
				px={3}
			>
				{filteredRecentSearches.map((item: any, index) => {
					return (
						<HStack
							h={'55px'}
							w={'100%'}
							justifyContent={'flex-start'}
							alignItems={'center'}
							space={3}
							px={2}
						>
							<IconButton
								variant={'outline'}
								size={'sm'}
								borderRadius={'lg'}
								icon={<Icon as={Ionicons} name='ios-search' size={'lg'} />}
							/>
							<VStack>
								<Text fontSize={'md'} fontWeight={'medium'}>
									{item.search}
								</Text>
							</VStack>
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
