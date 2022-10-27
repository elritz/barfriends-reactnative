import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import ProfilingProfileItemLarge from '@components/molecules/authorization/profilingprofileitem/ProfilingProfileItem'
import { useAuthorizedProfilesQuery } from '@graphql/generated'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Text } from 'native-base'
import React, { useContext } from 'react'
import { SafeAreaView, View, ScrollView, Pressable } from 'react-native'
import { LoginStackParamList } from 'src/types/app'
import styled, { ThemeContext } from 'styled-components/native'

export type DeviceManagerScreenRouteProp = RouteProp<LoginStackParamList, 'DeviceManagerScreen'>

export default function DeviceManagerScreen() {
	const navigation = useNavigation()
	const route = useRoute<DeviceManagerScreenRouteProp>()
	const themeContext = useContext(ThemeContext)

	const { data, loading, error } = useAuthorizedProfilesQuery({
		skip: !route.params.authenticator,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				Profiles: [
					{
						email: route.params.authenticator,
						Phone: {
							number: route.params.authenticator.replace(/\D/g, ''),
						},
					},
				],
			},
		},
	})

	const navigateToLogin = item => {
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'PasswordLoginScreen',
				params: {
					profile: item.id,
				},
			},
		})
	}

	if (loading) return null

	if (data.authorizedProfiles.__typename === 'ErrorProfiling') {
		return (
			<View style={[{ backgroundColor: themeContext.palette.primary.background, top: 0 }]}>
				<RNEHeading800>Error finding profiles</RNEHeading800>
			</View>
		)
	}
	if (data.authorizedProfiles.__typename === 'ProfileTypesResponse') {
		const emailProfiles = data.authorizedProfiles.phone
		const phoneProfiles = data.authorizedProfiles.email
		const finalProfileArray = [...new Set([...emailProfiles, ...phoneProfiles])]

		return (
			<SafeAreaView style={{ flex: 1, margin: 10 }}>
				<View style={[{ backgroundColor: themeContext.palette.primary.background, top: 0 }]}>
					<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
						Your profiles
					</Text>
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					keyboardDismissMode='none'
				>
					{finalProfileArray.map(item => {
						return (
							<Pressable key={item.id} onPress={() => navigateToLogin(item)}>
								<ProfilingProfileItemLarge item={item} />
							</Pressable>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		)
	}
}
