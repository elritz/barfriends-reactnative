import ActionCard from '../../ActionCard'
import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	AuthorizationDeviceManager,
	ClientDeviceProfile,
	Profile,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Heading, Button, VStack, Box, Icon } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function LeaveCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [outId, setOutId] = useState('')

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
					const deviceprofile = rAuthorizationVar?.DeviceProfile as ClientDeviceProfile
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
			<VStack alignItems={'center'} justifyContent={'space-around'} space={3} w={'full'}>
				<Heading fontSize={'md'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
					You're joined{'\n'}
					<Heading
						fontWeight={'900'}
						color={'red.600'}
						textAlign={'center'}
						textTransform={'uppercase'}
						fontSize={'lg'}
					>
						Leave now
					</Heading>
				</Heading>
				<Box>
					<Button
						onPress={() => {
							removePersonalJoinsVenueMutation()
						}}
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
			</VStack>
		)
	} else {
		return null
	}
}
