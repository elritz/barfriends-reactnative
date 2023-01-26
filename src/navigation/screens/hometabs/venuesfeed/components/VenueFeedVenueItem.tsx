import { Profile } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Image, VStack } from 'native-base'
import { Box, Heading, Text } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet } from 'react-native'
import { Blurhash } from 'react-native-blurhash'
import { ThemeContext } from 'styled-components/native'

const margin = 2
const borderRadius = 5
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
						<Blurhash
							blurhash={String(props.item.photos[0].blurhash)}
							style={{
								flex: 1,
							}}
						/>
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

/* <View
					style={{
						backgroundColor: themeContext.palette.background.paper,
						flexDirection: 'column',
						justifyContent: 'space-around',
						paddingVertical: 5,
					}}
				> */

/* <BlurView
					intensity={60}
					tint={colorScheme}
					style={{
						justifyContent: 'space-around',
						height: 65,
					}}
				>
					<Heading
						color={'black'}
						size={'md'}
						fontWeight={'700'}
						textAlign={'center'}
						numberOfLines={2}
						alignSelf={'center'}
						ellipsizeMode='tail'
					>
						{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
					</Heading>
				</BlurView> */
