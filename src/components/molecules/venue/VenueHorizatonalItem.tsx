import { Venue } from '@graphql/generated'
import { ItemRenderType } from '@types'
import { Avatar, Box, Heading, HStack } from 'native-base'
import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components/native'

const VenueHorizatonalItem = (props: ItemRenderType<Venue>) => {
	const themeContext = useContext(ThemeContext)
	const profile = props.item.Profile

	if (!profile) return null

	return (
		<Box
			// disabled={profileDisabled}
			// onPress={() => null}
			// ViewComponent={LinearGradient}
			// linearGradientProps={{
			// 	colors: [
			// 		profile?.Story[0]?.emojimood?.colors[0]
			// 			? profile?.Story[0]?.emojimood?.colors[0]
			// 			: 'black',
			// 		profile?.Story[0]?.emojimood?.colors[1]
			// 			? profile?.Story[0].emojimood?.colors[1]
			// 			: 'black',
			// 	],
			// 	start: { x: 0.2, y: 0 },
			// 	end: { x: 0.7, y: 1 },
			// }}
			// bottomDivider
			borderBottomWidth={2}
			style={{
				margin: 10,
				borderRadius: 14,
			}}
		>
			{profile.photos[0].url && (
				<Avatar
					borderRadius={'lg'}
					_image={{
						resizeMode: 'cover',
					}}
					style={{ height: 50, width: 50 }}
					source={{ uri: profile.photos[0].url }}
				>
					{profile.IdentifiableInformation.username.charAt(0)}
				</Avatar>
			)}
			<HStack>
				<Heading>{profile.IdentifiableInformation.username}</Heading>
			</HStack>
		</Box>
	)
}

export default VenueHorizatonalItem
