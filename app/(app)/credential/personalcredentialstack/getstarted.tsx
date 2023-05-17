import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Feather } from '@expo/vector-icons'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { CredentialPersonalProfileReactiveVar, ProfilesBottomSheetRefReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Button, Icon, IconButton } from 'native-base'
import { Box, Text, VStack, Pressable } from 'native-base'

export default () => {
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rProfilesBottomSheetVar = useReactiveVar(ProfilesBottomSheetRefReactiveVar)
	const router = useRouter()

	if (rProfilesBottomSheetVar) {
		rProfilesBottomSheetVar?.current?.close()
	}

	const { data: PTSData, loading: PTSLoading, error: PTSError } = usePrivacyTermsDocumentsQuery()

	return (
		<VStack safeArea justifyContent={'space-between'} h={'full'} alignItems='center' mx={4}>
			<Box justifyContent={'center'} height={'lg'}>
				<CompanyCoasterLogoDynamic />
				<Text testID={'title-text'} mt={4} fontWeight={'black'} lineHeight={35} fontSize={'4xl'}>
					Let's Fucking Gooooooo out tonight!
				</Text>
				<Pressable
					isDisabled={PTSLoading}
					onPress={() =>
						router.push({
							pathname: '(app)/settings/privacytermsservicetabstack',
						})
					}
				>
					<Text fontSize={'lg'}>
						By continuing, you agree to the
						<Text fontSize={'lg'} fontWeight={'bold'} color={'primary.500'}>
							{' '}
							Term of the Services
						</Text>
						<Text fontSize={'lg'}> and</Text>
						<Text fontSize={'lg'} fontWeight={'bold'} color={'primary.500'}>
							{' '}
							Privacy Policies.
						</Text>
					</Text>
				</Pressable>
			</Box>
			<Box>
				<IconButton
					bg={'primary.500'}
					isDisabled={PTSLoading}
					onPress={() => {
						CredentialPersonalProfileReactiveVar({
							...credentialPersonalProfileVar,
							ServiceId: PTSData?.privacyTermsDocuments.termsofservice.id,
							PrivacyId: PTSData?.privacyTermsDocuments.privacy.id,
						})
						router.push({
							pathname: '(app)/credential/personalcredentialstack/phone',
						})
					}}
					icon={<Icon color='white' as={Feather} name='arrow-right' size={'md'} />}
					variant={'solid'}
					size={'lg'}
					borderRadius={'full'}
					h={60}
					w={60}
					fontSize={'lg'}
				/>
			</Box>
		</VStack>
	)
}
