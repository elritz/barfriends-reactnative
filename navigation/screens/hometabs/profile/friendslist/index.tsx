import { FriendsListEmptyState } from './FriendsListEmptyState'
import { useReactiveVar } from '@apollo/client'
import { CardFullImageNameEmoji } from '@components/molecules/personal/CardFullImageNameEmoji'
import { AuthorizationReactiveVar } from '@reactive'
import { Box, Divider, HStack } from 'native-base'
import { useWindowDimensions } from 'react-native'

const numColumns = 3

export const FriendsList = ({}) => {
	const { width } = useWindowDimensions()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const cardWidth = (width * 0.9) / numColumns

	const friendslist = rAuthorizationVar?.DeviceProfile?.Profile?.Relationships
	if (!friendslist) return null

	return (
		<Box flex={1} width={'100%'} height={'100%'} flexDirection={'column'}>
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
