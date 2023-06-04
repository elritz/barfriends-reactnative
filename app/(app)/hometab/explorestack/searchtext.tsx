import { useReactiveVar } from '@apollo/client'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery, useExploreSearchQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
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

export default () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		fetchPolicy: 'cache-first',
		onError: error => {},
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
							<Skeleton
								speed={0.95}
								_light={{
									startColor: 'coolGray.100',
									endColor: 'coolGray.300',
								}}
								_dark={{
									startColor: 'dark.200',
									endColor: 'dark.300',
								}}
								h='40px'
								w={'40px'}
								borderRadius={'md'}
							/>
							<Skeleton.Text px='4' lines={2} />
						</HStack>
					)
				})}
			</ScrollView>
		)
	}

	type Item = {
		search: string
	}

	const PastSearchItem = (item: Item) => {
		return (
			<Pressable
				onPress={() => {
					router.setParams({
						searchtext: item.search,
					})
					exploreSearchQuery({
						variables: {
							search: item.search,
						},
					})
				}}
			>
				{({ isHovered, isFocused, isPressed }) => {
					return (
						<HStack
							h={'55px'}
							w={'100%'}
							justifyContent={'flex-start'}
							alignItems={'center'}
							space={3}
							_light={{
								bg: isPressed ? 'light.100' : 'transparent',
							}}
							_dark={{
								bg: isPressed ? 'dark.100' : 'transparent',
							}}
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
					)
				}}
			</Pressable>
		)
	}

	if (!params.searchtext?.length) {
		return (
			<FlashList
				data={filteredRecentSearches as Array<Item>}
				renderItem={item => <PastSearchItem search={item.item.search} />}
				scrollEnabled={true}
				estimatedItemSize={55}
				automaticallyAdjustContentInsets
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior='automatic'
				contentInset={{ top: insets.top }}
				keyboardDismissMode='on-drag'
			/>
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
					<Box safeAreaTop>
						<Center>
							<Heading fontSize={'md'} fontWeight={'medium'}>
								No search results for
							</Heading>
							<Heading fontSize={'3xl'}>"{params.searchtext}"</Heading>
						</Center>
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
