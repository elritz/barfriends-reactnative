import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { HStack, VStack, Heading, IconButton, Icon, Pressable } from 'native-base'

export default function SearchAreaHeader({ city }) {
	const router = useRouter()
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
					<Heading lineHeight={'sm'} fontWeight={'medium'} fontSize={'lg'}>
						from
					</Heading>
					<HStack alignItems={'center'} space={2}>
						<Heading lineHeight={'xs'} fontWeight={'black'} fontSize={'2xl'}>
							{city}
						</Heading>
						<Icon as={FontAwesome5} size={'md'} name='chevron-up' mb={1} />
					</HStack>
				</VStack>
			</HStack>
		</Pressable>
	)
}
