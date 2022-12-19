import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import { FriendRequest, FriendRequestNotification, NotificationStatus } from '@graphql/generated'
import GenerateUsers from '@helpers/generate/placeholder/GenerateUserData'
import { Box } from 'native-base'

interface Props<T> {
	data: T[] | undefined | null
	renderItem: (item: FriendRequestNotification) => React.ReactNode
	keyExtractor: (item: T) => string
}

const CondensedVerticalFriendsNotficationsList = <T extends FriendRequestNotification>({
	data,
}: Props<T>) => {
	// const data = GenerateUsers(5)
	return (
		<>
			{data?.length ? (
				<Box
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: 'dark.200',
					}}
					flex={1}
					w={'100%'}
					h={'100%'}
					py={2}
					flexDir={'column'}
					borderRadius={'lg'}
					overflow={'hidden'}
				>
					<>
						{data.map((item, index) => (
							<CondensedHorizontalFriendNotifciation key={index} item={item} />
						))}
					</>
				</Box>
			) : null}
		</>
	)
}

export default CondensedVerticalFriendsNotficationsList
