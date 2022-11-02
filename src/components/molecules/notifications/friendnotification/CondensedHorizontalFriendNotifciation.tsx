import { Ionicons } from '@expo/vector-icons'
import { Button, IconButton, Icon, Avatar, Box, HStack, VStack, Heading, Text } from 'native-base'
import { useContext } from 'react'
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
		<Box style={{ backgroundColor: 'transparent' }} p={2} py={2} borderBottomWidth={0.5}>
			<HStack>
				<Avatar
					source={{ uri: item.avatar }}
					size='medium'
					_text={{
						backgroundColor: themeContext.palette.primary.background.default,
						height: '100%',
						width: '100%',
					}}
				>
					{item.name[0]}
				</Avatar>
				<VStack>
					<VStack>
						<Heading>{item.name}</Heading>
						<Text fontSize={'lg'}>{item.username}</Text>
					</VStack>
					<HStack justifyContent={'space-around'} alignItems={'center'}>
						<Button
							colorScheme={'primary'}
							style={{
								paddingHorizontal: 20,
								paddingVertical: 10,
							}}
							borderRadius={'lg'}
							_text={{
								fontSize: 11,
								textTransform: 'uppercase',
								fontWeight: '900',
							}}
						>
							Accept
						</Button>
						<IconButton icon={<Icon as={Ionicons} name='close' size={16} rounded={'full'} />} />
					</HStack>
				</VStack>
			</HStack>
		</Box>
	)
}
