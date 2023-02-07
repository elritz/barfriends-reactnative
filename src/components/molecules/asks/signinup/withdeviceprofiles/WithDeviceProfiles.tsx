import { useReactiveVar } from '@apollo/client'
import { useGetADeviceManagerQuery } from '@graphql/generated'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Text, Center, Button, Divider } from 'native-base'

export default function WithDeviceProfiles() {
	const navigation = useNavigation()
	const authorizationVar = useReactiveVar(AuthorizationReactiveVar)

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
	})

	if (!authorizationVar || loading) {
		return null
	}

	const handleSignupNavigation = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'GetStartedScreen',
			},
		})
	}

	const handleSigninNavigation = () => {
		// navigation.dispatch(StackActions.pop())
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'AuthenticatorScreen',
			},
		})
	}

	if (!authorizationVar) {
		return null
	}

	if (data?.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
		const text = GetSignInUpText()

		return (
			<Box>
				<Center
					style={{
						flexDirection: 'column',
						marginTop: 15,
					}}
				>
					<Text
						allowFontScaling
						style={{
							fontWeight: '500',
							alignSelf: 'center',
							textAlign: 'center',
						}}
					>
						{text[1].subTitle}
					</Text>
					<Button
						onPressIn={handleSignupNavigation}
						onPress={handleSignupNavigation}
						width={'95%'}
						my={4}
						_text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
						borderRadius={'xl'}
						colorScheme={'primary'}
					>
						Sign up
					</Button>
					<Button
						variant={'ghost'}
						onPress={handleSigninNavigation}
						w={'95%'}
						_text={{
							textTransform: 'uppercase',
							fontWeight: '700',
							fontSize: 'lg',
							_dark: {
								color: 'light.50',
							},
							_light: {
								color: 'dark.50',
							},
							lineHeight: 'lg',
						}}
					>
						Log in
					</Button>
				</Center>
				<Divider style={{ marginVertical: 10 }} />
			</Box>
		)
	}
}
