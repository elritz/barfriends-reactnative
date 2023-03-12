import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { PersonalCredentialStackParamList } from '@ctypes/app'
import BirthdayScreen from '@navigation/screens/credential/birthday/BirthdayScreen'
import ConfirmationCodeScreen from '@navigation/screens/credential/code/CodeScreen'
import CongratulationsScreen from '@navigation/screens/credential/congratulations/CongratulationsScreen'
import EmailScreen from '@navigation/screens/credential/email/EmailScreen'
import GetStartedScreen from '@navigation/screens/credential/getstarted/GetStartedScreen'
import NameScreen from '@navigation/screens/credential/name/NameScreen'
import PasswordCreateScreen from '@navigation/screens/credential/passwordcreate/PasswordCreateScreen'
import PhoneScreen from '@navigation/screens/credential/phone/PhoneScreen'
import UsernameScreen from '@navigation/screens/credential/username/UsernameScreen'
import TermsServicePrivacyTabStack from '@navigation/stacks/settings/termsserviceprivacytabstack/TermsServicePrivacyTabStack'
import { createStackNavigator } from '@react-navigation/stack'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<PersonalCredentialStackParamList>()

function PersonalCredentialStack() {
	const themeContext = useContext(ThemeContext)

	return (
		<ScreenStack.Navigator
			screenOptions={{
				headerTitle: () => <LogoTransparent height={30} width={192} />,
				headerLeft: () => <ChevronBackArrow />,
			}}
		>
			<ScreenStack.Screen
				name='GetStartedScreen'
				component={GetStartedScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerTitle: '',
				}}
			/>
			<ScreenStack.Screen
				name='ConfirmationCodeScreen'
				component={ConfirmationCodeScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='NameScreen'
				component={NameScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='BirthdayScreen'
				component={BirthdayScreen}
				options={{
					gestureEnabled: false,
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='UsernameScreen'
				component={UsernameScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='EmailScreen'
				component={EmailScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='PhoneScreen'
				component={PhoneScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='PasswordCreateScreen'
				component={PasswordCreateScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='PersonalCreationComplete'
				component={CongratulationsScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerTitle: '',
				}}
			/>
			<ScreenStack.Screen
				name='TermsServicePrivacyTabStack'
				component={TermsServicePrivacyTabStack}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background.default,
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default PersonalCredentialStack
