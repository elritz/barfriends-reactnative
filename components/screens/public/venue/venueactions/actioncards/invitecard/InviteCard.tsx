import { useReactiveVar } from '@apollo/client'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Box, Button, Heading } from 'native-base'

export default function InviteCard() {
	const router = useRouter()
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)

	console.log(
		'🚀 ~ file: InviteCard.tsx:8 ~ InviteCard ~ rPermissionContactsVar:',
		rPermissionContactsVar,
	)

	return (
		<Box w={'full'} alignItems={'center'}>
			<Heading
				textTransform={'uppercase'}
				lineHeight={'xs'}
				fontSize={'lg'}
				fontWeight={'black'}
				mt={5}
			>
				Invite Friends to Bfs
			</Heading>

			<Button
				onPress={() => {
					!rPermissionContactsVar?.granted
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
				Share
			</Button>
		</Box>
	)
}
