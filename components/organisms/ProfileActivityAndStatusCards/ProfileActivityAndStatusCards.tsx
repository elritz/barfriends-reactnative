import AddEmoji from '@screens/hometabs/tonight/activity/ask/AddEmoji/AddEmoji'
import AddRelationship from '@screens/hometabs/tonight/activity/ask/AddRelationship/AddRelationship'
import JoinVenue from '@screens/hometabs/tonight/activity/ask/JoinVenue/JoinVenue'
import QuickBarfriendCard from '@screens/public/venue/components/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import { Box, HStack, VStack } from 'native-base'

interface ProfileActivityAndStatusCardsProps {}

const ProfileActivityAndStatusCards = ({}) => {
	return (
		<VStack mx={3} space={2} justifyContent={'space-around'}>
			<HStack space={2} justifyContent={'space-around'}>
				<Box
					flex={1}
					h={200}
					justifyContent={'center'}
					alignItems={'center'}
					rounded='lg'
					_light={{
						bg: 'light.50',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					px={5}
				>
					<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
				</Box>
				<JoinVenue />
			</HStack>
			<HStack space={2}>
				<AddRelationship />
				<AddEmoji />
			</HStack>
		</VStack>
	)
}
export default ProfileActivityAndStatusCards