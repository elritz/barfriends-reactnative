// TODO: UX() Descide if we keeping this item and are using this item
// TODO: UX() No Profile photo show empty state
import { Box, HStack, Heading, Pressable } from '@components/core'
import { ItemRenderType } from '@ctypes/app'
import { Personal } from '@graphql/generated'
import { Image } from 'react-native'

const PersonalHorizatonalItem = (props: ItemRenderType<Personal>) => {
	const profile = props.item.Profile

	if (!profile) return null

	return (
		<Pressable>
			<Box
				bg='$transparent'
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
				borderBottomWidth={'$1'}
				sx={{
					m: 10,
				}}
				rounded={'$md'}
			>
				{profile.photos && profile?.photos[0].url && (
					<Image
						style={{
							borderRadius: 10,
							height: 50,
							width: 50,
						}}
						resizeMode={'cover'}
						source={{ uri: profile.photos[0].url }}
					/>
				)}
				<HStack>
					<Heading>{profile?.IdentifiableInformation?.username}</Heading>
				</HStack>
				{/* {props.loading && ME?.activeProfile?.username === profile.Credential?.username ? (
				<ActivityIndicator size='small' color={themeContext.palette.primary.color.tertiary} />
			) : (
				<>
					{ME?.activeProfile?.username === profile.Credential?.username ? (
						<Ionicons name='checkmark-circle' size={24} color='green' />
					) : (
						<ListItem.Chevron size={26} color={themeContext.palette.secondary.color.default} />
					)}
				</>
			)} */}
			</Box>
		</Pressable>
	)
}

export default PersonalHorizatonalItem
