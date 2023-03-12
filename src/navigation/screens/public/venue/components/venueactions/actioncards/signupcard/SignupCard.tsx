import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Button, VStack } from 'native-base'

export default function SignupCard() {
	const navigation = useNavigation()
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
				<VStack alignItems={'center'} space={1} mt={2}>
					<Button
						onPress={() => {
							navigation.navigate('CredentialNavigator', {
								screen: 'PersonalCredentialStack',
								params: {
									screen: 'GetStartedScreen',
								},
							})
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
						w={'5%'}
						_text={{
							textTransform: 'uppercase',
							fontWeight: '700',
							fontSize: 'lg',
							_dark: {
								color: 'light.50',
							},
							_light: {
								color: 'light.900',
							},
						}}
						onPress={() =>
							navigation.navigate('CredentialNavigator', {
								screen: 'LoginCredentialStack',
								params: {
									screen: 'AuthenticatorScreen',
								},
							})
						}
					>
						log in
					</Button>
				</VStack>
			</Center>
		</VStack>
	)
}
