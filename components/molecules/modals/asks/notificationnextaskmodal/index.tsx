import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskNotificationPermissionType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	DaysPreferencePermissionInitialState,
	PreferencePermissionNotificationReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const NotificationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)
	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content w={'95%'}>
					<Modal.Header>Notifications</Modal.Header>
					<Modal.CloseButton />
					<Modal.Body
						mt={2}
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
										LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
										JSON.stringify({
											...DaysPreferencePermissionInitialState,
											numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
												? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
												: 1,
										} as LocalStoragePreferenceAskNotificationPermissionType),
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
									router.push({
										pathname: '(app)/permission/notifications',
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

export default NotificationNextAskModal
