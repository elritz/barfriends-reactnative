import { Profile } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Image } from 'native-base'
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
							profileId: props.item.id,
						},
					},
				})
			}}
		>
			<Box
				height={280}
				width={width}
				borderRadius={'lg'}
				style={{
					backgroundColor: themeContext.palette.secondary.background.default,
					justifyContent: 'flex-end',
					overflow: 'hidden',
				}}
			>
				{!props.loading ? (
					<Image
						source={{ uri: props.item.photos?.url }}
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
						blurhash={String(props.item.photos?.blurhash)}
						style={{
							flex: 1,
						}}
					/>
				)}
				{/* <View
					style={{
						backgroundColor: themeContext.palette.background.paper,
						flexDirection: 'column',
						justifyContent: 'space-around',
						paddingVertical: 5,
					}}
				> */}
				<BlurView
					intensity={60}
					tint={colorScheme}
					style={{
						justifyContent: 'space-around',
						height: 65,
					}}
				>
					<Heading
						color={'black'}
						size={'sm'}
						fontWeight={'700'}
						textAlign={'center'}
						numberOfLines={2}
						alignSelf={'center'}
						ellipsizeMode='tail'
					>
						{getTitleCase(props?.item?.IdentifiableInformation?.fullname)}
					</Heading>
					<Text textAlign={'center'} color={'black'} fontSize={'xl'}>
						{props.item.distance}
					</Text>
				</BlurView>
			</Box>
		</Pressable>
	)
}

export default VenueFeedVenueItem
