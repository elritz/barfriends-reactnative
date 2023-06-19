import index from '../messagestack'
import { Heading } from '@components/core'
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
	TomorrowPreferencePermissionInitialState,
} from '@reactive'
import {
	View,
	Text,
	Pressable,
	Box,
	Divider,
	HStack,
	Icon,
	Spinner,
	ScrollView,
	VStack,
	useToast,
} from 'native-base'
import { useState } from 'react'
import 'react-native'
import { useWindowDimensions } from 'react-native'

export default function Preferences() {
	const toast = useToast()
	const { width } = useWindowDimensions()
	const [loading, setIsLoading] = useState(false)
	const ITEM_HEIGHT = 60

	// await AsyncStorage.removeItem(LOCAL_STORAGE_SEARCH_AREA)
	// await AsyncStorage.removeItem(LOCAL_STORAGE_PREFERENCE_NOTIFICATIONS)
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
							mx={3}
							space={4}
							height={ITEM_HEIGHT}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<HStack space={3} maxW={'80%'} alignItems={'center'} justifyContent={'flex-start'}>
								<Icon size={'lg'} as={Ionicons} name={item.icon} />
								<Heading sx={{ maxWidth: '275px' }} numberOfLines={2} fontSize={'$lg'}>
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
