import { useReactiveVar } from '@apollo/client'
import NotificationNextAskModal from '@components/molecules/modals/asks/notificationnextaskmodal'
import { LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS } from '@constants/StorageConstants'
import { DefaultPreferenceToPermission } from '@ctypes/preferences'
import { EvilIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PermissionNotificationReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	TomorrowPreferencePermissionInitialState,
} from '@reactive'
import { useRouter } from 'expo-router'
import { uniqueId } from 'lodash'
import { DateTime } from 'luxon'
import { MotiView } from 'moti'
import { Box, Button, Divider, Heading, HStack, Icon, Text, useDisclose, VStack } from 'native-base'
import { useEffect } from 'react'

export default function PreferenceNotificationPermission() {
	const router = useRouter()
	const { isOpen, onOpen, onClose } = useDisclose()
	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)
	const rPreferenceNotificationPermission = useReactiveVar(
		PreferencePermissionNotificationReactiveVar,
	)

	return (
		<>
			<NotificationNextAskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
			{rPreferenceNotificationPermission?.canShowAgain &&
				DateTime.fromISO(rPreferenceNotificationPermission?.dateToShowAgain) <= DateTime.now() && (
					<Box key={uniqueId()}>
						{!rPermissionNotificationVar?.granted && (
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
								<VStack my={3} space={1} alignItems={'center'}>
									<HStack w={'95%'} justifyContent={'flex-end'}>
										<Icon onPress={onOpen} as={EvilIcons} size={'md'} name={'close'} />
									</HStack>
									<Heading
										size={'md'}
										textAlign={'center'}
										style={{
											width: '100%',
										}}
									>
										Stay Up to Date
									</Heading>
									<Text textAlign={'center'} fontSize={'md'} style={{ width: '90%' }}>
										Turn on notification to know right away when people friend you, invit you out or send you
										a message.
									</Text>
									<Button
										onPress={() =>
											router.push({
												pathname: '(app)/permission/notifications',
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
										Turn on Notifications
									</Button>
									<Button
										w={'90%'}
										variant={'unstyled'}
										_text={{
											fontWeight: 'bold',
											fontSize: 'md',
										}}
										onPress={async () => {
											await AsyncStorage.setItem(
												LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
												JSON.stringify({
													...TomorrowPreferencePermissionInitialState,
													numberOfTimesDismissed: rPreferenceNotificationPermission?.numberOfTimesDismissed
														? rPreferenceNotificationPermission.numberOfTimesDismissed + 1
														: 1,
												} as DefaultPreferenceToPermission),
											)
											PreferencePermissionNotificationReactiveVar({
												...TomorrowPreferencePermissionInitialState,
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
