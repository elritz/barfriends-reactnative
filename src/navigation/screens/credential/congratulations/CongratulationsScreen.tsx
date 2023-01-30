import { GradientAlongPath, prepare } from './PathAlongGrdient'
import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import {
	ClientDeviceManager,
	ProfileType,
	useCreatePersonalProfileMutation,
	useEmojimoodsQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { Canvas, Easing, Fill, useLoop } from '@shopify/react-native-skia'
import { Text, Icon, IconButton, Box, Heading, Button, VStack } from 'native-base'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const hello = prepare(
	'M13.63 248.31C13.63 248.31 51.84 206.67 84.21 169.31C140.84 103.97 202.79 27.66 150.14 14.88C131.01 10.23 116.36 29.88 107.26 45.33C69.7 108.92 58.03 214.33 57.54 302.57C67.75 271.83 104.43 190.85 140.18 193.08C181.47 195.65 145.26 257.57 154.53 284.39C168.85 322.18 208.22 292.83 229.98 277.45C265.92 252.03 288.98 231.22 288.98 200.45C288.98 161.55 235.29 174.02 223.3 205.14C213.93 229.44 214.3 265.89 229.3 284.14C247.49 306.28 287.67 309.93 312.18 288.46C337 266.71 354.66 234.56 368.68 213.03C403.92 158.87 464.36 86.15 449.06 30.03C446.98 22.4 440.36 16.57 432.46 16.26C393.62 14.75 381.84 99.18 375.35 129.31C368.78 159.83 345.17 261.31 373.11 293.06C404.43 328.58 446.29 262.4 464.66 231.67C468.66 225.31 472.59 218.43 476.08 213.07C511.33 158.91 571.77 86.19 556.46 30.07C554.39 22.44 547.77 16.61 539.87 16.3C501.03 14.79 489.25 99.22 482.76 129.35C476.18 159.87 452.58 261.35 480.52 293.1C511.83 328.62 562.4 265.53 572.64 232.86C587.34 185.92 620.94 171.58 660.91 180.29C616 166.66 580.86 199.67 572.64 233.16C566.81 256.93 573.52 282.16 599.25 295.77C668.54 332.41 742.8 211.69 660.91 180.29C643.67 181.89 636.15 204.77 643.29 227.78C654.29 263.97 704.29 268.27 733.08 256',
)

const CongratulationsScreen = () => {
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const progress = useLoop({
		duration: 3000,
		easing: Easing.inOut(Easing.ease),
	})
	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'ClientDeviceManager') {
					const deviceManager = data.switchDeviceProfile as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)

					navigation.navigate('HomeTabNavigator', {
						screen: 'VenueFeedStack',
						params: {
							screen: 'VenueFeedScreen',
						},
					})
				}
			},
		})

	const [createProfilePersonal, { loading }] = useCreatePersonalProfileMutation({
		variables: {
			data: {
				PrivacyPolicyId: String(credentialPersonalProfileVar.PrivacyId),
				ServicesId: String(credentialPersonalProfileVar.ServiceId),
				birthday: credentialPersonalProfileVar.birthday,
				password: String(credentialPersonalProfileVar.password),
				username: String(credentialPersonalProfileVar.username),
				fullname: credentialPersonalProfileVar.name,
				address: '',
				EmailInput: {
					email: credentialPersonalProfileVar.email,
				},
				PhoneInput: {
					...credentialPersonalProfileVar.phone,
				},
			},
		},
		onCompleted: async data => {
			if (data.createPersonalProfile?.__typename === 'Profile') {
				switchDeviceProfileMutation({
					variables: {
						profileId: String(data?.createPersonalProfile.id),
						profileType: ProfileType.Personal,
					},
				})
			}
		},
	})

	const onSubmit = async () => {
		createProfilePersonal()
	}

	return (
		<VStack space={2} flex={1} mx={4} justifyContent={'flex-end'} safeAreaBottom>
			<Canvas style={{ flex: 1 }}>
				<Fill color='black' />
				<GradientAlongPath {...hello} progress={progress} />
			</Canvas>
			<VStack h={'50%'} justifyContent={'space-around'}>
				<VStack space={2}>
					<Box>
						<Heading fontWeight={'black'} fontSize={'4xl'}>
							Enrich your experience
						</Heading>
					</Box>
					<Box borderRadius={'lg'}>
						<Text fontWeight={'bold'} fontSize={'lg'}>
							We become those we hang around. If you're not feeling it find new friends.
						</Text>
					</Box>
				</VStack>
				<Button
					alignSelf={'center'}
					size={'lg'}
					onPress={() => {
						console.log('createAccoutn')
					}}
					w={'1/2'}
				>
					Continue
				</Button>
			</VStack>
		</VStack>
	)
}

export default CongratulationsScreen
