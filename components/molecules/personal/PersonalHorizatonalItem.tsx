import { Personal } from '@graphql/generated'
import { ItemRenderType } from '@types'
import { Avatar, Box, Heading, HStack, Pressable } from 'native-base'
import { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

// TODO: UX() Descide if we keeping this item and are using this item

const PersonalHorizatonalItem = (props: ItemRenderType<Personal>) => {
	const themeContext = useContext(ThemeContext)
	const [profileDisabled, setprofileDisabled] = useState<boolean>(true)
	const profile = props.item.Profile

	if (!profile) return null

	return (
		<Pressable onPress={profileDisabled ? console.log('TODO:') : console.log('TODO:')}>
			<Box
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
				borderBottomWidth={1}
				m={'10px'}
				borderRadius={'lg'}
			>
				{profile.photos[0].url && (
					<Avatar
						borderRadius={'lg'}
						_image={{
							resizeMode: 'cover',
						}}
						height={'50px'}
						width={'50px'}
						source={{ uri: profile.photos[0].url }}
					>
						{profile.IdentifiableInformation.username.charAt(0)}
					</Avatar>
				)}
				<HStack>
					<Heading
						style={{
							color: themeContext.palette.secondary.color.default,
						}}
					>
						{profile.IdentifiableInformation.username}
					</Heading>
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