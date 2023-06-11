import { useReactiveVar } from '@apollo/client'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useSearchParams } from 'expo-router'
import {
	Box,
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
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Item = {
	search: string
}

export default () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		fetchPolicy: 'cache-first',
		onError: error => {},
	})

	useEffect(() => {
		if (params.searchtext?.length) {
			exploreSearchQuery({
				variables: {
					search: String(params.searchtext),
				},
			})
		}
	}, [params.searchtext])

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	const filteredRecentSearches = getUniqueListBy(
		rAuthorizationVar?.DeviceProfile?.Profile?.resentSearches?.searches,
		'search',
	)

	if (loading) {
		return (
			<FlashList
				data={[...Array(20)]}
				numColumns={1}
				estimatedItemSize={60}
				keyExtractor={(item, index) => index.toString()}
				scrollEnabled={false}
				contentInset={{ top: insets.top }}
				keyboardDismissMode='on-drag'
				automaticallyAdjustKeyboardInsets
				renderItem={item => {
					return (
						<HStack px={5} h={'60px'} w='90%'>
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
							<Skeleton.Text px='4' lines={2}></Skeleton.Text>
						</HStack>
					)
				}}
			/>
		)
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
	}

	if (!params?.searchtext?.length) {
		return (
			<FlashList
				data={filteredRecentSearches as Array<Item>}
				numColumns={1}
				estimatedItemSize={55}
				keyExtractor={(item, index) => index.toString()}
				scrollEnabled={true}
				renderItem={item => <PastSearchItem search={item.item.search} />}
				contentInset={{ top: insets.top }}
				automaticallyAdjustContentInsets
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior={'automatic'}
				keyboardDismissMode='on-drag'
			/>
		)
	}

	return (
		<Box safeAreaTop flex={1}>
			<FlashList
				scrollEnabled={true}
				estimatedItemSize={40}
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
				ListHeaderComponent={() => {
					return (
						<>
							{!data?.exploreSearch.venues?.length && !data?.exploreSearch.people?.length && (
								<Box safeAreaTop>
									<Center>
										<Heading fontSize={'md'} fontWeight={'medium'}>
											No search results for
										</Heading>
										<Heading fontSize={'3xl'}>"{params.searchtext}"</Heading>
									</Center>
								</Box>
							)}
						</>
					)
				}}
				data={[
					{ title: 'Accounts', data: data?.exploreSearch.people },
					{ title: 'Venues', data: data?.exploreSearch.venues },
				]}
				renderItem={({ item }) => {
					return (
						<Box>
							{item.data && item.data.length ? (
								<Box>
									<Heading fontSize={'lg'} mx={2}>
										{item.title}
									</Heading>
									{item.data?.map((item, index) => {
										return <SearchCard key={index} item={item} />
									})}
								</Box>
							) : null}
						</Box>
					)
				}}
			/>
		</Box>
	)
}
