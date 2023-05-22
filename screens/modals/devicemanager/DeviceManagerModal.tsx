import { useReactiveVar } from '@apollo/client'
import WithDeviceProfiles from '@components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Box, Pressable, ScrollView } from 'native-base'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// TODO: FN(What functionality was suppose to be here)

export default function DeviceManagerModal() {
	const router = useRouter()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager
					?.DeviceProfiles as Array<AuthorizationDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'AuthorizationDeviceManager') {
					const deviceManager = data.switchDeviceProfile as AuthorizationDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(() => {
						router.push({
							pathname: '(app)/hometab',
						})
					}, 1000)
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
			<Box style={{ flex: 1 }}>
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
			</Box>
		</SafeAreaView>
	)
}
