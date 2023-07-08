import index from '../messagestack'
import { useReactiveVar } from '@apollo/client'
import { Box, Divider, HStack, Heading, Pressable, Spinner, Text, VStack } from '@components/core'
import {
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
} from '@constants/StorageConstants'
import { Ionicons, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	NowPreferencePermissionInitialState,
	PreferenceBackgroundLocationPermissionReactiveVar,
	PreferenceForegroundLocationPermissionReactiveVar,
	PreferencePermissionNotificationReactiveVar,
	ThemeReactiveVar,
	TomorrowPreferencePermissionInitialState,
} from '@reactive'
import { useToast } from 'native-base'
import { useState } from 'react'
import 'react-native'
import { ScrollView } from 'react-native'

export default function Preferences() {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const [loading, setIsLoading] = useState(false)
	const toast = useToast()

	const ITEM_HEIGHT = 60

	// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)
	return (
		<ScrollView style={{ maxWidth: '100%' }}>
			<VStack mx={'$3'} my={'$5'}>
				<Text textAlign='center' fontSize={'$lg'}>
					These items are for reseting/updating delete the tokens that are saved during Bfs app initial
					render. These preferences are also set when a user interacts with components that ask them to
					set the persisted state or dismiss the prompt.
				</Text>
			</VStack>
			{[
				{
					type: 'token',
					title: 'Notification Permission Preference',
					icon: 'notifications',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
						PreferencePermissionNotificationReactiveVar({
							...TomorrowPreferencePermissionInitialState,
						})
						toast.show({
							description: 'Deleted Notification Permission Preference',
						})
					},
				},
				{
					type: 'token',
					title: 'Foreground location Permission Ask Preference',
					icon: 'location',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
						PreferenceForegroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
						})
						toast.show({
							description: 'Deleted Foreground Permission Preference',
						})
					},
				},
				{
					type: 'token',
					title: 'Background location Permission Ask Preference',
					icon: 'map-sharp',
					onPress: async () => {
						setIsLoading(true)
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
							JSON.stringify(NowPreferencePermissionInitialState),
						)
						PreferenceBackgroundLocationPermissionReactiveVar({
							...TomorrowPreferencePermissionInitialState,
						})
						toast.show({
							description: 'Deleted Background Permission Preference',
						})
						setTimeout(() => {
							setIsLoading(false)
						}, 2000)
					},
				},
			].map((item, index) => {
				return (
					<Pressable key={index} onPress={item.onPress}>
						<Divider />
						<HStack
							mx={'$3'}
							space={'md'}
							height={ITEM_HEIGHT}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<HStack
								space={'md'}
								sx={{
									maxWidth: '80%',
								}}
								alignItems={'center'}
								justifyContent={'flex-start'}
							>
								<Ionicons size={25} name={item.icon} />
								<Text sx={{ maxWidth: 275 }} numberOfLines={2} fontSize={'$md'}>
									{item.title}
								</Text>
							</HStack>
							<Box bg={'transparent'}>
								{loading ? (
									<Spinner />
								) : (
									<Feather
										name={'trash'}
										style={{ marginRight: 3 }}
										size={20}
										color={rTheme.theme?.gluestack.tokens.colors.danger500}
									/>
								)}
							</Box>
						</HStack>
						<Divider />
					</Pressable>
				)
			})}
		</ScrollView>
	)
}
