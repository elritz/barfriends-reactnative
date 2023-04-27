import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendRequestNotification } from '@graphql/generated'
import { Box } from 'native-base'

interface Props<T> {
	data: T[] | undefined | null
	renderItem: (item: FriendRequestNotification) => React.ReactNode
	keyExtractor: (item: T) => string
}

const CondensedVerticalFriendsNotficationsList = <T extends FriendRequestNotification>({
	data,
}: Props<T>) => {
	return (
		<>
			{data?.length ? (
				<Box
					_light={{
						bg: 'light.50',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					flex={1}
					h={'100%'}
					flexDir={'column'}
					borderRadius={'lg'}
					overflow={'hidden'}
				>
					{data.map((item, index) => (
						<CondensedHorizontalFriendNotifciation key={index} item={item} />
					))}
				</Box>
			) : null}
		</>
	)
}

export default CondensedVerticalFriendsNotficationsList