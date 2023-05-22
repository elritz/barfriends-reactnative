import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import { useAddPersonalJoinsVenueMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'

export default function JoinVenue() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')
	const [isJoined, setIsJoined] = useState(false)

	const [addJoinVenueMutation, { data: AJVData, loading: AJVLoading, error: AJVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: String(params.profileid),
				profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
			},
			onCompleted: async data => {},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileIdVenue: params.profileid,
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
			isLoading={AJVLoading}
			onPress={() => {
				addJoinVenueMutation()
			}}
			width={'full'}
			colorScheme={'primary'}
			borderRadius={'md'}
			textAlign={'center'}
			_text={{
				fontWeight: '700',
				fontSize: 'md',
			}}
		>
			Join
		</Button>
	)
}
