import { useReactiveVar } from '@apollo/client'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Box, Button, Heading, Icon, IconButton } from 'native-base'

export default function InviteCard() {
	const router = useRouter()
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)

	console.log(
		'🚀 ~ file: InviteCard.tsx:8 ~ InviteCard ~ rPermissionContactsVar:',
		rPermissionContactsVar,
	)

	return (
		<Box w={'full'} alignItems={'center'}>
			<Box w={'full'} alignItems={'flex-start'}>
				<IconButton
					variant={'solid'}
					borderRadius={'md'}
					bg={'red.400'}
					icon={
						<Icon
							size={30}
							_light={{
								color: 'light.900',
							}}
							_dark={{
								color: 'dark.900',
							}}
							as={Ionicons}
							name={'people'}
						/>
					}
					height={57}
					width={57}
					alignSelf={'center'}
				/>
			</Box>
			<Heading
				mt={3}
				textTransform={'uppercase'}
				lineHeight={'xs'}
				fontSize={'lg'}
				fontWeight={'black'}
			>
				Share with friends
			</Heading>

			<Button
				onPress={() => {
					rPermissionContactsVar?.granted
						? router.push({
								pathname: '/public/contacts',
						  })
						: router.push({
								pathname: '(app)/permission/contacts',
						  })
				}}
				size={'md'}
				w={'90%'}
				my={3}
				borderRadius={'md'}
			>
				Invite
			</Button>
		</Box>
	)
}
