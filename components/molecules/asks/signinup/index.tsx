import { Button, Center, Text } from '@components/core'
import GetSignInUpText from '@helpers/data/SignupinText'
import { useRouter } from 'expo-router'
import { Box, Divider } from 'native-base'

export default () => {
	const router = useRouter()
	const text = GetSignInUpText()

	return (
		<Box>
			<Center flexDirection='column-reverse'>
				<Text allowFontScaling fontWeight='$bold' alignSelf='center' textAlign='center'>
					{text[1].subTitle}
				</Text>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/credential/personalcredentialstack/getstarted',
						})
					}
					width={'95%'}
					my={4}
					rounded={'$md'}
				>
					Sign up
				</Button>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/credential/logincredentialstack/authenticator',
						})
					}
					w={'95%'}
					// _text={{
					// 	textTransform: 'uppercase',
					// 	fontWeight: '700',
					// 	fontSize: 'lg',
					// 	_dark: {
					// 		color: 'light.50',
					// 	},
					// 	_light: {
					// 		color: 'dark.50',
					// 	},
					// 	lineHeight: 'lg',
					// }}
				>
					Log in
				</Button>
			</Center>
			<Divider style={{ marginVertical: 10 }} />
		</Box>
	)
}
