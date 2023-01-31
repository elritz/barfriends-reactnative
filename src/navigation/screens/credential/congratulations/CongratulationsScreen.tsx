import { GradientAlongPath, prepare } from './PathAlongGrdient'
import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
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
import { Text, Icon, IconButton, Box, Heading, Button, VStack } from 'native-base'
import { SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CongratulationsScreen = () => {
	const insets = useSafeAreaInsets()
	const navigation = useNavigation()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

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

	const [createProfilePersonal, { loading: CPPLoading }] = useCreatePersonalProfileMutation({
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
		<VStack safeArea justifyContent={'space-between'} h={'full'} alignItems='center' mx={4}>
			<VStack space={2} justifyContent={'center'} height={'lg'}>
				<CompanyCoasterLogoDynamic />
				<Box>
					<Heading fontWeight={'black'} fontSize={'4xl'}>
						Welcome to Bfs
					</Heading>
				</Box>
				<Box borderRadius={'lg'}>
					<Text fontSize={'lg'}>
						Enrich your experience. We are those we hang around. If you're not feeling it find new
						friends.
					</Text>
				</Box>
			</VStack>
			<Button
				onPress={onSubmit}
				alignSelf={'center'}
				isLoading={CPPLoading || SDPLoading}
				px={10}
				h={60}
				w={'1/2'}
				size={'lg'}
				variant={'solid'}
				fontSize={'lg'}
			>
				Complete
			</Button>
		</VStack>
	)
}

export default CongratulationsScreen