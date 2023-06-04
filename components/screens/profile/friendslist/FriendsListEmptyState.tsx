import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Heading, Button, Icon, Text, Box, VStack } from 'native-base'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	return (
		<VStack
			space={3}
			my={5}
			py={5}
			justifyContent={'center'}
			alignItems={'center'}
			borderRadius={'md'}
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.100',
			}}
		>
			<Box mb={2} alignItems={'center'}>
				<Text fontSize={'lg'} fontWeight={'bold'}>
					No barfriends
				</Text>
				<Heading fontSize={'2xl'}>Find your friends below</Heading>
			</Box>
			<VStack space={3} w={'full'} alignItems={'center'}>
				<Button
					_text={{
						fontSize: 'lg',
					}}
					size={'xs'}
					px={20}
					borderRadius={'md'}
					onPress={() =>
						router.push({
							pathname: '(app)/permission/contacts',
						})
					}
				>
					{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}
				</Button>
				<Button
					variant={'link'}
					_text={{
						fontSize: 'lg',
					}}
					size={'xs'}
					w={'55%'}
					borderRadius={'md'}
					onPress={() => {
						router.push({
							pathname: '(app)/hometab/explorestack/searchtext',
							params: {
								searchtext: '',
							},
						})
					}}
					leftIcon={<Icon as={Ionicons} name='search' size={'md'} />}
				>
					Search
				</Button>
			</VStack>
		</VStack>
	)
}
