import { useReactiveVar } from '@apollo/client'
import WithDeviceProfiles from '@components/molecules/asks/signinup/withdeviceprofiles/WithDeviceProfiles'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	DeviceManager,
	DeviceProfile,
	Profile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { StackActions, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Pressable } from 'native-base'
import { useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'

// TODO: FN(What functionality was suppose to be here)

export default function DeviceManagerModal() {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<DeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
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

	if (!rAuthorizationVar || loading) {
		return null
	}

	return (
		<SafeAreaView style={{ flex: 1, margin: 10 }}>
			<Box>
				<WithDeviceProfiles />
			</Box>
			<View style={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
					{profiles.length ? (
						<>
							{profiles?.map((item, index) => {
								if (item.Profile?.ProfileType === ProfileType.Guest) {
									return null
								} else {
									return (
										<Pressable key={item.id} onPress={() => switchProfile(item)} w={'100%'} h={'80px'}>
											<DeviceManagerProfileItemLarge
												item={item.Profile}
												isActive={item.isActive}
												loading={SWDPLoading}
												selectedProfileId={rAuthorizationVar.DeviceProfile?.Profile?.id}
											/>
										</Pressable>
									)
								}
							})}
						</>
					) : null}
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
