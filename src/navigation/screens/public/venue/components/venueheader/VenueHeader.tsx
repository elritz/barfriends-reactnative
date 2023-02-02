import { useCurrentVenueQuery } from '@graphql/generated'
import { Box, Image } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	profileId: string
}

const VenueHeader = (props: Props) => {
	const HEADER_IMAGE_HEIGHT = 195
	const { width } = useWindowDimensions()

	const { data, loading, error } = useCurrentVenueQuery({
		skip: !props.profileId,
		fetchPolicy: 'cache-first',
		variables: {
			where: {
				id: {
					equals: props.profileId,
				},
			},
		},
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
				_light={{
					bg: 'light.50',
				}}
				_dark={{
					bg: 'dark.50',
				}}
			/>
		)
	}

	const venueData = data?.profile

	return (
		<Box
			style={{
				flexDirection: 'column',
				justifyContent: 'flex-end',
				height: HEADER_IMAGE_HEIGHT,
				overflow: 'hidden',
			}}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'dark.50',
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
		</Box>
	)
}

export default VenueHeader
