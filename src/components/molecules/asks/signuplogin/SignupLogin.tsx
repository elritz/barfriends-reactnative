import DeviceManagerProfiles from './DeviceManagerProfiles'
import { useReactiveVar } from '@apollo/client'
import {
	DeviceManager,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Center, Text, Button } from 'native-base'
import { useState } from 'react'

const text = GetSignInUpText()

type Props = {
	signupTextId?: number
}

const CardPleaseSignup = (props: Props) => {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const handleSignupNavigation = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'GetStartedScreen',
			},
		})
	}

	const handleSigninNavigation = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'AuthenticatorScreen',
			},
		})
	}

	if (!rAuthorizationVar) {
		return null
	}
	return (
		<Box>
			<Text
				numberOfLines={4}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
				pb={2}
				w={275}
				maxW={'85%'}
				style={{
					alignSelf: 'center',
					textAlign: 'center',
					textTransform: 'uppercase',
				}}
				fontWeight={'black'}
				lineHeight={'md'}
				fontSize={'2xl'}
			>
				{text[props.signupTextId ?? 1].title}
			</Text>
			<Text
				allowFontScaling
				style={{
					fontWeight: '500',
					alignSelf: 'center',
					textAlign: 'center',
				}}
				fontSize={'lg'}
			>
				{text[props.signupTextId ?? 1].subTitle}
			</Text>
			<Center
				style={{
					flexDirection: 'column',
					marginTop: 15,
				}}
			>
				<Button
					onPressIn={handleSignupNavigation}
					onPress={handleSignupNavigation}
					w={'95%'}
					_text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
				>
					Sign up
				</Button>
				<Button
					variant={''}
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
							color: 'light.900',
						},
						// underline: true,
					}}
				>
					Log in
				</Button>
			</Center>
			<DeviceManagerProfiles />
		</Box>
	)
}
export default CardPleaseSignup
