import { useReactiveVar } from '@apollo/client'
import WithDeviceProfiles from '@components/molecules/asks/signinup/withdeviceprofiles/WithDeviceProfiles'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	DeviceManager,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import { StackActions, useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import React, { useContext, useState } from 'react'
import { SafeAreaView, View, ScrollView, Pressable } from 'react-native'
import { ThemeContext } from 'styled-components/native'

export default function DeviceManagerModal() {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				if (data.switchDeviceProfile.__typename == 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					AuthorizationReactiveVar(deviceManager)
					navigation.dispatch(StackActions.popToTop())
				}
			},
		})

	const switchProfile = item => {
		setSelectedProfileId(item.id)
		switchDeviceProfileMutation({
			variables: {
				profileId: item.Profile.id,
			},
		})
	}

	if (!rAuthorizationVar || loading) {
		return null
	}
	if (data.getADeviceManager.__typename === 'DeviceManagerDeviceProfiles') {
		const deviceProfiles = data.getADeviceManager.DeviceProfiles

		const filteredDeviceProfiles = deviceProfiles.filter(item => {
			if (!item.Profile?.Personal && !item.Profile?.Venue) {
				return null
			}
			return item
		})

		const logoutProfile = item => {
			setSelectedProfileId(item.id)
			const filteredDeviceProfiles = deviceProfiles.filter(item => {
				if (!item.Profile?.Personal && !item.Profile?.Venue) {
					return item
				}
				return null
			})
			console.log(
				'🚀 ~ file: DeviceManagerModal.tsx ~ line 66 ~ filteredDeviceProfiles ~ filteredDeviceProfiles',
				filteredDeviceProfiles,
			)

			// switchDeviceProfileMutation({
			// 	variables: {
			// 		profileId: filteredDeviceProfiles[0].Profile.id,
			// 	},
			// })
		}

		return (
			<SafeAreaView style={{ flex: 1, margin: 10 }}>
				<View style={[{ backgroundColor: themeContext.palette.primary.background, top: 0 }]}>
					<WithDeviceProfiles />
				</View>
				<View style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
						{filteredDeviceProfiles.map(item => {
							return (
								<Pressable
									key={item.id}
									onPress={() => (!item.isActive ? switchProfile(item) : logoutProfile(item))}
								>
									<DeviceManagerProfileItemLarge
										isActive={item.isActive}
										item={item.Profile}
										loading={SWDPLoading}
										selectedProfileId={selectedProfileId}
									/>
								</Pressable>
							)
						})}
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
