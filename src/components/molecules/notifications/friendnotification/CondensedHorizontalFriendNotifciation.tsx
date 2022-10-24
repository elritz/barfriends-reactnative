import { useContext } from 'react'

import { Avatar, Button, Icon, ListItem } from '@rneui/themed'
import { ThemeContext } from 'styled-components/native'

interface CondensedHorizontalFriendNotifciationProps {
	item: {
		name: string
		username: string
		avatar: string
	}
}

export const CondensedHorizontalFriendNotifciation = ({
	item,
}: CondensedHorizontalFriendNotifciationProps) => {
	const themeContext = useContext(ThemeContext)
	return (
		<ListItem containerStyle={{ backgroundColor: 'transparent' }} pad={5} bottomDivider>
			<Avatar
				title={item.name[0]}
				source={{ uri: item.avatar }}
				size='medium'
				avatarStyle={{ borderRadius: 9 }}
				containerStyle={{ overflow: 'hidden', borderRadius: 9 }}
				titleStyle={{ backgroundColor: themeContext.palette.primary.background, height: '100%', width: '100%', color: themeContext.palette.primary.color.primary }}
			/>
			<ListItem.Content>
				<ListItem.Title
				>
					{item.name}
				</ListItem.Title>
				<ListItem.Subtitle style={{
					fontSize: 13
				}}>
					{item.username}
				</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Content
				style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
			>
				<Button
					title='Accept'
					buttonStyle={{
						backgroundColor: themeContext.palette.active.background.primary,
						paddingHorizontal: 20,
						paddingVertical: 10,
						borderRadius: 10,
					}}
					titleStyle={{
						fontSize: 11,
						textTransform: 'uppercase',
						fontWeight: '900',
					}}
				/>
				<Button
					// buttonStyle={{ backgroundColor: themeContext.palette.secondary.background }}
					icon={<Icon name='close' size={16} solid />}
					type='clear'
				/>
			</ListItem.Content>
		</ListItem>
	)
}
