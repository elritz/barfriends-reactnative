import { Box, Heading } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native'

export default function ForegroundLocationPermissionHalfSection() {
	const { width } = useWindowDimensions()
	return (
		<Box
			width={width / 2.1}
			height={200}
			flexDirection={'column'}
			justifyContent={'center'}
			p={3}
			margin={width * 0.01}
			borderRadius={'lg'}
		>
			<Heading textTransform={'uppercase'} lineHeight={'xs'} size={'md'} fontWeight={'black'}>
				Enable location to join!
			</Heading>
		</Box>
	)
}
