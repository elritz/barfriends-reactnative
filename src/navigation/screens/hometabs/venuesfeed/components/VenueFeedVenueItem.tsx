import { Profile } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Image, VStack } from 'native-base'
import { Box, Heading } from 'native-base'
import { useContext, useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'
import { ThemeContext } from 'styled-components/native'

const width = Dimensions.get('window').width / 2.15

const height = 280

type Props = {
	item: Profile
	loading: boolean
}

const VenueFeedVenueItem = (props: Props) => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const colorScheme = useThemeColorScheme()
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
				navigation.navigate('PublicNavigator', {
					screen: 'VenueStack',
					params: {
						screen: 'PublicVenueScreen',
						params: {
							profileId: String(props.item.id),
						},
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

export default VenueFeedVenueItem
