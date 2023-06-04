import { useReactiveVar } from '@apollo/client'
import { FontAwesome5 } from '@expo/vector-icons'
import { SearchAreaReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { HStack, VStack, Heading, IconButton, Icon, Pressable, Box, Text } from 'native-base'

export default function SearchAreaHeader({ typename, city }) {
	const router = useRouter()
	const rSearchAreaVar = useReactiveVar(SearchAreaReactiveVar)
	return (
		<Pressable
			onPress={() =>
				router.push({
					pathname: '(app)/searcharea',
				})
			}
		>
			<HStack flex={1} mx={2} alignItems={'flex-end'} justifyContent={'center'}>
				<VStack flex={1} space={1}>
					<HStack alignItems={'center'} justifyContent={'space-between'} space={2}>
						<HStack alignItems={'center'} space={2}>
							<Heading lineHeight={'xs'} fontWeight={'black'} fontSize={'2xl'}>
								{city}
							</Heading>
							{rSearchAreaVar?.useCurrentLocation && (
								<Icon
									size={'sm'}
									as={FontAwesome5}
									rounded={'full'}
									name={'location-arrow'}
									_light={{
										color: 'blue.500',
									}}
									_dark={{
										color: 'blue.500',
									}}
								/>
							)}
						</HStack>
						<Icon as={FontAwesome5} size={'lg'} name='chevron-up' mb={1} />
					</HStack>
					{typename === 'ComingAreaResponse' && (
						<Text fontSize={'md'} textAlign={'center'}>
							No venues? Show support by upvoting or notification requesting so when this area is added to
							Barfriends we can let you know.
						</Text>
					)}
				</VStack>
			</HStack>
		</Pressable>
	)
}
