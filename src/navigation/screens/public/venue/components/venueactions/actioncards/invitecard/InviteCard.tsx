import ActionCard from '../../ActionCard'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { Heading } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'

export default function InviteCard() {
	return (
		<Heading lineHeight={'xs'} size={'md'} fontWeight={'black'} textTransform={'uppercase'}>
			Invite!
		</Heading>
	)
}
