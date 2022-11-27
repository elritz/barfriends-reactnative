import AddEmoji from '@components/molecules/cards/activity/ask/AddEmoji/AddEmoji'
import AddRelationship from '@components/molecules/cards/activity/ask/AddRelationship/AddRelationship'
import JoinVenue from '@components/molecules/cards/activity/ask/JoinVenue/JoinVenue'
import { HStack, VStack } from 'native-base'

interface ProfileActivityAndStatusCardsProps {}

const ProfileActivityAndStatusCards = ({}) => {
	return (
		<VStack space={2} justifyContent={'space-around'}>
			<HStack space={2} mx={2}>
				<AddRelationship />
				<AddEmoji />
			</HStack>
			<HStack space={2} mx={2} justifyContent={'space-around'}>
				<JoinVenue />
			</HStack>
		</VStack>
	)
}
export default ProfileActivityAndStatusCards
