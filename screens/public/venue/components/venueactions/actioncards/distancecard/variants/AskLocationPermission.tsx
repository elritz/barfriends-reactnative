import { useRouter } from 'expo-router'
import { Heading, Button, Box, VStack } from 'native-base'

export default function AskForegroundLocationPermission() {
	const router = useRouter()

	return (
		<VStack flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			<Heading
				mt={5}
				fontSize={'lg'}
				textTransform={'uppercase'}
				fontWeight={'black'}
				lineHeight={'xs'}
				flex={1}
			>
				Sign in or up to join venues!
			</Heading>
			<Button
				size={'lg'}
				onPress={() =>
					router.push({
						pathname: '(app)/permission/foregroundlocation',
					})
				}
			>
				Continue
			</Button>
		</VStack>
	)
}
