import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { DateTime } from 'luxon'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const BackgroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const navigation = useNavigation()

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
							Allow background location, it helps you to go out, join bars and find events.
						</Text>
						<VStack space={2}>
							<Button
								onPress={async () => {
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
										JSON.stringify(PreferenceBackgroundLocationPermissionInitialState),
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
										screen: 'BackgroundLocationPermissionScreen',
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

export default BackgroundLocationNextAskModal
