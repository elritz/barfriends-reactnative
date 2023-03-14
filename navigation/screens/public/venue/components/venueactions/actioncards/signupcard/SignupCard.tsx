import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Center, Heading, Button, VStack } from 'native-base'

export default function SignupCard() {
	// const navigation = useNavigation()
	const router = useRouter()
	return (
		<VStack justifyContent={'space-around'}>
			<Heading
				fontSize={'2xl'}
				numberOfLines={2}
				textAlign={'center'}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
				fontWeight={'extrabold'}
			>
				Join the fun tonight
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
							router.push({ pathname: '(app)/credentialnavigator/personalcredentialstack/getstarted' })
						}}
						px={7}
						_text={{
							fontSize: 'lg',
							fontWeight: 'bold',
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
							router.push({ pathname: '(app)/credentialnavigator/logincredentialstack/authenticator' })
						}
					>
						log in
					</Button>
				</VStack>
			</Center>
		</VStack>
	)
}
