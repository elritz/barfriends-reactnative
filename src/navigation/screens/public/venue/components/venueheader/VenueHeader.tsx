import { useCurrentVenueQuery } from '@graphql/generated'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Box, Heading, Image } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	profileId: string
}

const VenueHeader = (props: Props) => {
	const HEADER_IMAGE_HEIGHT = 235
	const { width } = useWindowDimensions()
	const colorScheme = useThemeColorScheme()

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
	console.log(venueData)
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
				source={{ uri: venueData?.photos[0].url }}
				style={{
					position: 'absolute',
					width: width,
					height: HEADER_IMAGE_HEIGHT,
				}}
				alt={'Profile Photo'}
			/>
			<BlurView tint={colorScheme} intensity={40} style={{ padding: 5 }}>
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
