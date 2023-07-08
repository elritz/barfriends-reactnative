import SearchCard from '../components/SearchCard'
import { Box, Center, Heading } from '@components/core'
import { useExploreSearchQuery } from '@graphql/generated'
import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import { Skeleton } from 'native-base'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SearchVenues() {
	const params = useLocalSearchParams()
	const insets = useSafeAreaInsets()
	const {
		data,
		loading: ESLoading,
		error,
	} = useExploreSearchQuery({
		fetchPolicy: 'cache-first',
		variables: {
			search: String(params.searchtext),
		},
	})

	if (ESLoading) {
		return (
			<FlashList
				numColumns={1}
				estimatedItemSize={65}
				data={[...Array(15)]}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				contentInset={{
					top: 20,
				}}
				renderItem={({ item }) => {
					return (
						<Skeleton
							h={'65px'}
							w={'95%'}
							rounded={'md'}
							alignSelf={'center'}
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
					)
				}}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
			/>
		)
	}
	if (!data?.exploreSearch.venues.length) {
		return (
			<Box mt={insets.top}>
				<Center>
					<Heading fontSize={'$md'} fontWeight={'$medium'}>
						No search results for
					</Heading>
					<Heading fontSize={'$3xl'}>"{params.searchtext}"</Heading>
				</Center>
			</Box>
		)
	}

	return (
		<Box style={{ flex: 1 }}>
			<FlashList
				data={data?.exploreSearch.venues}
				estimatedItemSize={55}
				keyExtractor={({ id }: { id: string }) => id.toString()}
				renderItem={item => {
					return <SearchCard item={item} />
				}}
			/>
		</Box>
	)
}
