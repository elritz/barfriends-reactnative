import { useRouter } from 'expo-router'
import { Heading, Button, Box } from 'native-base'

export default function LocationPermission() {
	const router = useRouter()

	return (
		<Box flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			<Heading fontSize={'md'} textTransform={'uppercase'} fontWeight={'black'} lineHeight={'xs'}>
				Use the join venue feature!
			</Heading>
			<Button
				rounded={'full'}
				onPress={() =>
					router.push({
						pathname: '(app)/permissionnavigator/foregroundlocation',
					})
				}
			>
				Continue
			</Button>
		</Box>
	)
}
