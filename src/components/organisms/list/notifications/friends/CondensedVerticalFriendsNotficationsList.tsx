import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import GenerateUsers from '@helpers/generate/placeholder/GenerateUserData'
import { Box } from 'native-base'

interface CondensedVerticalFriendsNotficationsListProps {}

const CondensedVerticalFriendsNotficationsList = ({}) => {
	const data = GenerateUsers(5)
	return (
		<Box flex={1} w={'100%'} h={'100%'} flexDir={'column'} borderRadius={'lg'} overflow={'hidden'}>
			{data.length ? (
				<>
					{data.map((item, index) => (
						<CondensedHorizontalFriendNotifciation key={index} item={item} />
					))}
				</>
			) : null}
		</Box>
	)
}

export default CondensedVerticalFriendsNotficationsList
