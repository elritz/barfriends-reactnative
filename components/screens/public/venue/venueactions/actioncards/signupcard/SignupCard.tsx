import { Heading } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Box, Icon, Text } from 'native-base'
import { Button, VStack } from 'native-base'

export default function SignupCard() {
	const router = useRouter()
	return (
		<VStack flexDirection={'column'} justifyContent={'space-around'} height={'100%'}>
			<VStack space={1} flex={1} justifyContent={'flex-start'}>
				<Heading
					textTransform={'uppercase'}
					lineHeight={'$xs'}
					fontSize={'lg'}
					fontWeight={'black'}
					mt={5}
				>
					Sign up, Join, Socialize
				</Heading>
				<Text>Also focused on stuff</Text>
			</VStack>
			<Box>
				<Button
					p={3.5}
					onPress={() => {
						router.push({ pathname: '(app)/credential/personalcredentialstack/getstarted' })
					}}
					size={'lg'}
					bg={'primary.600'}
					rightIcon={<Icon color='white' as={Feather} name='arrow-right' size={'md'} />}
				>
					Continue
				</Button>
			</Box>
		</VStack>
	)
}
