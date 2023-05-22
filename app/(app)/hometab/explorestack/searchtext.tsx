import { useReactiveVar } from '@apollo/client'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery, useExploreSearchQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import SearchCard from '@screens/search/components/SearchCard'
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
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
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
		onError: error => {
			console.log('error :>> ', error)
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
			<ScrollView
				scrollEnabled={true}
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
			>
				{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length ? (
					<Box h={150} alignItems={'center'} justifyContent={'center'}>
						<Heading>No search results!</Heading>
					</Box>
				) : (
					<>
						{data?.exploreSearch.people.length && (
							<>
								<Heading mx={2}>Users</Heading>
								{data?.exploreSearch.people?.map((item, index) => {
									return <SearchCard key={index} item={item} />
								})}
							</>
						)}
						{data?.exploreSearch.venues.length && (
							<>
								<Heading mx={2}>Venues</Heading>
								{data?.exploreSearch.venues?.map((item, index) => {
									return <SearchCard key={index} item={item} />
								})}
							</>
						)}
					</>
				)}
			</ScrollView>
		</Box>
	)
}
