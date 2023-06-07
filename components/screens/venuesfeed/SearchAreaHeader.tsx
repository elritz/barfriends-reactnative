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
			{({ isHovered, isFocused, isPressed }) => {
				return (
					<HStack
						py={4}
						px={2}
						rounded={'xl'}
						_dark={{
							bg: isPressed ? '#00000040' : 'transparent',
						}}
						_light={{
							bg: isPressed ? '#A1A1A140' : 'transparent',
						}}
						flex={1}
						mx={2}
						alignItems={'flex-end'}
						justifyContent={'center'}
					>
						<VStack flex={1} space={1}>
							<HStack alignItems={'center'} justifyContent={'space-between'} space={2}>
								<HStack alignItems={'center'} space={2}>
									<Heading lineHeight={'lg'} fontWeight={'black'} fontSize={'3xl'}>
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
								<Text fontSize={'lg'} textAlign={'center'}>
									No venues, hamma the notification bell and we will let you know when it gets added.
									Upvoting is huge, it lets us know where to go!
								</Text>
							)}
						</VStack>
					</HStack>
				)
			}}
		</Pressable>
	)
}
