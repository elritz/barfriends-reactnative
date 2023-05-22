import {
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
	HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
} from '@constants/ReactNavigationConstants'
import { ProfileType, useProfilesQuery } from '@graphql/generated'
import ShowCaseScroll from '@screens/hometabs/explore/ShowCaseScroll'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Box, FlatList, Pressable, Text } from 'native-base'
import { View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const { width } = useWindowDimensions()
	const router = useRouter()
	const numColumns = 2 // 2.5 if numColumns from flatlist is 3
	const height = width * (1.25 / numColumns)
	const insets = useSafeAreaInsets()
	const { data, loading, error } = useProfilesQuery({
		variables: {
			where: {
				ProfileType: {
					equals: ProfileType.Personal,
				},
			},
			take: 20,
		},
	})

	return (
		<Box style={{ flex: 1 }}>
			<FlashList
				data={loading ? [] : data?.profiles}
				ListHeaderComponent={() => {
					return <ShowCaseScroll />
				}}
				estimatedItemSize={7}
				contentInset={{
					bottom:
						insets.bottom !== 0
							? HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS
							: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT,
				}}
				numColumns={2}
				renderItem={({ item }) => {
					return (
						<>
							{loading ? null : (
								<Pressable
									// maxW={'1/2'}
									rounded={'md'}
									flexGrow={1}
									mx={1}
									my={2}
									flex={1}
									alignSelf={''}
									onPress={() => {
										router.push({
											pathname: `(app)/public/personal/${item.id}`,
											params: {
												profileid: item.id,
											},
										})
									}}
								>
									{item.photos.length > 0 && (
										<Image
											style={{
												width: '100%',
												height,
												borderWidth: 3,
												borderColor: 'white',
											}}
											source={item.photos[0].url}
											// placeholder={
											// 	item?.photos[0].blurhash ? item.photos[0].blurhash : 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'
											// }
											placeholder={'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
											contentFit='cover'
											transition={1000}
										/>
									)}
									<View
										style={{
											width: '100%',
											justifyContent: 'flex-start',
										}}
									>
										<Text textTransform={'capitalize'} fontSize={'sm'}>
											{item.IdentifiableInformation?.fullname}
										</Text>
									</View>
								</Pressable>
							)}
						</>
					)
				}}
			/>
		</Box>
	)
}
