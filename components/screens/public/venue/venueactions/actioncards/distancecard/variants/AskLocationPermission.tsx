import { Heading, VStack } from '@components/core'
import { useRouter } from 'expo-router'
import { Button } from 'native-base'

export default function AskForegroundLocationPermission() {
	const router = useRouter()

	return (
		<VStack
			flexDirection={'column'}
			justifyContent={'space-around'}
			sx={{
				h: '100%',
			}}
		>
			<Heading
				mt={'$5'}
				fontSize={'$lg'}
				textTransform={'uppercase'}
				fontWeight={'$black'}
				lineHeight={'$xs'}
				flex={1}
			>
				See how close you are?
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
