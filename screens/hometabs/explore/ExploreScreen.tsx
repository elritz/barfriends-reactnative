import ShowCaseScroll from './ShowCaseScroll'
import { HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS } from '@constants/ReactNavigationConstants'
import { ProfileType, useProfilesQuery } from '@graphql/generated'
import { useRouter } from 'expo-router'
import { Box, FlatList, Image, Pressable, Text } from 'native-base'
import { View, useWindowDimensions } from 'react-native'

const ExploreScreen = () => {
	const { width } = useWindowDimensions()
	const router = useRouter()
	const numColumns = 2 // 2.5 if numColumns from flatlist is 3
	const height = width * (1.25 / numColumns)
	const { data, loading, error } = useProfilesQuery({
		variables: {
			where: {
				ProfileType: {
					equals: ProfileType.Personal,
				},
			},
			take: 20,
		},
		onCompleted: data => {
			console.log('data EXPLORE SCREEN ====?', JSON.stringify(data.profiles.length, null, 4))
		},
	})

	return (
		<Box style={{ flex: 1 }}>
			<FlatList
				data={loading ? [] : data?.profiles}
				ListHeaderComponent={() => {
					return <ShowCaseScroll />
				}}
				contentInset={{
					bottom: HOME_TAB_BOTTOM_NAVIGATION_HEIGHT_WITH_INSETS,
				}}
				numColumns={2}
				renderItem={item => {
					return (
						<>
							{loading ? null : (
								<Pressable
									maxW={'1/2'}
									flexGrow={1}
									mx={1}
									my={2}
									flex={1}
									alignSelf={''}
									onPress={() => {
										router.push({
											pathname: `(app)/public/personal/${item.item.id}`,
											params: {
												profileid: item.item.id,
											},
										})
									}}
								>
									<Image
										source={{ uri: item.item.photos[0].url }}
										alt={'User image'}
										borderRadius={'xl'}
										style={{
											width: '100%',
											height,
											borderWidth: 3,
											borderColor: 'white',
										}}
									/>
									<View
										style={{
											width: '100%',
											justifyContent: 'flex-start',
										}}
									>
										<Text textTransform={'capitalize'} fontSize={'sm'}>
											{item.item.IdentifiableInformation?.fullname}
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
export default ExploreScreen
