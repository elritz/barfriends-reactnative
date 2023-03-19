import { Profile } from '@graphql/generated'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { Image, VStack } from 'native-base'
import { Box, Heading } from 'native-base'
import { useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'

const width = Dimensions.get('window').width / 2.15

const height = 280

type Props = {
	item: Profile
	loading: boolean
}

const HorizontalVenueFeedVenueItem = (props: Props) => {
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
					pathname: '(app)/public/venue',
					params: {
						profileid: String(props.item.id),
						latitude: Number(props.item.Venue?.Location?.Geometry?.latitude),
						longitude: Number(props.item.Venue?.Location?.Geometry?.longitude),
					},
				})
			}}
		>
			<VStack
				space={2}
				mx={2}
				// width={'full'}
				borderRadius={'lg'}
				style={{
					justifyContent: 'flex-end',
					overflow: 'hidden',
				}}
			>
				<Box minH={190} maxH={190}>
					<Box
						style={{
							height: '100%',
							width: '100%',
						}}
						zIndex={10}
					>
						<BlurView
							style={{ position: 'absolute', bottom: 0, width: '100%', height: 80 }}
							tint={'dark'}
							intensity={50}
						/>
						<Heading
							size={'md'}
							fontWeight={'black'}
							letterSpacing={'xs'}
							textAlign={'left'}
							numberOfLines={2}
							ellipsizeMode='tail'
						>
							{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
						</Heading>
					</Box>
					{!props.loading ? (
						<Image
							position={'absolute'}
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
			</VStack>
		</Pressable>
	)
}

export default HorizontalVenueFeedVenueItem
