import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Skeleton } from 'native-base'
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Item = {
	search: string
}

export default () => {
	const router = useRouter()
	const params = useLocalSearchParams()
	const insets = useSafeAreaInsets()
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
						<HStack
							px={'$5'}
							sx={{
								h: 60,
								w: '90%',
							}}
						>
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
					sx={{
						w: '100%',
						h: 55,
					}}
					justifyContent={'flex-start'}
					alignItems={'center'}
					space={'md'}
					px={'$2'}
				>
					<Button
						variant={'outline'}
						size={'sm'}
						rounded={'$md'}
						// icon={<Icon as={Ionicons} name='ios-search' size={'lg'} />}
					/>
					<VStack>
						<Text fontSize={'$md'} fontWeight={'$medium'}>
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
		<Box flex={1}>
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
								<Box bg='$transparent'>
									<Center>
										<Heading fontSize={'$md'} fontWeight={'$medium'}>
											No search results for
										</Heading>
										<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
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
						<Box bg={'transparent'}>
							{item.data && item.data.length ? (
								<Box bg={'transparent'}>
									<Heading fontSize={'$lg'} mx={'$2'}>
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
