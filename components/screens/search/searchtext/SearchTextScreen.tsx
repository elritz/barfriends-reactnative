import { useReactiveVar } from '@apollo/client'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import {
	ExploreResponse,
	Personal,
	Profile,
	Venue,
	useExploreSearchLazyQuery,
	useExploreSearchQuery,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
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
import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type HItem = {
	search: string
}

type SearchItem = {
	search: string
}

const SearchTextScreen = () => {
	const params = useSearchParams()
	const insets = useSafeAreaInsets()
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onCompleted: data => {},
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
			<Box px={3}>
				<FlashList
					scrollEnabled={false}
					automaticallyAdjustContentInsets
					automaticallyAdjustKeyboardInsets
					automaticallyAdjustsScrollIndicatorInsets
					contentInsetAdjustmentBehavior='automatic'
					keyboardDismissMode='on-drag'
					data={[...Array(20)]}
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
					estimatedItemSize={80}
					keyExtractor={(item, index) => {
						return (`key` + item).toString()
					}}
					contentInset={{
						top: insets.top + 10,
						bottom:
							insets.bottom !== 0
								? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
								: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
					}}
					renderItem={({ index, item }) => {
						return (
							<HStack px={2} h={'60px'} w='90%'>
								<Skeleton
									h='40px'
									w={'40px'}
									borderRadius={'md'}
									speed={0.95}
									_light={{
										startColor: 'coolGray.100',
										endColor: 'coolGray.300',
									}}
									_dark={{
										startColor: 'dark.200',
										endColor: 'dark.300',
									}}
								/>
								<Skeleton.Text px='4' lines={2} />
							</HStack>
						)
					}}
				/>
			</Box>
		)
	}

	if (!params?.searchtext?.length) {
		return (
			<FlashList
				scrollEnabled={true}
				automaticallyAdjustContentInsets
				automaticallyAdjustsScrollIndicatorInsets
				contentInsetAdjustmentBehavior='automatic'
				keyboardDismissMode='on-drag'
				data={filteredRecentSearches as HItem[]}
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
				estimatedItemSize={80}
				keyExtractor={(item, index) => {
					return (`key` + item).toString()
				}}
				contentInset={{
					top: insets.top + 10,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				automaticallyAdjustKeyboardInsets
				renderItem={({ index, item }) => {
					return (
						<Pressable
							onPress={() => {
								router.setParams({
									searchtext: item.search,
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
				}}
			/>
		)
	}

	return (
		<Box bg={'red.200'} safeAreaTop flex={1}>
			<FlashList
				data={[
					{ title: 'Accounts', data: data?.exploreSearch.people },
					{ title: 'Venues', data: data?.exploreSearch.venues },
				]}
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
				estimatedItemSize={80}
				keyExtractor={(item, index) => {
					return (`key` + item.title).toString()
				}}
				contentInset={{
					top: insets.top,
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				automaticallyAdjustKeyboardInsets
				automaticallyAdjustContentInsets
				keyboardDismissMode='on-drag'
				renderItem={({ index, item }) => {
					console.log('🚀 ~ file: SearchTextScreen.tsx:265 ~ SearchTextScreen ~ item:', item)
					return (
						<Box>
							{item.data && item.data.length ? (
								<Box my={1}>
									<Heading mx={3}>{item.title}</Heading>
									{item.data.map((item, index) => {
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

export default SearchTextScreen
