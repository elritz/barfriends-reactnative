import { Box, Button, Heading } from 'native-base'

export default function InviteCard() {
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
			<Button size={'md'} w={'90%'} my={3} borderRadius={'md'}>
				Share
			</Button>
		</Box>
	)
}
