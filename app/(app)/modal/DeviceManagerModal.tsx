import WithDeviceProfiles from '@components/molecules/asks/signinup'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	ClientDeviceManager,
	ClientDeviceProfile,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { Skeleton } from 'native-base'
import { Box, Pressable, VStack } from 'native-base'
import { useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'

// TODO: FN(What functionality was suppose to be here)

export default function DeviceManagerModal() {
	const [profiles, setProfiles] = useState<Array<ClientDeviceProfile>>([])
	const router = useRouter()

	const { loading } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onError: error => {},
		onCompleted: data => {
			if (data.getADeviceManager?.__typename === 'DeviceManagerDeviceProfiles') {
				const deviceProfiles = data?.getADeviceManager?.DeviceProfiles as Array<ClientDeviceProfile>
				setProfiles(deviceProfiles)
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: data => {
				if (data?.switchDeviceProfile?.__typename === 'ClientDeviceManager') {
					const deviceManager = data.switchDeviceProfile as ClientDeviceManager
					AuthorizationReactiveVar(deviceManager)
					setTimeout(
						() =>
							router.push({
								pathname: '(app)/hometab',
							}),
						1000,
					)
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

	return (
		<SafeAreaView style={{ flex: 1, margin: 10 }}>
			<Box>
				<WithDeviceProfiles />
			</Box>
			<View style={{ flex: 1 }}>
				{loading ? (
					<VStack my={5} space={2} rounded='md' px={2}>
						{[...Array(3)].map(item => {
							return <Skeleton rounded='xl' h='80px' w={'100%'} />
						})}
					</VStack>
				) : (
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
												/>
											</Pressable>
										)
									}
								})}
							</>
						) : null}
					</ScrollView>
				)}
			</View>
		</SafeAreaView>
	)
}
