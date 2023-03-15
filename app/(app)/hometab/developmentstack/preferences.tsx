import index from '../messagestack'
import {
	LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
	LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
} from '@constants/StorageConstants'
import { Ionicons, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	PreferenceBackgroundLocationPermissionInitialState,
	PreferencePermissionNotificationInitialState,
	PreferenceForegroundLocationPermissionInitialState,
} from '@reactive'
import {
	View,
	Text,
	Pressable,
	Box,
	Divider,
	HStack,
	Icon,
	Heading,
	Spinner,
	ScrollView,
	VStack,
} from 'native-base'
import { useState } from 'react'
import 'react-native'
import { useWindowDimensions } from 'react-native'

export default function Preferences() {
	const { width } = useWindowDimensions()
	const [loading, setIsLoading] = useState(false)
	const ITEM_HEIGHT = 60

	// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_SYSTEM_OF_UNITS)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_BACKGROUND_LOCATION)
	return (
		<ScrollView maxW={'100%'}>
			<VStack mx={3} mb={5}>
				<Text fontSize={'lg'}>
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
							LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS_PERMISSION,
							JSON.stringify(PreferencePermissionNotificationInitialState),
						)
					},
				},
				{
					type: 'token',
					title: 'Foreground location Permission Ask Preference',
					icon: 'location',
					onPress: async () => {
						await AsyncStorage.setItem(
							LOCAL_STORAGE_PREFERENCE_FOREGROUND_LOCATION,
							JSON.stringify(PreferenceForegroundLocationPermissionInitialState),
						)
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
							JSON.stringify(PreferenceBackgroundLocationPermissionInitialState),
						)
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
							mx={3}
							space={4}
							height={ITEM_HEIGHT}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<HStack space={3} maxW={'80%'} alignItems={'center'} justifyContent={'flex-start'}>
								<Icon size={'lg'} as={Ionicons} name={item.icon} />
								<Heading maxW={'275px'} numberOfLines={2} fontSize={'lg'} colorScheme={'tertiary'}>
									{item.title}
								</Heading>
							</HStack>
							<Box>
								{loading ? (
									<Spinner />
								) : (
									<Icon mr={3} size={'md'} color={'danger.500'} name={'trash'} as={Feather} />
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
