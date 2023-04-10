import { useReactiveVar } from '@apollo/client'
import ForegroundLocationNextAskModal from '@components/molecules/modals/asks/foregroundlocationnextaskmodal'
import { LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION } from '@constants/StorageConstants'
import { LocalStoragePreferenceAskForegroundLocationPermissionType } from '@ctypes/preferences'
import { EvilIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	DaysPreferencePermissionInitialState,
	PermissionForegroundLocationReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
	TomorrowPreferencePermissionInitialState,
} from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { Box, Button, Divider, HStack, Heading, Icon, Text, VStack, useDisclose } from 'native-base'

export default function ForegroundLocationPermissionFullSection() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)
	const rPreferenceForegroundLocationPermission = useReactiveVar(
		PreferenceForegroundLocationPermissionReactiveVar,
	)
	return (
		<>
			<ForegroundLocationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceForegroundLocationPermission?.canShowAgain &&
				DateTime.fromISO(rPreferenceForegroundLocationPermission?.dateToShowAgain) <=
					DateTime.now() && (
					<Box key={uniqueId()}>
						{!rPermissionLocationVar?.granted && (
							<MotiView
								from={{
									opacity: 0,
									scale: 1,
								}}
								animate={{
									opacity: 1,
									scale: 1,
								}}
								exit={{
									opacity: 0,
									scale: 0.9,
								}}
							>
								<HStack w={'95%'} justifyContent={'flex-end'}>
									<Icon onPress={onOpen} as={EvilIcons} size={'md'} name={'close'} />
								</HStack>
								<VStack my={3} space={1} alignItems={'center'}>
									<Heading
										size={'md'}
										textAlign={'center'}
										style={{
											width: '100%',
										}}
									>
										Enable Location
									</Heading>
									<Text fontSize={'lg'} style={{ width: '100%' }}>
										Using your current location will automatically show you what's near you based on where you
										are.
									</Text>
									<Button
										onPress={() =>
											router.push({
												pathname: '(app)/permission/foregroundlocation',
											})
										}
										size={'sm'}
										mt={4}
										w={'85%'}
										_text={{
											fontWeight: 'bold',
											fontSize: 'sm',
										}}
									>
										Use Current Location
									</Button>
									<Button
										w={'90%'}
										variant={'unstyled'}
										_text={{
											fontWeight: 'bold',
											fontSize: 'md',
										}}
										onPress={async () => {
											const values = {
												...TomorrowPreferencePermissionInitialState,
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
										}}
									>
										Not now
									</Button>
								</VStack>
							</MotiView>
						)}
						<Divider />
					</Box>
				)}
		</>
	)
}
