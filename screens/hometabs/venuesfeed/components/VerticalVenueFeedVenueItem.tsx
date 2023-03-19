import { ProfileVenue } from '@graphql/generated'
// import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Image, VStack, Box, Heading } from 'native-base'
import { useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

const width = Dimensions.get('window').width / 2.15

type Props = {
	item: ProfileVenue
	loading: boolean
}

const VerticalVenueFeedVenueItem = (props: Props) => {
	const router = useRouter()
	const [hideBlur, setHideBlur] = useState(false)
	if (!props.item || props.loading) return null

	const getTitleCase = str => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map(word => {
				return word.charAt(0).toUpperCase() + word.slice(1)
			})
			.join(' ')

		return titleCase
	}

	return (
		<Pressable
			key={props.item.id}
			onPress={() => {
				router.push({
					pathname: `(app)/publicnavigator/venue/${props.item.id}`,
					params: {
						profileId: String(props.item.id),
						distanceInM: Number(props.item.distanceInM),
						latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
						longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
					},
				})
			}}
		>
			<VStack
				space={2}
				width={width}
				borderRadius={'lg'}
				style={{
					justifyContent: 'flex-end',
					overflow: 'hidden',
				}}
			>
				<Box minH={260} maxH={260}>
					{!props.loading ? (
						<Image
							borderRadius={'lg'}
							source={{ uri: props.item.photos[0]?.url }}
							resizeMode='cover'
							onLoadEnd={() => setHideBlur(true)}
							style={{
								...StyleSheet.absoluteFillObject,
								width: undefined,
								height: undefined,
							}}
							alt={'Profile Photo'}
						/>
					) : null}
					{!hideBlur && (
						<>
							{props.item.photos[0]?.blurhash && (
								<Blurhash
									blurhash={String(props.item.photos[0].blurhash)}
									style={{
										flex: 1,
									}}
								/>
							)}
						</>
					)}
				</Box>
				<Box>
					<Heading
						size={'sm'}
						fontWeight={'bold'}
						textAlign={'left'}
						numberOfLines={2}
						ellipsizeMode='tail'
					>
						{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
					</Heading>
				</Box>
			</VStack>
		</Pressable>
	)
}

export default VerticalVenueFeedVenueItem
