import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	Profile,
	useAddPersonalTotalsVenueMutation,
	useCurrentVenueLazyQuery,
	useProfileLazyQuery,
	useRemovePersonalTotalsVenueMutation,
} from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Heading, Button, VStack, Box, Icon, CheckIcon, CheckCircleIcon } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function TotalCard() {
	const route: any = useRoute()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isTotaled, setIsTotaled] = useState(false)

	const [
		addPersonalTotalsVenueMutation,
		{ data: APTVData, loading: APTVLoading, error: APTVError },
	] = useAddPersonalTotalsVenueMutation({
		variables: {
			profileIdPersonal: rAuthorizationVar.DeviceProfile.Profile?.id,
			profileIdVenue: route.params.profileId,
		},
		onCompleted: async data => {
			profileQuery({
				variables: {
					where: {
						id: rAuthorizationVar.DeviceProfile?.Profile.id,
					},
				},
				onCompleted: data => {
					if (data.profile) {
						const profile = data.profile as Profile
						AuthorizationReactiveVar({
							...rAuthorizationVar,
							DeviceProfile: {
								...rAuthorizationVar.DeviceProfile,
								Profile: profile,
							},
						})
						const totaledToVenue = data.profile.Personal.LiveOutPersonal.totaled.map(item => {
							return item.venueProfileId
						})

						setIsTotaled(totaledToVenue.includes(route.params.profileId))
					}
				},
			})
		},
		refetchQueries: [
			{
				query: GET_LIVE_VENUE_TOTALS_QUERY,
				variables: {
					profileIdVenue: route.params.profileId,
				},
			},
		],
	})
	const [
		removePersonalTotalsVenueMutation,
		{ data: RPTVData, loading: RPTVLoading, error: RPTVError },
	] = useRemovePersonalTotalsVenueMutation({
		variables: {
			profileIdPersonal: rAuthorizationVar.DeviceProfile.Profile?.id,
			profileIdVenue: route.params.profileId,
		},

		onCompleted: async data => {
			profileQuery({
				variables: {
					where: {
						id: rAuthorizationVar.DeviceProfile.Profile?.id,
					},
				},
				onCompleted: data => {
					if (data.profile) {
						const profile = data.profile as Profile
						AuthorizationReactiveVar({
							...rAuthorizationVar,
							DeviceProfile: {
								...rAuthorizationVar.DeviceProfile,
								Profile: profile,
							},
						})
						const totaledToVenue = data.profile.Personal.LiveOutPersonal.totaled.map(item => {
							return item.venueProfileId
						})

						setIsTotaled(totaledToVenue.includes(route.params.profileId))
					}
				},
			})
		},
		refetchQueries: [
			{
				query: GET_LIVE_VENUE_TOTALS_QUERY,
				variables: {
					profileIdVenue: route.params.profileId,
				},
			},
		],
	})

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery()

	useEffect(() => {
		if (rAuthorizationVar.DeviceProfile.Profile.Personal) {
			const totaledToVenue =
				rAuthorizationVar.DeviceProfile.Profile?.Personal?.LiveOutPersonal?.totaled.map(item => {
					return item.venueProfileId
				})

			setIsTotaled(totaledToVenue.includes(route.params.profileId))
		}
	}, [])

	return (
		<VStack>
			<Box>
				<Button
					onPress={() => {
						if (rAuthorizationVar.DeviceProfile) {
							!isTotaled ? addPersonalTotalsVenueMutation() : removePersonalTotalsVenueMutation()
						}
					}}
					bg={'blue.500'}
					width={'full'}
					borderRadius={'lg'}
					textAlign={'center'}
					_text={{
						fontWeight: '700',
						fontSize: 'md',
					}}
					w={'100'}
					rightIcon={isTotaled && <CheckCircleIcon size='5' mt='0.5' color='white' />}
				>
					{!APTVLoading ? <>{isTotaled ? 'Totaled' : 'Total'}</> : 'Totaling'}
				</Button>
			</Box>
		</VStack>
	)
}
