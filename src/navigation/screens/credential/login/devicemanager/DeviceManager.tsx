import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	ClientDeviceManager,
	useAuthorizedProfilesQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Heading, Text } from 'native-base'
import { useContext, useState } from 'react'
import { SafeAreaView, View, ScrollView, Pressable } from 'react-native'
import { LoginStackParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

export type DeviceManagerScreenRouteProp = RouteProp<LoginStackParamList, 'DeviceManagerScreen'>

export default function DeviceManagerScreen() {
	const navigation = useNavigation()
	const route = useRoute<DeviceManagerScreenRouteProp>()
	const themeContext = useContext(ThemeContext)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useAuthorizedProfilesQuery({
		skip: !route.params.authenticator,
		fetchPolicy: 'network-only',
		variables: {
			where: {
				profiles: {
					email: route.params.authenticator,
					Phone: {
						number: route.params.authenticator.replace(/\D/g, ''),
					},
				},
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

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.switchDeviceProfile as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => navigation.dispatch(StackActions.popToTop()), 1000)
					// navigation.navigate('HomeTabNavigator', {
					// 	screen: 'VenueFeedStack',
					// 	params: {
					// 		screen: 'VenueFeedScreen',
					// 	},
					// })
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

	if (loading) return null

	if (data?.authorizedProfiles?.__typename === 'ErrorProfiling') {
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
