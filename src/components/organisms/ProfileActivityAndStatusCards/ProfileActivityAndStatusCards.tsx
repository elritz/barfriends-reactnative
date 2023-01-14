import AddEmoji from '@components/molecules/cards/activity/ask/AddEmoji/AddEmoji'
import AddRelationship from '@components/molecules/cards/activity/ask/AddRelationship/AddRelationship'
import JoinVenue from '@components/molecules/cards/activity/ask/JoinVenue/JoinVenue'
import QuickBarfriendCard from '@navigation/screens/public/venue/components/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import { Box, HStack, VStack } from 'native-base'

interface ProfileActivityAndStatusCardsProps {}

const ProfileActivityAndStatusCards = ({}) => {
	return (
		<VStack space={2} justifyContent={'space-around'}>
			<HStack space={2} mx={2} justifyContent={'space-around'}>
				<Box
					justifyContent={'center'}
					alignItems={'center'}
					rounded='lg'
					overflow='hidden'
					_light={{
						bg: 'light.50',
					}}
					_dark={{
						bg: 'dark.50',
					}}
					flex={1}
					p={2}
				>
					<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
				</Box>
				<JoinVenue />
			</HStack>
			<HStack space={2} mx={2}>
				<AddRelationship />
				<AddEmoji />
			</HStack>
		</VStack>
	)
}
export default ProfileActivityAndStatusCards
