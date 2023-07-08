import { useReactiveVar } from '@apollo/client'
import { Box, Heading, VStack } from '@components/core'
import { useGetInterestsQuery } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import useRandomNumber from '@util/hooks/useRandomNumber'
import { Skeleton } from 'native-base'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default () => {
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [selectedTags, setSelectedTags] = useState<Array<String>>([])

	const { data, loading, error } = useGetInterestsQuery()

	useEffect(() => {
		const tagids = rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.map(
			item => item.id,
		)
		if (tagids && tagids.length) {
			setSelectedTags([...tagids])
		}
	}, [])

	if (loading) {
		return (
			<Box bg='$transparent' flex={1} mt={'$4'}>
				<FlashList
					numColumns={1}
					scrollEnabled={false}
					keyExtractor={(item, index) => index.toString()}
					estimatedItemSize={35}
					data={[...Array(6)]}
					showsVerticalScrollIndicator={false}
					renderItem={() => {
						const randWidth = useRandomNumber(100, 240)
						const randInterests = useRandomNumber(5, 15)
						return (
							<VStack m={'$2'}>
								<Skeleton
									h={'35px'}
									mb={2}
									minW={`${randWidth}px`}
									maxW={`${randWidth}px`}
									rounded={'md'}
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
								<VStack flexWrap={'wrap'} flexDirection={'row'}>
									{[...Array(randInterests)].map(item => {
										const randWidth = useRandomNumber(40, 100)
										return (
											<Skeleton
												h={'35'}
												flex={1}
												minW={`${randWidth}px`}
												mr={1}
												my={1}
												rounded={'md'}
												style={{
													alignSelf: 'center',
													overflow: 'hidden',
												}}
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
									})}
								</VStack>
							</VStack>
						)
					}}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				/>
			</Box>
		)
	}

	return (
		<Box flex={1} mx={2} mt={4}>
			<FlashList
				scrollEnabled
				data={data?.getInterests}
				estimatedItemSize={400}
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				extraData={selectedTags}
				renderItem={({ item, index }) => {
					return (
						<VStack space={2} key={item.id}>
							<Heading>{item.name}</Heading>
							<Stack flex={1} flexDir={'row'} flexWrap={'wrap'} space={2}>
								{item.Tags.map((tag, index) => {
									return (
										<Pressable
											onPress={() => {
												if (selectedTags.some(e => e === tag.id)) {
													setSelectedTags(prev => {
														return [...prev.filter((tagid, i) => tagid !== tag.id)]
													})
												} else {
													setSelectedTags(oldArray => [...oldArray, tag.id])
												}
											}}
										>
											<Badge
												borderRadius={'lg'}
												_light={{
													bg:
														selectedTags.some(e => e === tag.id) ||
														rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.some(
															e => e.id === item.id,
														)
															? 'primary.400'
															: 'light.200',
												}}
												_dark={{
													bg:
														selectedTags.some(e => e === tag.id) ||
														rAuthorizationVar?.DeviceProfile?.Profile?.DetailInformation?.Tags.some(
															e => e.id === item.id,
														)
															? 'primary.400'
															: 'dark.500',
												}}
												_text={{
													fontWeight: '400',
													fontSize: 'md',
												}}
												px={3}
												py={2}
												mr={2}
												my={2}
												startIcon={<Text>{tag.emoji}</Text>}
											>
												{tag.name}
											</Badge>
										</Pressable>
									)
								})}
							</Stack>
						</VStack>
					)
				}}
			/>
		</Box>
	)
}
