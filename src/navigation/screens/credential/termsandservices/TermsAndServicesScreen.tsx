import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Heading, KeyboardAvoidingView, Text } from 'native-base'
import { useContext } from 'react'
import { Pressable } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
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
		<KeyboardAvoidingView
		height={'auto'}
		flexDir={'column'}
		mx={2%}
		>
			<Heading fontSize={'xl'}>Discover what’s happening tonight </Heading>
			<Box alignSelf={'center'} mx={4}>
				<Pressable onPress={() => navigateToNextScreen('TermsServicePrivacyFlow')}>
					<Text>
						By continuing up, you agree to thes
						<Text style={{ color: themeContext.palette.highlight.color.primary }}> Term of Services</Text>
						<Text style={{ color: themeContext.palette.primary.color.primary }}> and</Text>
						<Text style={{ color: themeContext.palette.highlight.color.primary }}>
							{' '}
							Privacy Policies.
						</Text>
					</Text>
				</Pressable>
			</Box>
			<SafeAreaView
				style={{
					marginVertical: 20,
					alignItems: 'center',
				}}
			>
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
			</SafeAreaView>
			<SafeAreaView
				style={{
					position: 'absolute',
					display: 'flex',
					flexDirection: 'row-reverse',
					bottom: 20,
					width: '100%',
					height: 'auto',
				}}
			>
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
			</SafeAreaView>
		</KeyboardAvoid>
	)
}

export default TermsAndServices
