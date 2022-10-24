import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import BirthdayScreen from '@navigation/screens/credential/birthday/BirthdayScreen'
import ConfirmationCodeScreen from '@navigation/screens/credential/code/CodeScreen'
import EmojimoodScreen from '@navigation/screens/credential/emojimood/EmojimoodScreen'
import GetStartedScreen from '@navigation/screens/credential/getstarted/GetStartedScreen'
import NameScreen from '@navigation/screens/credential/name/NameScreen'
import PasswordCreateScreen from '@navigation/screens/credential/passwordcreate/PasswordCreateScreen'
import PhotoScreen from '@navigation/screens/credential/photo/PhotoScreen'
import UsernameScreen from '@navigation/screens/credential/username/UsernameScreen'
import EmailPhoneTabStack from '@navigation/stacks/credential/emailandphonetabstack/EmailPhoneTabStack'
import TermsServicePrivacyTabStack from '@navigation/stacks/settingsstack/TermsServicePrivacyTabStack'
import { createStackNavigator } from '@react-navigation/stack'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { PersonalCredentialStackParamList } from '@types'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const ScreenStack = createStackNavigator<PersonalCredentialStackParamList>()

function PersonalCredentialStack() {
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
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
				name='EmailPhoneTabStack'
				component={EmailPhoneTabStack}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background,
					},
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
				name='PasswordCreateScreen'
				component={PasswordCreateScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='PhotoScreen'
				component={PhotoScreen}
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='EmojimoodScreen'
				component={EmojimoodScreen}
				options={{
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: credentialPersonalProfileVar?.emojimood?.colors[0]
							? credentialPersonalProfileVar?.emojimood?.colors[0]
							: 'transparent',
					},
				}}
			/>
			<ScreenStack.Screen
				name='TermsServicePrivacyTabStack'
				component={TermsServicePrivacyTabStack}
				options={{
					headerStyle: {
						backgroundColor: themeContext.palette.primary.background,
					},
				}}
			/>
		</ScreenStack.Navigator>
	)
}

export default PersonalCredentialStack
