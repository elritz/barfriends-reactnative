import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { DateTime } from 'luxon'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const NotificationsNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const navigation = useNavigation()

	const PreferenceNotificationsPermissionInitialState: LocalStoragePreferenceAskNotificationPermissionType =
		{
			dateToShowAgain: DateTime.now().plus({ days: 7 }),
			canShowAgain: true,
		}

	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content w={'95%'}>
					<Modal.CloseButton />
					<Modal.Body
						mt={6}
						_scrollview={{
							scrollEnabled: false,
						}}
					>
						<Text fontSize={'lg'} pb={3}>
							Allow notifications, get notified when your friends invite you out, join bars and events in
							your area.
						</Text>
						<VStack space={2}>
							<Button
								onPress={async () => {
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
										JSON.stringify(PreferenceNotificationsPermissionInitialState),
									)
									onClose()
								}}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontSize: 'xl',
								}}
							>
								Ask later
							</Button>
							<Divider />
							<Button
								onPress={() =>
									navigation.navigate('PermissionNavigator', {
										screen: 'NotificationsPermissionScreen',
									})
								}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontSize: 'xl',
								}}
							>
								Allow
							</Button>
						</VStack>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

export default NotificationsNextAskModal
