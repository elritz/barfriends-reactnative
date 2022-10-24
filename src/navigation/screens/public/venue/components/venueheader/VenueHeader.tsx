import { useReactiveVar } from '@apollo/client'
import { useCurrentVenueQuery, useProfileQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import { BlurView } from 'expo-blur'
import { Box, Heading } from 'native-base'
import React from 'react'
import { Image, useWindowDimensions } from 'react-native'

type Props = {
	profileId: string
}

const VenueHeader = (props: Props) => {
	const HEADER_IMAGE_HEIGHT = 235
	const { width } = useWindowDimensions()
	const theme = useReactiveVar(ThemeReactiveVar)

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !props.profileId,
		variables: {
			where: {
				id: props.profileId,
			},
		},
		onCompleted: data => {},
	})

	if (loading) {
		return (
			<Box
				style={{
					flexDirection: 'column',
					justifyContent: 'flex-end',
					height: HEADER_IMAGE_HEIGHT,
					overflow: 'hidden',
				}}
				borderBottomLeftRadius={'xl'}
				borderBottomRightRadius={'xl'}
			/>
		)
	}

	const venueData = data?.profile
	const name = venueData?.IdentifiableInformation?.fullname
	const username = venueData?.IdentifiableInformation.username

	return (
		<Box
			style={{
				flexDirection: 'column',
				justifyContent: 'flex-end',
				height: HEADER_IMAGE_HEIGHT,
				overflow: 'hidden',
			}}
		>
			<Image
				style={{
					position: 'absolute',
					width: width,
					height: HEADER_IMAGE_HEIGHT,
				}}
				source={{ uri: venueData?.photos[0].url }}
			/>
			<BlurView tint={theme} intensity={40} style={{ padding: 5 }}>
				<Heading size={'xl'} numberOfLines={1}>
					{name}
				</Heading>
				<Heading size={'sm'} numberOfLines={1}>
					@{username}
				</Heading>
			</BlurView>
		</Box>
	)
}

export default VenueHeader
