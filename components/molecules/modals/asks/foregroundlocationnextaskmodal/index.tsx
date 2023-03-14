import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PreferenceForegroundLocationPermissionInitialState } from '@reactive'
import { useRouter } from 'expo-router'
import { DateTime } from 'luxon'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const ForegroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()

	const PreferenceBackgroundLocationPermissionInitialState: LocalStoragePreferenceAskBackgroundLocationPermissionType =
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
							Allow foreground location, it helps you to go out, join bars and find events.
						</Text>
						<VStack space={2}>
							<Button
								onPress={async () => {
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
										JSON.stringify(PreferenceForegroundLocationPermissionInitialState),
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
										pathname: 'permissionnavigator/foregroundlocation',
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

export default ForegroundLocationNextAskModal
