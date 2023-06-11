// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	AuthorizationDeviceProfile,
	Profile,
	useCurrentVenueQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Heading, Button, Box, Icon, HStack } from 'native-base'
import { useEffect, useState } from 'react'

export default function LeaveCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !params.profileId,
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				id: {
					equals: String(params.profileid),
				},
			},
		},
		onCompleted: data => {
			const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
				item => item.venueProfileId === String(params.profileid),
			)

			if (out) {
				setOutId(out.id)
			}
		},
	})

	useEffect(() => {
		const out = rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.find(
			item => item.venueProfileId === String(params.profileid),
		)

		if (out) {
			setOutId(out.id)
		}
	}, [rAuthorizationVar])

	const [removePersonalJoinsVenueMutation, { data: JVData, loading: JVLoading, error: JVError }] =
		useRemovePersonalJoinsVenueMutation({
			variables: {
				outId,
			},
			onCompleted: async data => {
				if (data.removePersonalJoinsVenue) {
					const profile = data.removePersonalJoinsVenue as Profile
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
				}
			},
			refetchQueries: [
				{
					query: GET_LIVE_VENUE_TOTALS_QUERY,
					variables: {
						profileidVenue: params.profileid,
					},
				},
			],
		})

	if (
		rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out[0]?.venueProfileId ===
		params.profileid
	) {
		return (
			<HStack mt={5} alignItems={'center'} justifyContent={'space-between'} px={3} w={'full'}>
				<Heading fontSize={'md'} fontWeight={'800'} textTransform={'uppercase'}>
					You're joined{'\n'}
					<Heading fontWeight={'900'} color={'red.600'} textTransform={'uppercase'} fontSize={'lg'}>
						Want to Leave?
					</Heading>
				</Heading>
				<Box>
					<Button
						onPress={() => {
							removePersonalJoinsVenueMutation()
						}}
						h={'45px'}
						size={'xs'}
						textAlign={'center'}
						colorScheme={'error'}
						borderRadius={'md'}
						_text={{
							fontWeight: '700',
							fontSize: 'md',
						}}
						leftIcon={<Icon as={Ionicons} name={'ios-exit'} size={'xl'} />}
						isLoading={JVLoading}
						isLoadingText='Leaving'
					>
						Leave
					</Button>
				</Box>
			</HStack>
		)
	} else {
		return null
	}
}
