import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolbar'
import {
	renderAvatar,
	renderBubble,
	renderSystemMessage,
	renderMessage,
	renderMessageText,
	renderCustomView,
} from './MessageContainer'
import initialMessages from './data/messages'
import { View } from 'native-base'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

const MessageRoomGiftedChat = () => {
	const [text, setText] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		setMessages(initialMessages.reverse())
	}, [])

	const onSend = (newMessages = []) => {
		setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages))
	}

	return (
		<View flex={1}>
			<GiftedChat
				messages={messages}
				text={text}
				onInputTextChanged={setText}
				onSend={onSend}
				user={{
					_id: 1,
					name: 'Aaron',
					avatar: 'https://placeimg.com/150/150/any',
				}}
				alignTop
				alwaysShowSend
				scrollToBottom
				// showUserAvatar
				// renderAvatarOnTop
				renderUsernameOnMessage
				bottomOffset={26}
				onPressAvatar={console.log}
				renderInputToolbar={renderInputToolbar}
				renderActions={renderActions}
				renderComposer={renderComposer}
				renderSend={renderSend}
				renderAvatar={renderAvatar}
				renderBubble={renderBubble}
				renderSystemMessage={renderSystemMessage}
				renderMessage={renderMessage}
				renderMessageText={renderMessageText}
				textInputProps={{
					height: 80,
				}}
				// renderMessageImage
				// renderCustomView={renderCustomView}
				isCustomViewBottom
				messagesContainerStyle={{}}
				parsePatterns={linkStyle => [
					{
						pattern: /#(\w+)/,
						style: linkStyle,
						onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
					},
				]}
			/>
		</View>
	)
}

export default MessageRoomGiftedChat
