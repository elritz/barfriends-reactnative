// TODO: Create message navigator
import { Heading } from '@components/core'
import { Pressable, Avatar, Text, VStack, Box, HStack, Badge, Container, Image } from 'native-base'

interface HorizontalMessageNotificationProps {
	item: {
		avatar: string
		name: string
		messages: []
		time: string
		badge: number
	}
}

const HorizontalMessageNotification = ({ item }: HorizontalMessageNotificationProps) => {
	return (
		<Box
			flex={1}
			my={1}
			backgroundColor={'transparent'}
			borderBottomWidth={0.25}
			_light={{
				borderBottomColor: 'light.800',
			}}
			_dark={{
				borderBottomColor: 'dark.500',
			}}
			// bg={'red.600'}
		>
			<Pressable
				onPress={() => {
					// router.push({
					// 	pathname: '(app)/permission/medialibrary',
					// })
				}}
				h={'75px'}
			>
				<HStack justifyContent={'space-around'}>
					<HStack flex={1} space={3}>
						<Image
							alt={item.name.slice(0, 1)}
							source={{ uri: item.avatar }}
							rounded={'lg'}
							h={45}
							w={45}
							bg={'transparent'}
						/>
						<Container>
							<VStack>
								<Heading fontSize={'$md'} fontWeight={'600'}>
									{item.name}
								</Heading>
								<Text
									fontSize={'xs'}
									numberOfLines={2}
									textBreakStrategy={'balanced'}
									lineBreakMode={'tail'}
								>
									{item.messages[0].message}
								</Text>
							</VStack>
						</Container>
					</HStack>
					<Badge
						h={30}
						w={30}
						colorScheme='primary'
						rounded='lg'
						zIndex={1}
						variant='solid'
						alignSelf='center'
					>
						{`${item.badge}`}
					</Badge>
				</HStack>
			</Pressable>
		</Box>
	)
}

export default HorizontalMessageNotification
