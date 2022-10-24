import ActionCard from '../../ActionCard'
import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import { Center, Heading, Text } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const text = GetSignInUpText()

export default function SignupCard() {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	return (
		<>
			<Heading
				fontSize={'2xl'}
				numberOfLines={4}
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
				<RNEButtonPrimary
					onPressIn={() => {
						navigation.navigate('CredentialNavigator', {
							screen: 'PersonalCredentialStack',
							params: {
								screen: 'GetStartedScreen',
							},
						})
					}}
					title={'sign up'}
					onPress={() => {
						navigation.navigate('CredentialNavigator', {
							screen: 'PersonalCredentialStack',
							params: {
								screen: 'GetStartedScreen',
							},
						})
					}}
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
					onPress={() =>
						navigation.navigate('CredentialNavigator', {
							screen: 'LoginCredentialStack',
							params: {
								screen: 'AuthenticatorScreen',
							},
						})
					}
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
		</>
	)
}
