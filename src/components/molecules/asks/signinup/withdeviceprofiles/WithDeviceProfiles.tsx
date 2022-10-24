import { useReactiveVar } from '@apollo/client'
import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'
import { useGetADeviceManagerQuery } from '@graphql/generated'
import GetSignInUpText from '@helpers/data/SignupinText'
import { StackActions, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Divider, Button } from '@rneui/themed'
import { Box, Text, Center } from 'native-base'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

export default function WithDeviceProfiles() {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
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
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'AuthenticatorScreen',
			},
		})
	}

	const onPressSignup = () => {
		navigation.dispatch(StackActions.pop())
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'GetStartedScreen',
			},
		})
	}
	const onPressSignin = () => {
		navigation.dispatch(StackActions.pop())
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

	if (data.getADeviceManager.__typename === 'DeviceManagerDeviceProfiles') {
		const deviceProfiles = data.getADeviceManager.DeviceProfiles

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
					<RNEButtonPrimary
						onPressIn={handleSignupNavigation}
						title={'sign up'}
						onPress={handleSignupNavigation}
						containerStyle={{
							width: '95%',
							marginVertical: 5,
						}}
						titleStyle={{
							fontWeight: 'bold',
							textTransform: 'uppercase',
						}}
					/>
					<Button
						type='clear'
						title={'log in'}
						onPress={handleSigninNavigation}
						containerStyle={{
							marginVertical: 5,
						}}
						buttonStyle={{
							width: '100%',
						}}
						titleStyle={{
							color: themeContext.palette.primary.color.primary,
							fontWeight: 'bold',
							textTransform: 'uppercase',
							textDecorationLine: 'underline',
						}}
					/>
				</Center>
				<Divider style={{ marginVertical: 10 }} />
			</Box>
		)
	}
}
