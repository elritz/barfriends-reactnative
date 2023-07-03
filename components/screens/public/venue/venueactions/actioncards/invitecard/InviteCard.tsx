import { useReactiveVar } from '@apollo/client'
import { Button, Heading, VStack, Box } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { PermissionContactsReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'

export default function InviteCard() {
	const router = useRouter()
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)

	return (
		<VStack w={'$full'} justifyContent='space-between' alignItems={'center'}>
			<Box
				alignItems='center'
				justifyContent='center'
				sx={{
					h: 57,
					w: 57,
				}}
				bg='$red300'
			>
				<Ionicons name='people' size={35} color={'black'} />
			</Box>

			<Heading
				mt={'$3'}
				textTransform={'uppercase'}
				lineHeight={'$xs'}
				fontSize={'$lg'}
				fontWeight={'$black'}
			>
				Share with friends
			</Heading>
			<Button
				size={'lg'}
				w={'$full'}
				alignItems='center'
				justifyContent='center'
				onPress={() => {
					rPermissionContactsVar?.granted
						? router.push({
								pathname: '/public/contacts',
						  })
						: router.push({
								pathname: '(app)/permission/contacts',
						  })
				}}
				width={'$full'}
				rounded={'$md'}
			>
				<Button.Text>Invite</Button.Text>
			</Button>
		</VStack>
	)
}
