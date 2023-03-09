import { useReactiveVar } from '@apollo/client'
import { GET_LIVE_VENUE_TOTALS_QUERY } from '@graphql/DM/profiling/out/index.query'
import { useAddPersonalJoinsVenueMutation } from '@graphql/generated'
import { AuthorizationReactiveVar } from '@reactive'
import { useSearchParams } from 'expo-router'
import { Heading, Button, VStack } from 'native-base'
import { useEffect, useState } from 'react'

// TODO: FN(Join a venue functionality) The join button has no ability to join a venue or track the data

export default function JoinCard() {
	const params = useSearchParams()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
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
		const totaledToVenue =
			rAuthorizationVar?.DeviceProfile?.Profile?.Personal?.LiveOutPersonal?.Out.map(item => {
				return item.venueProfileId
			})
		if (totaledToVenue) {
			setIsJoined(totaledToVenue.includes(String(params.profileid)))
		}
	}, [])

	return (
		<VStack alignItems={'center'} justifyContent={'space-around'} space={3}>
			<Heading fontSize={'md'} fontWeight={'900'} textAlign={'center'} textTransform={'uppercase'}>
				You've{'\n'}arrived!{'\n'}
				<Heading color={'green.500'} fontWeight={'900'}>
					join now
				</Heading>
			</Heading>
			<Button
				isLoading={AJVLoading}
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
