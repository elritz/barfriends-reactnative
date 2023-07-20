import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, HStack, Heading, Pressable, Text, VStack } from '@components/core'
import SearchCard from '@components/screens/search/components/SearchCard'
import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
} from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { AuthorizationReactiveVar, ThemeReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useContentInsets from '@util/hooks/useContentInsets'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Skeleton } from 'moti/skeleton'
import { useEffect } from 'react'

type Item = {
	search: string
}

export default () => {
	const router = useRouter()
	const params = useLocalSearchParams()
	const contentInsets = useContentInsets()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const rTheme = useReactiveVar(ThemeReactiveVar)

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
				contentInset={{
					...contentInsets,
				}}
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
								height={40}
								width={40}
								radius={15}
								colorMode={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								colors={
									rTheme.colorScheme === 'light'
										? [
												String(rTheme.theme?.gluestack.tokens.colors.light100),
												String(rTheme.theme?.gluestack.tokens.colors.light300),
										  ]
										: [
												String(rTheme.theme?.gluestack.tokens.colors.dark100),
												String(rTheme.theme?.gluestack.tokens.colors.dark300),
										  ]
								}
							/>
							<Skeleton width={'100%'} height={20} />
							<Skeleton width={'100%'} height={20} />
						</HStack>
					)
				}}
			/>
		)
	}

	const PastSearchItem = (item: Item) => {
		return (
			<Pressable
				px={'$2'}
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
				>
					<Button
						sx={{
							w: 35,
							h: 35,
						}}
						variant={'outline'}
						size={'sm'}
						rounded={'$md'}
						// icon={<Icon as={Ionicons} name='ios-search' size={'lg'} />}
					>
						<Button.Icon>
							<Ionicons
								name='ios-search'
								size={20}
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light900
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
							/>
						</Button.Icon>
					</Button>
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
			<>
				<Heading>SEARCHTEXT</Heading>
				<FlashList
					data={filteredRecentSearches as Array<Item>}
					numColumns={1}
					estimatedItemSize={55}
					keyExtractor={(item, index) => index.toString()}
					scrollEnabled={true}
					renderItem={item => <PastSearchItem search={item.item.search} />}
					contentInset={{
						...contentInsets,
					}}
					automaticallyAdjustContentInsets
					automaticallyAdjustsScrollIndicatorInsets
					contentInsetAdjustmentBehavior={'automatic'}
					keyboardDismissMode='on-drag'
				/>
			</>
		)
	}

	return (
		<Box flex={1}>
			<FlashList
				scrollEnabled={true}
				estimatedItemSize={40}
				contentInset={{
					...contentInsets,
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
