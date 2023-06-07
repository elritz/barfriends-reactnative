import { Maybe, Photo } from '@graphql/generated'
import { Box, Image } from 'native-base'
import { useWindowDimensions } from 'react-native'

type Props = {
	photo: Maybe<Photo> | undefined
}

export default function ProfilePhoto({ photo }: Props) {
	const { width } = useWindowDimensions()
	const margin = 12
	if (!photo?.id) {
		return <></>
	}

	return (
		<Box
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.100',
			}}
			h={150}
			w={150}
			borderRadius={'md'}
			overflow={'hidden'}
			mb={3}
		>
			<Image
				source={{
					uri: photo?.url,
				}}
				// placeholder={photo?.blurhash}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		</Box>
	)
}
