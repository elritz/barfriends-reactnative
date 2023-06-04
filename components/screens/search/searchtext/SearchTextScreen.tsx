import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import SearchCard from '@components/screens/search/components/SearchCard'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
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
	Pressable,
	Center,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchTextScreen = () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		skip: !params.searchText?.length,
		variables: {
			search: String(params.searchText),
		},
	})

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	const filteredRecentSearches = getUniqueListBy(
		rAuthorizationVar?.DeviceProfile?.Profile?.resentSearches?.searches,
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
						<Pressable
							onPress={() => {
								router.setParams({
									searchText: item.search,
								})
							}}
						>
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
									borderRadius={'md'}
									icon={<Icon as={Ionicons} name='ios-search' size={'lg'} />}
								/>
								<VStack>
									<Text fontSize={'md'} fontWeight={'medium'}>
										{item.search}
									</Text>
								</VStack>
							</HStack>
						</Pressable>
					)
				})}
			</ScrollView>
		)
	}

	return (
		<Box safeAreaTop flex={1}>
			{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length ? (
				<Box safeAreaTop>
					<Center>
						<Heading fontSize={'md'} fontWeight={'medium'}>
							No search results for
						</Heading>
						<Heading fontSize={'3xl'}>"{params.searchtext}"</Heading>
					</Center>
				</Box>
			) : (
				<FlashList
					data={[
						{ title: 'Accounts', data: data.exploreSearch.people },
						{ title: 'Venues', data: data.exploreSearch.venues },
					]}
					keyExtractor={(item, index) => {
						return 'key' + item.title
					}}
					contentInset={{
						top: insets.top + 10,
						bottom:
							insets.bottom !== 0
								? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
								: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					}}
					automaticallyAdjustKeyboardInsets
					automaticallyAdjustContentInsets
					keyboardDismissMode='on-drag'
					renderItem={({ index, item }) => {
						return (
							<Box>
								{item.title && item.data.length > 0 ? (
									<Box my={1}>
										<Heading mx={3}>{item.title}</Heading>
										{item.data?.map(item => {
											return <SearchCard key={index} item={item} />
										})}
									</Box>
								) : null}
							</Box>
						)
					}}
				/>
			)}
		</Box>
	)
}

export default SearchTextScreen
