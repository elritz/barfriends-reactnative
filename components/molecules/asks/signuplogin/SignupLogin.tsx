import DeviceManagerProfiles from './DeviceManagerProfiles'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useRouter } from 'expo-router'
import { Box, Center, Text, Button } from 'native-base'

const text = GetSignInUpText()

type Props = {
	signupTextId?: number
}

const CardPleaseSignup = (props: Props) => {
	const router = useRouter()

	return (
		<Box>
			<Text
				numberOfLines={3}
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
				fontSize={'xl'}
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
					onPress={() =>
						router.push({
							pathname: '(app)/credential/personalcredentialstack/getstarted',
						})
					}
					w={'95%'}
					_text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
					borderRadius={'xl'}
				>
					Sign up
				</Button>
				<Button
					onPress={() => {
						router.push({
							pathname: '(app)/credential/logincredentialstack/authenticator',
						})
					}}
					variant={'unstyled'}
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
