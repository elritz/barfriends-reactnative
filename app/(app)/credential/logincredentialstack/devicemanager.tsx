import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceManager,
	ProfileType,
	useAuthorizedProfilesQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter, useSearchParams } from 'expo-router'
import { Heading, Text } from 'native-base'
import { useContext, useState } from 'react'
import { SafeAreaView, View, ScrollView, Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

export default () => {
	const router = useRouter()
	const params = useSearchParams()
	const themeContext = useContext(ThemeContext)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useAuthorizedProfilesQuery({
		skip: !params.authenticator && !params.authenticator,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				profiles: {
					email: String(params.authenticator),
					Phone: {
						number: String(params.authenticator).replace(/\D/g, ''),
					},
				},
			},
		},
	})

	const navigateToLogin = item => {
		router.push({
			params: {
				profileid: item.id,
			},
			pathname: '(app)/credential/logincredentialstack/loginpassword',
		})
	}

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => router.replace('(app)'), 1000)
				}
			},
		})

	const switchProfile = item => {
		if (item.isActive) {
			const guestProfile = profiles.filter(item => item?.Profile?.ProfileType === ProfileType.Guest)

			setSelectedProfileId(String(guestProfile[0]?.Profile?.id))
			switchDeviceProfileMutation({
				variables: {
					profileId: String(guestProfile[0]?.Profile?.id),
					profileType: ProfileType.Guest,
				},
			})
		} else {
			setSelectedProfileId(item.Profile.id)
			switchDeviceProfileMutation({
				variables: {
					profileId: item.Profile.id,
					profileType: item.Profile.profileType,
				},
			})
		}
	}

	if (loading) {
		return <></>
	}

	if (data?.authorizedProfiles?.__typename === 'Error') {
		return (
			<View style={[{ backgroundColor: themeContext.palette.primary.background.default, top: 0 }]}>
				<Heading fontSize={'xl'}>Error finding profiles</Heading>
			</View>
		)
	}

	if (data?.authorizedProfiles?.__typename === 'ProfilesResponse') {
		const emailProfiles = data?.authorizedProfiles?.phone?.filter(item => {
			if (item.ProfileType === 'GUEST') {
				return null
			}
			return item
		})
		const phoneProfiles = data?.authorizedProfiles?.email?.filter(item => {
			if (item.ProfileType === 'GUEST') {
				return null
			}
			return item
		})

		const finalProfileArray = [...new Set([...emailProfiles, ...phoneProfiles])]

		return (
			<SafeAreaView style={{ flex: 1, margin: 10 }}>
				<View style={[{ backgroundColor: themeContext.palette.primary.background.default, top: 0 }]}>
					<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
						Your profiles
					</Text>
				</View>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					keyboardDismissMode='none'
					contentInset={{
						top: 20,
					}}
				>
					{finalProfileArray.map(item => {
						return (
							<Pressable key={item.id} onPress={() => navigateToLogin(item)}>
								<DeviceManagerProfileItemLarge isActive={false} item={item} />
							</Pressable>
						)
					})}
				</ScrollView>
			</SafeAreaView>
		)
	}
}
