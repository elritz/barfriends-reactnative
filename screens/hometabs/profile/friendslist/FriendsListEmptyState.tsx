import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Heading, Button, Icon, Text, Box } from 'native-base'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	return (
		<Box
			my={5}
			h={'250px'}
			justifyContent={'center'}
			alignItems={'center'}
			borderRadius={'lg'}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
			}}
		>
			<Text fontSize={'md'} fontWeight={'bold'}>
				No barfriends
			</Text>
			<Heading w={'85%'} fontSize={'2xl'} style={{ textAlign: 'center' }}>
				Use search to find your friends
			</Heading>
			<Button
				// variant={'link'}
				_text={{
					fontSize: 'lg',
				}}
				size={'xs'}
				w={'55%'}
				my={3}
				borderRadius={'lg'}
				leftIcon={<Icon as={Ionicons} name='search' size={'md'} />}
				onPress={() => {
					router.push({
						pathname: '(app)/hometab/expore/explorestack/searchtext',
						params: {
							searchText: '',
						},
					})
				}}
			>
				Search
			</Button>
		</Box>
	)
}
