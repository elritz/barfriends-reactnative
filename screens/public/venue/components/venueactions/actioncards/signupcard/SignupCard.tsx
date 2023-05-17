import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Center, Heading, Button, VStack } from 'native-base'

export default function SignupCard() {
	// const navigation = useNavigation()
	const router = useRouter()
	return (
		<VStack justifyContent={'space-around'}>
			<Heading
				fontSize={'xl'}
				numberOfLines={2}
				textAlign={'center'}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
				fontWeight={'extrabold'}
			>
				You can Join!
			</Heading>
			<Center
				style={{
					flexDirection: 'column',
				}}
				mt={3}
			>
				<VStack space={1}>
					<Button
						onPress={() => {
							router.push({ pathname: '(app)/credential/personalcredentialstack/getstarted' })
						}}
						px={7}
						borderRadius={'sm'}
						_text={{
							fontSize: 'lg',
							fontWeight: '700',
							textTransform: 'uppercase',
						}}
					>
						SIGN UP
					</Button>
					<Button
						px={7}
						variant={'unstyled'}
						_text={{
							textTransform: 'uppercase',
							fontWeight: '700',
							fontSize: 'lg',
						}}
						onPress={() =>
							router.push({ pathname: '(app)/credential/logincredentialstack/authenticator' })
						}
					>
						log in
					</Button>
				</VStack>
			</Center>
		</VStack>
	)
}
