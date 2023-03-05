import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Feather } from '@expo/vector-icons'
import { usePrivacyTermsDocumentsQuery } from '@graphql/generated'
import { CredentialPersonalProfileReactiveVar, ProfilesBottomSheetRefReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Button, Icon } from 'native-base'
import { Box, Text, VStack } from 'native-base'
import { useContext } from 'react'
import { Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const GetStartedScreen = () => {
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rProfilesBottomSheetVar = useReactiveVar(ProfilesBottomSheetRefReactiveVar)
	const router = useRouter()
	const themeContext = useContext(ThemeContext)
	const hightlightColor = themeContext.palette.bfscompany.secondary

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
					onPress={() =>
						router.push({
							pathname: '(app)/settingsnavigator/privacytermsservicetabstack',
						})
					}
				>
					<Text fontSize={'lg'}>
						By continuing, you agree to the
						<Text fontSize={'lg'} fontWeight={'bold'} style={{ color: hightlightColor }}>
							{' '}
							Term of the Services
						</Text>
						<Text fontSize={'lg'}> and</Text>
						<Text fontSize={'lg'} fontWeight={'bold'} style={{ color: hightlightColor }}>
							{' '}
							Privacy Policies.
						</Text>
					</Text>
				</Pressable>
			</Box>
			<Box>
				{!PTSLoading ? (
					<Button
						bg={'tertiary.500'}
						onPress={() => {
							CredentialPersonalProfileReactiveVar({
								...credentialPersonalProfileVar,
								ServiceId: PTSData?.privacyTermsDocuments.termsofservice.id,
								PrivacyId: PTSData?.privacyTermsDocuments.privacy.id,
							})
							// navigation.navigate('CredentialNavigator', {
							// 	screen: 'PersonalCredentialStack',
							// 	params: {
							// 		screen: 'EmailPhoneTabStack',
							// 		params: {
							// 			screen: 'PhoneScreen',
							// 		},
							// 	},
							// })
						}}
						rightIcon={<Icon color='white' as={Feather} name='arrow-right' size={'md'} />}
						variant={'solid'}
						px={10}
						size={'lg'}
						w={'1/2'}
						h={60}
						fontSize={'lg'}
					>
						Continue
					</Button>
				) : null}
			</Box>
		</VStack>
	)
}

export default GetStartedScreen
