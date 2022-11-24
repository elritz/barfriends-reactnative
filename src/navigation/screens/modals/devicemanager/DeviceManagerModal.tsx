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

// TODO: FN(What functionality was suppose to be here)

export default function DeviceManagerModal() {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [selectedProfileId, setSelectedProfileId] = useState('')

	const { data, loading, error } = useGetADeviceManagerQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			if (data.getADeviceManager.__typename === 'DeviceManagerDeviceProfiles') {
				// What was meant to go here!!
			}
		},
	})

	const [switchDeviceProfileMutation, { data: SWDPData, loading: SWDPLoading, error: SWDPError }] =
		useSwitchDeviceProfileMutation({
			onCompleted: async data => {
				console.log(
					'🚀 ~ =====================+> data',
					data.switchDeviceProfile,
					'=====================+>',
				)
				if (data.switchDeviceProfile.__typename == 'DeviceManager') {
					const deviceManager = data.switchDeviceProfile as DeviceManager
					console.log(
						'🚀 ~ file: DeviceManagerModal.tsx ~ line 42 ~ DeviceManagerModal ~ deviceManager',
						deviceManager,
						'=================>',
					)
					AuthorizationReactiveVar(deviceManager)
					navigation.dispatch(StackActions.popToTop())
				}
			},
		})

	const handleSwitchProfile = item => {
		setSelectedProfileId(item.id)
		switchDeviceProfileMutation({
			variables: {
				profileId: item.Profile.id,
				profileType: item.Profile.profileType,
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
			const filteredDeviceProfiles = deviceProfiles.filter(item => {
				if (!item.Profile) {
					return null
				}
				if (!item.Profile.Personal && !item.Profile.Venue) {
					return item
				}
				return null
			})

			switchDeviceProfileMutation({
				variables: {
					profileId: filteredDeviceProfiles[0].Profile.id,
				},
			})
		}

		return (
			<SafeAreaView style={{ flex: 1, margin: 10 }}>
				<View style={[{ backgroundColor: themeContext.palette.primary.background.default, top: 0 }]}>
					<WithDeviceProfiles />
				</View>
				<View style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
						{filteredDeviceProfiles.map(item => {
							return (
								<Pressable
									key={item.id}
									onPress={() => (!item.isActive ? handleSwitchProfile(item) : logoutProfile(item))}
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
