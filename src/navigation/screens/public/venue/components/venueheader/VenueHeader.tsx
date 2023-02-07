import { Photo } from '@graphql/generated'
import { Box, Image } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	loading: boolean
	photos: Array<Photo> | undefined
}

const HEADER_IMAGE_HEIGHT = 195

const VenueHeader = (props: Props) => {
	const { width } = useWindowDimensions()

	if (props.loading || !props.photos?.length) {
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
				source={{ uri: props.photos[0].url }}
				style={{
					width: width,
					height: HEADER_IMAGE_HEIGHT,
				}}
				alt={'Venue Profile Photo'}
			/>
		</Box>
	)
}

export default VenueHeader
