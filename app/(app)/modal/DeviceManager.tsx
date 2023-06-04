// TODO: FN(What functionality was suppose to be here)
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
import { Skeleton } from 'native-base'
import { Box, Pressable, VStack } from 'native-base'
import { useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'

export default function DeviceManager() {
	const [profiles, setProfiles] = useState<Array<AuthorizationDeviceProfile>>([])
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const router = useRouter()

	const { loading } = useGetADeviceManagerQuery({
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
				},
			})
		} else {
			setSelectedProfileId(item.Profile.id)
			switchDeviceProfileMutation({
				variables: {
					profileId: item.Profile.id,
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
						{[...Array(3)].map((item, index) => {
							return (
								<Skeleton
									speed={0.95}
									_light={{
										startColor: 'coolGray.100',
										endColor: 'coolGray.300',
									}}
									_dark={{
										startColor: 'dark.200',
										endColor: 'dark.300',
									}}
									key={index}
									rounded='xl'
									h='80px'
									w={'100%'}
								/>
							)
						})}
					</VStack>
				) : (
					<>
						{profiles.length ? (
							<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
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
							</ScrollView>
						) : null}
					</>
				)}
			</View>
		</SafeAreaView>
	)
}
