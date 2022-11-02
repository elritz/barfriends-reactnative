import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, KeyboardAvoidingView, Text, Button, Icon } from 'native-base'
import { useContext } from 'react'
import { Pressable } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

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
				as={Feather}
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
		<KeyboardAvoidingView height={'auto'} flexDir={'column'} mx={'2%'}>
			<Heading fontSize={'xl'}>Discover what’s happening tonight </Heading>
			<Box alignSelf={'center'} mx={4}>
				<Pressable onPress={() => navigateToNextScreen('TermsServicePrivacyFlow')}>
					<Text>
						By continuing up, you agree to thes
						<Text style={{ color: themeContext.palette.primary.color.accent }}> Term of Services</Text>
						<Text style={{ color: themeContext.palette.primary.color.default }}> and</Text>
						<Text style={{ color: themeContext.palette.primary.color.accent }}> Privacy Policies.</Text>
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
					onPress={() => navigateToNextScreen('CreateAccountProfileFlow')}
					// ViewComponent={LinearGradient} // Don't forget this!
					// linearGradientProps={{
					// 	colors: [
					// 		themeContext.palette.secondary.background,
					// 		themeContext.palette.primary.color.primary,
					// 	],
					// 	start: { x: 0.5, y: 0.2 },
					// 	end: { x: 0.5, y: 10 },
					// }}
					bg={themeContext.palette.secondary.background.default}
					px={wp(20)}
					borderRadius={'lg'}
				>
					Create Profile
				</Button>
				<Button
					variant={'ghost'}
					onPress={() => navigateToNextScreen('LoginFlow')}
					_text={{
						fontWeight: '500',
					}}
					borderRadius={50}
					px={wp(20)}
					my={15}
				>
					Login
				</Button>
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
				<Button onPress={onSubmit} colorScheme={'primary'} endIcon={<RightIcon />}>
					Continue
				</Button>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

export default TermsAndServices
