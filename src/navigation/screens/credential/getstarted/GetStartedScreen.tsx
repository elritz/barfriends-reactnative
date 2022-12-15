import { useReactiveVar } from '@apollo/client'
import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Feather } from '@expo/vector-icons'
import { SortOrder, TypeOfDocument, useDocumentsQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ProfilesBottomSheetRefReactiveVar } from '@reactive'
import { Button, Icon } from 'native-base'
import { Box, Text, VStack } from 'native-base'
import { useContext } from 'react'
import { Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const GetStartedScreen = () => {
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const rProfilesBottomSheetVar = useReactiveVar(ProfilesBottomSheetRefReactiveVar)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const hightlightColor = themeContext.palette.bfscompany.secondary

	if (rProfilesBottomSheetVar) {
		rProfilesBottomSheetVar?.current?.close()
	}

	const {
		data: PTSData,
		loading: PTSLoading,
		error: PTSError,
	} = useDocumentsQuery({
		variables: {
			where: {
				TypeOfDocument: {
					equals: TypeOfDocument.ProfileTermsOfService,
				},
			},
			orderBy: {
				createdAt: SortOrder.Desc,
			},
			first: 1,
		},
	})

	const {
		data: PPPData,
		loading: PPPLoading,
		error: PPPError,
	} = useDocumentsQuery({
		variables: {
			where: {
				TypeOfDocument: {
					equals: TypeOfDocument.ProfilePrivacyPolicy,
				},
			},
			orderBy: {
				createdAt: SortOrder.Desc,
			},
			first: 1,
		},
	})

	return (
		<VStack safeArea justifyContent={'space-between'} h={'full'} alignItems='center' mx={'5%'}>
			<Box justifyContent={'center'} height={'lg'}>
				<CompanyCoasterLogoDynamic />
				<Text mt={4} fontWeight={'black'} lineHeight={35} fontSize={'4xl'}>
					Let's Fucking Gooooooo out tonight!
				</Text>
				<Pressable
					onPress={() =>
						navigation.navigate('CredentialNavigator', {
							screen: 'PersonalCredentialStack',
							params: {
								screen: 'TermsServicePrivacyTabStack',
								params: {
									screen: 'ServiceScreen',
								},
							},
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
				{!PTSLoading && !PPPLoading && PPPData ? (
					<Button
						bg={'tertiary.500'}
						onPress={() => {
							CredentialPersonalProfileReactiveVar({
								...credentialPersonalProfileVar,
								PrivacyId: String(PPPData?.documents[0].id),
								ServiceId: String(PTSData?.documents[0].id),
							})
							navigation.navigate('CredentialNavigator', {
								screen: 'PersonalCredentialStack',
								params: {
									screen: 'EmailPhoneTabStack',
									params: {
										screen: 'PhoneScreen',
									},
								},
							})
						}}
						variant={'solid'}
						px={10}
						mb={2}
						rightIcon={<Icon color='white' as={Feather} name='arrow-right' size={30} />}
						size={'lg'}
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
