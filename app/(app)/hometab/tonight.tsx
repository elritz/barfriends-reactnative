import InviteCard from '@components/screens/public/venue/venueactions/actioncards/invitecard/InviteCard'
import QuickBarfriendCard from '@components/screens/public/venue/venueactions/actioncards/quickbarfriendcard/QuickBarfriendCard'
import AddEmoji from '@components/screens/tonight/activity/ask/AddEmoji/AddEmoji'
import JoinVenue from '@components/screens/tonight/activity/ask/JoinVenue/JoinVenue'
import Photos from '@components/screens/tonight/photos'
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
					<HStack space={2}>
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
								bg: 'dark.100',
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
								bg: 'dark.100',
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
