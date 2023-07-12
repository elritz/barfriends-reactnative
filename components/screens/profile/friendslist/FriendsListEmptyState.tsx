import { useReactiveVar } from '@apollo/client'
import { Box, Button, Heading, Text, VStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export const FriendsListEmptyState = () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const permissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	return (
		<VStack
			space={'$3'}
			my={'$5'}
			py={'$5'}
			justifyContent={'center'}
			alignItems={'center'}
			rounded={'$md'}
		>
			<Box mb={'$2'} alignItems={'center'}>
				<Text fontSize={'$lg'} fontWeight={'$bold'}>
					No barfriends
				</Text>
				<Heading fontSize={'$2xl'}>Find your friends below</Heading>
			</Box>
			<VStack space={'$3'} w={'$full'} alignItems={'center'}>
				<Button
					size={'xs'}
					px={'$8'}
					rounded={'$md'}
					onPress={() =>
						router.push({
							pathname: '(app)/permission/contacts',
						})
					}
				>
					<Text>{permissionContactsVar?.granted ? 'All Contacts' : 'Use Contacts'}</Text>
				</Button>
				<Button
					variant={'link'}
					size={'xs'}
					sx={{
						w: '55%',
					}}
					rounded={'$md'}
					onPress={() => {
						router.push({
							pathname: '(app)/explore/searchtext',
							params: {
								searchtext: '',
							},
						})
					}}
				>
					<Ionicons
						name='search'
						size={25}
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light900
								: rTheme.theme?.gluestack.tokens.colors.dark900
						}
					/>
					<Text>Search</Text>
				</Button>
			</VStack>
		</VStack>
	)
}
