import { Personal } from '@graphql/generated'
import { Avatar, ListItem } from '@rneui/base'
import { ItemRenderType } from '@types'
import { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

// TODO: UX() Descide if we keeping this item and are using this item

const PersonalHorizatonalItem = (props: ItemRenderType<Personal>) => {
	const themeContext = useContext(ThemeContext)
	const [profileDisabled, setprofileDisabled] = useState<boolean>(true)
	const profile = props.item.Profile

	if (!profile) return null

	return (
		<ListItem
			disabled={profileDisabled}
			onPress={() => console.log('TDO')}
			// ViewComponent={LinearGradient}
			// linearGradientProps={{
			// 	colors: [
			// 		profile?.Story[0]?.emojimood?.colors[0]
			// 			? profile?.Story[0]?.emojimood?.colors[0]
			// 			: themeContext.palette.quaternary.background,
			// 		profile?.Story[0]?.emojimood?.colors[1]
			// 			? profile?.Story[0].emojimood?.colors[1]
			// 			: themeContext.palette.quaternary.background,
			// 	],
			// 	start: { x: 0.2, y: 0 },
			// 	end: { x: 0.7, y: 1 },
			// }}
			bottomDivider
			containerStyle={{
				margin: 10,
				borderRadius: 14,
			}}
		>
			{profile.photos[0].url && (
				<Avatar
					imageProps={{
						borderRadius: 14,
						resizeMode: 'cover',
					}}
					containerStyle={{ height: 50, width: 50 }}
					source={{ uri: profile.photos[0].url }}
					title={profile.Personal.IdentifiableInformation.username.charAt(0)}
				/>
			)}
			<ListItem.Content>
				<ListItem.Title
					style={{
						color: themeContext.palette.secondary.color.primary,
					}}
				>
					{profile.Personal.IdentifiableInformation.username}
				</ListItem.Title>
			</ListItem.Content>
			{/* {props.loading && ME?.activeProfile?.username === profile.Credential?.username ? (
				<ActivityIndicator size='small' color={themeContext.palette.primary.color.tertiary} />
			) : (
				<>
					{ME?.activeProfile?.username === profile.Credential?.username ? (
						<Ionicons name='checkmark-circle' size={24} color='green' />
					) : (
						<ListItem.Chevron size={26} color={themeContext.palette.secondary.color.primary} />
					)}
				</>
			)} */}
		</ListItem>
	)
}

export default PersonalHorizatonalItem
