import { PUBLIC_VENUE_HEADER_IMAGE_HEIGHT } from '@constants/Layout'
import { Photo } from '@graphql/generated'
import { Box, Image } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	loading: boolean
	photos: Array<Photo> | undefined
}

const VenueHeader = (props: Props) => {
	const { width } = useWindowDimensions()

	if (props.loading || !props.photos?.length) {
		return (
			<Box
				style={{
					flexDirection: 'column',
					justifyContent: 'flex-end',
					height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
					overflow: 'hidden',
				}}
				_light={{
					bg: 'light.100',
				}}
				_dark={{
					bg: 'dark.50',
				}}
			/>
		)
	}

	return (
		<Box
			style={{
				flexDirection: 'column',
				justifyContent: 'flex-end',
				height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
				overflow: 'hidden',
			}}
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.50',
			}}
		>
			<Image
				source={{ uri: props.photos[0].url }}
				style={{
					width: width,
					height: PUBLIC_VENUE_HEADER_IMAGE_HEIGHT,
				}}
				alt={'Venue Profile Photo'}
			/>
		</Box>
	)
}

export default VenueHeader
