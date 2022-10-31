import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { Text } from '@rneui/base'
import { useForegroundPermissions } from 'expo-location'
import { Box, Heading } from 'native-base'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

export default function LocationPermissionHalfSection() {
	const [status, requestPermission] = useForegroundPermissions()
	const { width } = useWindowDimensions()
	return (
		<Box
			width={width / 2.1}
			flexDir={'column'}
			justifyContent={'center'}
			p={3}
			m={width * 0.01}
			borderRadius={10}
		>
			<Heading textTransform={'uppercase'} lineHeight={'xs'} size={'md'} fontWeight={'black'}>
				Enable location to join!
			</Heading>
		</Box>
	)
}
