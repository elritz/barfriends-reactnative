import { CardFullImageNameEmoji } from '@components/molecules/personal/CardFullImageNameEmoji'
import { EmptyStateFriendsList } from '@navigation/screens/hometabs/profile/EmptyStateFriendsList/EmptyStateFriendsList'
import { Box, Heading, VStack } from 'native-base'
import { useWindowDimensions } from 'react-native'

const numColumns = 3
const friends = []

export const FriendsList = ({}) => {
	const { width, height } = useWindowDimensions()

	const cardWidth = width / numColumns

	return (
		<Box flex={1} width={'100%'} height={'100%'} flexDirection={'column'} my={4}>
			{friends.length ? (
				<>
					<Heading fontSize={'xl'} style={{}}>
						FRIENDS
					</Heading>
					<VStack flexWrap={'wrap'}>
						{friends.map(item => {
							return <CardFullImageNameEmoji cardWidth={cardWidth} item={item} />
						})}
					</VStack>
				</>
			) : (
				<EmptyStateFriendsList />
			)}
		</Box>
	)
}
