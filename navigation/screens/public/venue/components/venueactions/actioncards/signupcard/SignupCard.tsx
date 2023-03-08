import GetSignInUpText from '@helpers/data/SignupinText'
// import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Button } from 'native-base'

const text = GetSignInUpText()

export default function SignupCard() {
	// const navigation = useNavigation()
	return (
		<>
			<Heading
				fontSize={'md'}
				numberOfLines={3}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
			>
				{text[3].title}
			</Heading>
			<Center
				style={{
					flexDirection: 'column',
					marginTop: 15,
				}}
			>
				<Button
					onPressIn={() => {
						// navigation.navigate('CredentialNavigator', {
						// 	screen: 'PersonalCredentialStack',
						// 	params: {
						// 		screen: 'GetStartedScreen',
						// 	},
						// })
					}}
					onPress={() => {
						// navigation.navigate('CredentialNavigator', {
						// 	screen: 'PersonalCredentialStack',
						// 	params: {
						// 		screen: 'GetStartedScreen',
						// 	},
						// })
					}}
					w={'95%'}
					my={5}
					_text={{
						fontWeight: 'bold',
						textTransform: 'uppercase',
					}}
				>
					Log in
				</Button>
				<Button
					variant={'ghost'}
					w={'95%'}
					_text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
					borderRadius={'xl'}
					onPress={() =>
						navigation.navigate('CredentialNavigator', {
							screen: 'LoginCredentialStack',
							params: {
								screen: 'AuthenticatorScreen',
							},
						})
					}
					my={2}
				>
					log in
				</Button>
			</Center>
		</>
	)
}
