import { Feather } from '@expo/vector-icons'
import { SortOrder, TypeOfDocument, useDocumentsQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { Button, Text } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext } from 'react'
import { Pressable } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import styled, { ThemeContext } from 'styled-components/native'

const TermsAndServices = () => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)

	const navigateToNextScreen = (param: any) => {
		switch (param) {
			case 'CreateAccountProfileFlow':
				return navigation.navigate('CredentialNavigator', {
					screen: 'PersonalCredentialStack',
					params: {
						screen: 'BirthdayScreen',
					},
				})
			case 'TermsServicePrivacyFlow':
				return navigation.navigate('SettingsNavigator', {
					screen: 'TermsServicePrivacyTabStack',
				})
			case 'LoginFlow':
				return navigation.navigate('CredentialNavigator', {
					screen: 'PersonalCredentialStack',
					params: {
						screen: 'EmailPhoneTabStack',
						params: {
							screen: 'PhoneScreen',
						},
					},
				})
			case 'LocationPermissionFlow':
			default:
				return null
		}
	}

	const onSubmit = () => {
		navigateToNextScreen('CreateAccountProfileFlow')
	}

	const RightIcon = () => {
		return (
			<Icon
				type='feather'
				name='arrow-right'
				size={35}
				style={{
					padding: 5,
				}}
				color={themeContext.palette.secondary.background}
			/>
		)
	}

	return (
		<OuterView>
			<Text h3>Discover what’s happening tonight </Text>
			<TermsAndServicesView>
				<Pressable onPress={() => navigateToNextScreen('TermsServicePrivacyFlow')}>
					<TermsAndServicesText>
						By continuing up, you agree to thes
						<Text style={{ color: themeContext.palette.highlight.color.primary }}> Term of Services</Text>
						<Text style={{ color: themeContext.palette.primary.color.primary }}> and</Text>
						<Text style={{ color: themeContext.palette.highlight.color.primary }}>
							{' '}
							Privacy Policies.
						</Text>
					</TermsAndServicesText>
				</Pressable>
			</TermsAndServicesView>
			<UserOptionsView>
				<Button
					title='Create Profile'
					onPress={() => navigateToNextScreen('CreateAccountProfileFlow')}
					ViewComponent={LinearGradient} // Don't forget this!
					linearGradientProps={{
						colors: [
							themeContext.palette.secondary.background,
							themeContext.palette.primary.color.primary,
						],
						start: { x: 0.5, y: 0.2 },
						end: { x: 0.5, y: 10 },
					}}
					buttonStyle={{
						backgroundColor: themeContext.palette.secondary.background,
						borderRadius: 20,
						paddingHorizontal: wp(20),
					}}
				/>
				<Button
					type='clear'
					title='Login'
					onPress={() => navigateToNextScreen('LoginFlow')}
					titleStyle={{
						color: themeContext.palette.primary.color.primary,
						fontWeight: '500',
					}}
					buttonStyle={{
						borderRadius: 50,
						paddingHorizontal: wp(20),
						marginVertical: 15,
					}}
				/>
			</UserOptionsView>
			<LoginView>
				<Button
					title='Continue'
					onPress={onSubmit}
					buttonStyle={{
						backgroundColor: themeContext.palette.active.background.primary,
					}}
					titleStyle={{
						color: '#ffffff',
					}}
					iconPosition='right'
					icon={<RightIcon />}
				/>
			</LoginView>
		</OuterView>
	)
}

export default TermsAndServices

const OuterView = styled.KeyboardAvoidingView`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 2%;
`

const LoginView = styled.SafeAreaView`
	position: absolute;
	display: flex;
	flex-direction: row-reverse;
	bottom: 20px;
	width: 100%;
	height: auto;
`

const TermsAndServicesView = styled.View`
	width: 100%;
	align-self: center;
	margin: 15px 0px;
`

const TermsAndServicesText = styled.Text`
	color: ${props => props.theme.palette.primary.color.primary};
	font-weight: 600;
`

const UserOptionsView = styled.SafeAreaView`
	width: 100%;
	margin-vertical: 20px;
	align-items: center;
`
