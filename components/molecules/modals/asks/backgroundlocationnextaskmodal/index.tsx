import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskBackgroundLocationPermissionType } from '@ctypes/preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	DaysPreferencePermissionInitialState,
	PreferenceBackgroundLocationPermissionReactiveVar,
} from '@reactive'
import { useRouter } from 'expo-router'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const BackgroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceBackgroundLocationPermission = useReactiveVar(
		PreferenceBackgroundLocationPermissionReactiveVar,
	)

	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content w={'95%'}>
					<Modal.Header>Background location</Modal.Header>
					<Modal.CloseButton />
					<Modal.Body
						mt={2}
						_scrollview={{
							scrollEnabled: false,
						}}
					>
						<Text fontSize={'lg'} pb={3}>
							By enabling background location, it helps you to go out, join bars and find events.
						</Text>
						<VStack space={2}>
							<Button
								onPress={async () => {
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
										JSON.stringify({
											...DaysPreferencePermissionInitialState,
											numberOfTimesDismissed: rPreferenceBackgroundLocationPermission?.numberOfTimesDismissed
												? rPreferenceBackgroundLocationPermission.numberOfTimesDismissed + 1
												: 1,
										} as LocalStoragePreferenceAskBackgroundLocationPermissionType),
									)
									onClose()
								}}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontSize: 'xl',
								}}
							>
								Not now
							</Button>
							<Divider />
							<Button
								onPress={() =>
									router.push({
										pathname: '(app)/permission/backgroundlocation',
									})
								}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontSize: 'xl',
								}}
							>
								Continue
							</Button>
						</VStack>
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</Center>
	)
}

export default BackgroundLocationNextAskModal
