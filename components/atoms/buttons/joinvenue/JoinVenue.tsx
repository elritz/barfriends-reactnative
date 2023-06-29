import { useReactiveVar } from '@apollo/client'
import { Button, Text } from '@components/core'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useAddPersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

export default function JoinVenue() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')
	const [isJoined, setIsJoined] = useState(false)

	const [addPersonalJoinVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(params.profileid),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					const profile = data.addPersonalJoinsVenue as Profile
					const deviceManager = rAuthorizationVar as AuthorizationDeviceManager
					const deviceprofile = rAuthorizationVar?.DeviceProfile as AuthorizationDeviceProfile
					if (
						profile?.Personal?.LiveOutPersonal?.Out &&
						deviceprofile?.Profile?.Personal?.LiveOutPersonal
					) {
						AuthorizationReactiveVar({
							...deviceManager,
							DeviceProfile: {
								...deviceprofile,
								Profile: {
									...deviceprofile.Profile,
									Personal: {
										...deviceprofile.Profile.Personal,
										LiveOutPersonal: {
											...deviceprofile.Profile.Personal.LiveOutPersonal,
											Out: profile.Personal.LiveOutPersonal.Out,
										},
									},
								},
							},
						})
					}
					setIsJoined(true)
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileIdVenue: String(params.profileid),
					},
				},
			],
		})

	useEffect(() => {
		if (rAuthorizationVar?.DeviceProfile?.Profile?.Personal) {
			const joinedToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
					return item.venueProfileId
				})
			const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
				item => item.venueProfileId === params.profileid,
			)
			if (out) {
				setOutId(out.id)
			}
			if (joinedToVenue) {
				setIsJoined(joinedToVenue.includes(String(params.profileid)))
			}
		}
	}, [rAuthorizationVar, isJoined])

	return (
		<Button
			onPress={() => {
				addPersonalJoinVenueMutation()
			}}
			sx={{
				h: 45,
			}}
			isDisabled={isJoined}
			width={'$full'}
			rounded={'$md'}
		>
			<Text>{JVLoading ? 'Joining' : 'Join'}</Text>
		</Button>
	)
}
