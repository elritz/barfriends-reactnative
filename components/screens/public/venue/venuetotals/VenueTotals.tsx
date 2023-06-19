import { Heading } from '@components/core'
import { useGetLiveVenueTotalsQuery } from '@graphql/generated'
import { useSearchParams } from 'expo-router'
import { uniqueId } from 'lodash'
import { Box, HStack, Text } from 'native-base'
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
	const params = useSearchParams()
	const { width } = useWindowDimensions()
	const numColumns = 3
	const height = width * (1.15 / numColumns)
	const itemPadding = (width / 33.33) * numColumns

	const [total, setTotal] = useState<Totals>({ name: 'total', value: 0 })
	const [friends, setFriends] = useState<Totals>({ name: 'friends', value: 0 })
	const [joined, setJoined] = useState<Totals>({ name: 'joined', value: 0 })

	const { data, loading, error } = useGetLiveVenueTotalsQuery({
		skip: !String(params.profileid),
		variables: {
			profileIdVenue: String(params.profileid),
		},
		onCompleted: async data => {
			if (data.getLiveVenueTotals) {
				setTotal({
					...total,
					value: data.getLiveVenueTotals.totaled ? data.getLiveVenueTotals.totaled.length : 0,
				})
				setJoined({
					...joined,
					value: data.getLiveVenueTotals.joined ? data.getLiveVenueTotals.joined.length : 0,
				})
			}
		},
	})

	return (
		<HStack
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',
			}}
			mt={3}
			mx={1}
		>
			{[friends, total, joined].map((item, index) => {
				return (
					<Box
						key={uniqueId()}
						_light={{
							bg: item.name !== 'friends' ? 'light.200' : 'primary.600',
							opacity: loading ? 50 : 100,
						}}
						_dark={{
							bg: item.name !== 'friends' ? 'dark.50' : 'primary.600',
							opacity: loading ? 50 : 100,
						}}
						borderRadius={'xl'}
						style={{
							height: 55,
							width: (width - itemPadding) / 3,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Heading
							numberOfLines={1}
							allowFontScaling
							minimumFontScale={0.5}
							fontSize={'$lg'}
							lineHeight={'$xs'}
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
