import { Divider } from '@rneui/base'
import styled from 'styled-components/native'

import { CondensedHorizontalFriendNotifciation } from '@components/molecules/notifications/friendnotification/CondensedHorizontalFriendNotifciation'
import GenerateUsers from '@helpers/generate/placeholder/GenerateUserData'

interface CondensedVerticalFriendsNotficationsListProps { }

const CondensedVerticalFriendsNotficationsList = ({ }) => {

	const data = GenerateUsers(5)
	return (
		<OuterView>
			{data.length ? (
				<>
					{data.map((item, index) => (
						<CondensedHorizontalFriendNotifciation key={index} item={item} />
					))}
				</>
			) : null}
		</OuterView>
	)
}

export default CondensedVerticalFriendsNotficationsList

const OuterView = styled.View`
	background: ${props => props.theme.palette.background.paper};
	flex: 1;
	width: 100%;
	height: 100%;
	flex-direction: column;
	border-radius: 15px;
	overflow: hidden;
`;
