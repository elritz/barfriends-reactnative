import { useReactiveVar } from '@apollo/client'
import DeviceManagerProfileItemLarge from '@components/molecules/authorization/devicemanagerprofileitem/DeviceManagerProfileItemLarge'
import {
	DeviceManager,
	ProfileType,
	useGetADeviceManagerQuery,
	useSwitchDeviceProfileMutation,
} from '@graphql/generated'
import GetSignInUpText from '@helpers/data/SignupinText'
import { AuthorizationReactiveVar } from '@reactive'
import { Center } from 'native-base'
import { useState } from 'react'
import { Pressable } from 'react-native'

const text = GetSignInUpText()

const DeviceManagerProfiles = () => {
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
				}
			},
		})

	const logoutProfile = item => {
		setSelectedProfileId(item.Profile.id)
		switchDeviceProfileMutation()
	}

	const switchProfile = item => {
		setSelectedProfileId(item.Profile.id)
		switchDeviceProfileMutation({
			variables: {
				profileId: item.Profile.id,
				profileType: item.Profile.profileType,
			},
		})
	}

	if (loading) {
		return null
	}

	if (data.getADeviceManager.__typename === 'Error') {
		return null
	}

	if (data.getADeviceManager.__typename === 'DeviceManagerDeviceProfiles') {
		const deviceProfiles = data.getADeviceManager.DeviceProfiles
		return (
			<Center>
				{deviceProfiles.map((item, index) => {
					// if (item.Profile?.Personal.Profile.ProfileType === ProfileType.Guest) return null
					return (
						<Pressable
							key={item.id}
							onPress={() => (!item.isActive ? switchProfile(item) : logoutProfile(item))}
						>
							{/* <DeviceManagerProfileItemLarge
								item={item.Profile}
								isActive={item.isActive}
								loading={SWDPLoading}
								selectedProfileId={selectedProfileId}
							/> */}
						</Pressable>
					)
				})}
			</Center>
		)
	}
}
export default DeviceManagerProfiles
