import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { CardFullImageNameEmoji } from '@components/molecules/personal/CardFullImageNameEmoji'
import { EmptyStateFriendsList } from '@navigation/screens/hometabs/profile/EmptyStateFriendsList/EmptyStateFriendsList'
import { VStack } from 'native-base'
import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

const numColumns = 3
const friends = []

export const FriendsList = ({}) => {
	const { width, height } = useWindowDimensions()

	const cardWidth = width / numColumns

	return (
		<OuterView>
			{friends.length ? (
				<>
					<RNEHeading800 style={{}}>FRIENDS</RNEHeading800>
					<VStack flexWrap={'wrap'}>
						{friends.map(item => {
							return <CardFullImageNameEmoji cardWidth={cardWidth} item={item} />
						})}
					</VStack>
				</>
			) : (
				<EmptyStateFriendsList />
			)}
		</OuterView>
	)
}

const OuterView = styled.View`
	flex: 1;
	width: 100%;
	height: 100%;
	flex-direction: column;
	margin-vertical: 15px;
`
