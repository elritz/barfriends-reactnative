import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import {
	useAddPersonalJoinsVenueMutation,
	useProfileLazyQuery,
	useRemovePersonalJoinsVenueMutation,
} from '@graphql/generated'
import { VenueScreenRouteProp } from '@navigation/screens/public/venue/Venue'
import { useRoute } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Heading, Button, VStack } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function JoinCard() {
	const route = useRoute<VenueScreenRouteProp>()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const [isJoined, setIsJoined] = useState(false)

	const [addJoinVenueMutation, { data: AJVData, loading: AJVLoading, error: AJVError }] =
		useAddPersonalJoinsVenueMutation({
			variables: {
				profileIdVenue: route.params.profileId,
				profileIdPersonal: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
			},
			onCompleted: async data => {
				if (data.addPersonalJoinsVenue) {
					profileQuery()
				}
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

	const [profileQuery, { data: PData, loading: PLoading, error: PError }] = useProfileLazyQuery({
		fetchPolicy: 'network-only',
		variables: {
			where: {
				id: {
					equals: String(rAuthorizationVar?.DeviceProfile?.Profile.id),
				},
			},
		},
	})

	useEffect(() => {
		const totaledToVenue =
			rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.totaled.map(item => {
				return item.venueProfileId
			})

		setIsJoined(totaledToVenue.includes(route.params.profileId))
	}, [])

	return (
		<VStack alignItems={'center'} justifyContent={'space-around'} space={3}>
			<Heading fontSize={'lg'} fontWeight={'800'} textAlign={'center'} textTransform={'uppercase'}>
				You've arrived!{'\n'}
				<Heading color={'green.500'} fontWeight={'900'}>
					join now
				</Heading>
			</Heading>
			<Button
				onPress={() => {
					addJoinVenueMutation()
				}}
				width={'full'}
				colorScheme={'primary'}
				borderRadius={'lg'}
				textAlign={'center'}
				_text={{
					fontWeight: '700',
					fontSize: 'md',
				}}
				w={'100'}
			>
				Join
			</Button>
		</VStack>
	)
}
