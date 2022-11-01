import HorizontalMessageNotification from '@components/molecules/notifications/message/HorizontalMessageNotification'
import { Ionicons } from '@expo/vector-icons'
import GenerateMessageData from '@helpers/generate/placeholder/GenerateMessagesData'
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, Icon } from 'native-base'
import { useRef } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Messages = () => {
	const _flatListView = useRef()
	const navigation = useNavigation()

	const data = GenerateMessageData(5, 2)

	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
			<HStack alignItems={'center'} justifyContent={'space-between'} mb={5}>
				<Heading fontSize={'3xl'}>Messages</Heading>
				<Icon
					as={Ionicons}
					name={'ios-notifications'}
					size={7}
					color={'secondary.500'}
					style={{}}
					onPress={() =>
						navigation.navigate('PermissionNavigator', {
							screen: 'NotificationsPermissionScreen',
							// screen: 'ForegroundLocationPermissionScreen',
						})
					}
				/>
			</HStack>
			<FlatList
				ref={_flatListView}
				style={{ elevation: 100, zIndex: 100, borderRadius: 15 }}
				data={data}
				contentInset={{ top: 0, left: 0, bottom: 90, right: 0 }}
				keyExtractor={({ id }) => id.toString()}
				renderItem={({ item }) => <HorizontalMessageNotification item={item} />}
				snapToAlignment='center'
			/>
		</SafeAreaView>
	)
}

export default Messages
