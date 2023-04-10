import { useReactiveVar } from '@apollo/client'
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@preferences'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	DaysFuturePreferenceForegroundLocationPermissionInitialState,
	DaysPreferencePermissionInitialState,
	PreferenceForegroundLocationPermissionReactiveVar,
	TomorrowPreferencePermissionInitialState,
} from '@reactive'
import { useRouter } from 'expo-router'
import { Button, Center, Divider, Modal, Text, VStack } from 'native-base'

const ForegroundLocationNextAskModal = ({ isOpen, onOpen, onClose }) => {
	const router = useRouter()
	const rPreferenceForegroundLocationPermission = useReactiveVar(
		PreferenceForegroundLocationPermissionReactiveVar,
	)

	return (
		<Center>
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content w={'95%'}>
					<Modal.Header>Foreground location</Modal.Header>
					<Modal.CloseButton />
					<Modal.Body
						mt={2}
						_scrollview={{
							scrollEnabled: false,
						}}
					>
						<Text fontSize={'lg'} pb={3}>
							By enabling foreground location, it helps you to go out, find events and it allows you to
							join bars.
						</Text>
						<VStack space={2}>
							<Button
								onPress={async () => {
									const values = {
										...DaysPreferencePermissionInitialState,
										numberOfTimesDismissed: rPreferenceForegroundLocationPermission?.numberOfTimesDismissed
											? rPreferenceForegroundLocationPermission.numberOfTimesDismissed + 1
											: 1,
									}
									await AsyncStorage.setItem(
										LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
										JSON.stringify(values as LocalStoragePreferenceAskForegroundLocationPermissionType),
									)
									PreferenceForegroundLocationPermissionReactiveVar({
										...values,
									})
									onClose()
								}}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontWeight: 'bold',
									fontSize: 'md',
								}}
							>
								Not now
							</Button>
							<Divider />
							<Button
								onPress={() =>
									router.push({
										pathname: '(app)/permission/foregroundlocation',
									})
								}
								variant={'ghost'}
								size={'lg'}
								_text={{
									fontSize: 'md',
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

export default ForegroundLocationNextAskModal
