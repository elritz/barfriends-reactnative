import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import HorizontalMessageNotification from '@components/molecules/notifications/message/HorizontalMessageNotification'
import { Ionicons } from '@expo/vector-icons'
import GenerateMessageData from '@helpers/generate/placeholder/GenerateMessagesData'
import { useNavigation } from '@react-navigation/native'
import { HStack, Icon } from 'native-base'
import React, { useContext, useRef } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { ThemeContext } from 'styled-components/native'

const Messages = () => {
	const _flatListView = useRef()
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	const data = GenerateMessageData(5, 2)

	return (
		<SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
			<HStack alignItems={'center'} justifyContent={'space-between'} mb={5}>
				<RNEHeading1000>Messages</RNEHeading1000>
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
