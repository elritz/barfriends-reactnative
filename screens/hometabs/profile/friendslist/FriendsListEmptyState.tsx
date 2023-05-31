import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Heading, Button, Icon, Text, Box } from 'native-base'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	console.log('permissionContactsVar :>> ', permissionContactsVar)
	return (
		<Box
			my={5}
			h={'250px'}
			justifyContent={'center'}
			alignItems={'center'}
			borderRadius={'md'}
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.50',
			}}
		>
			<Text fontSize={'md'} fontWeight={'bold'}>
				No barfriends
			</Text>
			<Heading w={'85%'} fontSize={'2xl'} style={{ textAlign: 'center' }}>
				Find your friends below
			</Heading>
			<Button
				// variant={'link'}
				_text={{
					fontSize: 'lg',
				}}
				size={'xs'}
				w={'55%'}
				my={3}
				borderRadius={'md'}
				leftIcon={<Icon as={Ionicons} name='search' size={'md'} />}
				onPress={() => {
					router.push({
						pathname: '(app)/hometab/explorestack/searchtext',
						params: {
							searchtext: '',
						},
					})
				}}
			>
				Search
			</Button>
			<Button
				variant={'link'}
				_text={{
					fontSize: 'lg',
				}}
				size={'xs'}
				w={'55%'}
				my={2}
				borderRadius={'md'}
				onPress={() =>
					router.push({
						pathname: '(app)/permission/contacts',
					})
				}
			>
				{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}
			</Button>
		</Box>
	)
}
