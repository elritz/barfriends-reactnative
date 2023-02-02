import { VenueScreenRouteProp } from '../../Venue'
import { useGetLiveVenueTotalsQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { Box, Heading, HStack, Text } from 'native-base'
import { useState } from 'react'
import { useWindowDimensions } from 'react-native'

interface PeopleAtVenueType {
	friends: number
	joined: number
	total: number
}

type Totals = {
	name: 'friends' | 'total' | 'joined'
	value: number
}

export default function VenueTotals() {
	const route = useRoute<VenueScreenRouteProp>()
	const { width } = useWindowDimensions()
	const numColumns = 3
	const height = width * (1.15 / numColumns)
	const itemPadding = (width / 33.33) * numColumns

	const [total, setTotal] = useState<Totals>({ name: 'total', value: 0 })
	const [friends, setFriends] = useState<Totals>({ name: 'friends', value: 0 })
	const [joined, setJoined] = useState<Totals>({ name: 'joined', value: 0 })

	const { data, loading, error } = useGetLiveVenueTotalsQuery({
		skip: !route.params.profileId,
		variables: {
			profileIdVenue: route.params.profileId,
		},
		onCompleted: async data => {
			if (data.getLiveVenueTotals) {
				setTotal({ ...total, value: data.getLiveVenueTotals.totaled.length })
				setJoined({ ...joined, value: data.getLiveVenueTotals.joined.length })
			}
		},
	})

	return (
		<HStack
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',
			}}
			mt={4}
			mx={2}
		>
			{[friends, total, joined].map((item, index) => {
				return (
					<Box
						key={index}
						_light={{
							bg: item.name !== 'friends' ? 'light.200' : 'primary.600',
							opacity: loading ? 50 : 100,
						}}
						_dark={{
							bg: item.name !== 'friends' ? 'dark.100' : 'primary.600',
							opacity: loading ? 50 : 100,
						}}
						style={{
							height: 65,
							width: (width - itemPadding) / 3,
							borderRadius: 17,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Heading
							numberOfLines={1}
							allowFontScaling
							minimumFontScale={0.5}
							size={'xl'}
							lineHeight={'xs'}
							style={{ fontWeight: '800', letterSpacing: 0.01 }}
						>
							{item.value}
						</Heading>
						<Text
							fontWeight={'black'}
							lineHeight={'xs'}
							fontSize={'xs'}
							style={{ textTransform: 'uppercase' }}
						>
							{item.name}
						</Text>
					</Box>
				)
			})}
		</HStack>
	)
}
