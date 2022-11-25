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
		<Box style={{ backgroundColor: 'transparent' }} p={2} borderBottomWidth={0.25}>
			<HStack justifyContent={'space-between'}>
				<HStack space={1}>
					<Avatar
						source={{ uri: item.avatar }}
						size='md'
						_text={{
							backgroundColor: themeContext.palette.primary.background.default,
							height: '100%',
							width: '100%',
						}}
					>
						{item.name[0]}
					</Avatar>
					<VStack>
						<Text fontSize={'lg'}>{item.name}</Text>
						<Heading fontSize={'sm'}>{item.username}</Heading>
					</VStack>
				</HStack>
				<HStack space={1} justifyContent={'space-around'} alignItems={'center'}>
					<Button
						colorScheme={'primary'}
						px={4}
						py={2}
						borderRadius={'lg'}
						_text={{
							fontSize: 11,
							textTransform: 'uppercase',
							fontWeight: '900',
						}}
					>
						Accept
					</Button>
					<IconButton
						px={2}
						py={2}
						icon={<Icon as={Ionicons} name='close' size={'lg'} rounded={'full'} />}
					/>
				</HStack>
			</HStack>
		</Box>
	)
}
