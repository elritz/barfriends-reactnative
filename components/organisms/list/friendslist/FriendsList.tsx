import { useReactiveVar } from '@apollo/client'
import { Box, Divider, HStack } from '@components/core'
import { CardFullImageNameEmoji } from '@components/molecules/personal/CardFullImageNameEmoji'
import { FriendsListEmptyState } from '@components/screens/profile/friendslist/FriendsListEmptyState'
import { AuthorizationReactiveVar } from '@reactive'
import { useWindowDimensions } from 'react-native'

const numColumns = 3

export const FriendsList = ({}) => {
	const { width } = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const cardWidth = (width * 0.9) / numColumns

	const friendslist = rAuthorizationVar?.DeviceProfile?.Profile?.Relationships
	if (!friendslist) return null

	return (
		<Box
			flex={1}
			sx={{
				w: '100%',
				h: '100%',
			}}
			flexDirection={'column'}
		>
			{friendslist.length ? (
				<>
					<HStack justifyContent={'flex-start'} flexWrap={'wrap'}>
						{friendslist.map((item, index) => {
							return <CardFullImageNameEmoji key={index} cardWidth={cardWidth} item={item} />
						})}
					</HStack>
					<Divider style={{ marginVertical: 20 }} />
				</>
			) : (
				<FriendsListEmptyState />
			)}
		</Box>
	)
}
