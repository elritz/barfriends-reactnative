import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { HStack, VStack, Heading, IconButton, Icon } from 'native-base'

export default function SearchAreaHeader({ city }) {
	const router = useRouter()
	return (
		<HStack flex={1} mx={2} justifyContent={'center'}>
			<VStack flex={1} space={1} m={2}>
				<Heading lineHeight={'sm'} fontWeight={'medium'} fontSize={'lg'}>
					from
				</Heading>
				<Heading lineHeight={'xs'} fontWeight={'black'} fontSize={'4xl'}>
					{city}
				</Heading>
			</VStack>
			<IconButton
				icon={<Icon as={FontAwesome5} name='filter' />}
				onPress={() =>
					router.push({
						pathname: '(app)/searcharea',
					})
				}
				rounded={'full'}
			/>
		</HStack>
	)
}
