import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Box, Heading, Text, VStack } from '@components/core'
import { Feather } from '@expo/vector-icons'
import {
	AuthorizationDeviceManager,
	useCreatePersonalProfileMutation,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Icon, IconButton } from 'native-base'

export default () => {
	const router = useRouter()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const [createProfilePersonal, { loading: CPPLoading }] = useCreatePersonalProfileMutation({
		variables: {
			data: {
				PrivacyPolicyId: String(credentialPersonalProfileVar.PrivacyId),
				ServicesId: String(credentialPersonalProfileVar.ServiceId),
				birthday: credentialPersonalProfileVar.birthday,
				password: String(credentialPersonalProfileVar.password),
				username: String(credentialPersonalProfileVar.username),
				fullname: `${credentialPersonalProfileVar.firstname} ${credentialPersonalProfileVar.lastname}`,
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
			if (data.createPersonalProfile?.__typename === 'AuthorizationDeviceManager') {
				switchDeviceProfileMutation({
					variables: {
						profileId: String(data?.createPersonalProfile.DeviceProfile?.Profile?.id),
					},
				})
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SDPData, loading: SDPLoading, error: SDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data.switchDeviceProfile.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager

					AuthorizationReactiveVar(deviceManager)
					router.push({
						pathname: '(app)/hometab',
					})
				}
			},
		})

	const onSubmit = async () => {
		createProfilePersonal()
	}

	return (
		<VStack justifyContent={'space-between'} h={'$full'} alignItems='center' mx={'$4'}>
			<VStack space={'md'} alignItems={'center'} justifyContent={'center'}>
				<CompanyCoasterLogoDynamic backgroundColor='black' />
				<Heading fontWeight={'$black'} fontSize={'$4xl'}>
					Welcome to Bfs
				</Heading>
				<Box rounded={'$md'}>
					<Text fontSize={'$lg'}>
						We are those we hang around. If you're not feeling it find and make new friends. We can enrich
						your experience doing that.
					</Text>
				</Box>
			</VStack>
			<IconButton
				bg={'primary.500'}
				onPress={() => onSubmit()}
				alignSelf={'center'}
				isDisabled={CPPLoading || SDPLoading}
				icon={<Icon color='white' as={Feather} name='arrow-right' size={'md'} />}
				variant={'solid'}
				size={'lg'}
				borderRadius={'full'}
				h={'50px'}
				w={'50px'}
				fontSize={'lg'}
			/>
		</VStack>
	)
}
