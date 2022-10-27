import { VenueScreenRouteProp } from '../../Venue'
import { useGetLiveVenueTotalsQuery } from '@graphql/generated'
import { useRoute } from '@react-navigation/native'
import { Box, Heading, HStack, Text } from 'native-base'
import React, { useContext, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ThemeContext } from 'styled-components/native'

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
	const themeContext = useContext(ThemeContext)
	const { width } = useWindowDimensions()
	const numColumns = 3
	const height = width * (1.15 / numColumns)
	const itemPadding = (width / 33.33) * numColumns

	const [total, setTotal] = useState<Totals>({ name: 'total', value: 0 })
	const [friends, setFriends] = useState<Totals>({ name: 'friends', value: 0 })
	const [joined, setJoined] = useState<Totals>({ name: 'joined', value: 0 })

	const { data, loading, error } = useGetLiveVenueTotalsQuery({
		skip: !route.params.profileId,
		fetchPolicy: 'network-only',
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
				height: 100,
				flexDirection: 'row',
				justifyContent: 'space-around',
				marginVertical: 10,
				marginHorizontal: 5,
			}}
		>
			{[friends, total, joined].map(item => {
				return (
					<Box
						key={item.name}
						_light={{
							bg: item.name !== 'friends' ? 'light.50' : 'primary.600',
						}}
						_dark={{
							bg: item.name !== 'friends' ? 'light.900' : 'primary.600',
						}}
						style={{
							height: 100,
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
							size={'2xl'}
							style={{ fontWeight: '900', letterSpacing: 0.01 }}
						>
							{item.value}
						</Heading>
						<Text fontWeight={'black'} fontSize={'xs'} style={{ textTransform: 'uppercase' }}>
							{item.name}
						</Text>
					</Box>
				)
			})}
		</HStack>
	)
}
