import RNEHeading600 from '@components/atoms/typography/RNETypography/heading/RNEHeading600'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { Text } from '@rneui/base'
import { useForegroundPermissions } from 'expo-location'
import { Heading } from 'native-base'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

export default function LocationPermissionHalfSection() {
	const [status, requestPermission] = useForegroundPermissions()
	const { width } = useWindowDimensions()
	return (
		<OuterView width={width}>
			<Heading textTransform={'uppercase'} lineHeight={'xs'} size={'md'} fontWeight={'black'}>
				Enable location to join!
			</Heading>
		</OuterView>
	)
}

const OuterView = styled.View<{ width: number }>(props => ({
	background: props.theme.palette.secondary.background,
	height: 200,
	width: props.width / 2.1,
	flexDirection: 'column',
	justifyContent: 'center',
	padding: 10,
	margin: props.width * 0.01,
	shadowRadius: 10,
	borderRadius: 16,
}))
