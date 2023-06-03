import ProfileActivityAndStatusCards from '@components/organisms/ProfileActivityAndStatusCards/ProfileActivityAndStatusCards'
import AddEmoji from '@screens/hometabs/tonight/activity/ask/AddEmoji/AddEmoji'
import AddRelationship from '@screens/hometabs/tonight/activity/ask/AddRelationship/AddRelationship'
import JoinVenue from '@screens/hometabs/tonight/activity/ask/JoinVenue/JoinVenue'
import Photos from '@screens/hometabs/tonight/photos'
import InviteCard from '@screens/public/venue/components/venueactions/actioncards/invitecard/InviteCard'
import QuickBarfriendCard from '@screens/public/venue/components/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import { VStack, HStack, Box } from 'native-base'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={{
					flex: 1,
				}}
				showsVerticalScrollIndicator={false}
				contentInset={{
					top: 0,
					left: 0,
					bottom: 90,
					right: 0,
				}}
			>
				{/* <TonightImages /> */}
				<Photos />

				<VStack mx={3} space={2} justifyContent={'space-around'}>
					<HStack space={2} justifyContent={'space-around'}>
						<AddEmoji />
						<JoinVenue />
					</HStack>
					<HStack  space={2}>
						<Box
							flex={1}
							h={200}
							justifyContent={'center'}
							alignItems={'center'}
							rounded='lg'
							_light={{
								bg: 'light.100',
							}}
							_dark={{
								bg: 'dark.50',
							}}
							px={5}
						>
							<QuickBarfriendCard color={'#ff7000'} showIcon={false} logosize={40} qrcodesize={140} />
						</Box>
						<Box
							flex={1}
							h={200}
							justifyContent={'center'}
							alignItems={'center'}
							rounded='lg'
							_light={{
								bg: 'light.100',
							}}
							_dark={{
								bg: 'dark.50',
							}}
							px={2}
						>
							<InviteCard />
						</Box>
					</HStack>
				</VStack>
			</ScrollView>
		</SafeAreaView>
	)
}
