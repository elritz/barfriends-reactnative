import { Ionicons } from '@expo/vector-icons'
import {
	Button,
	IconButton,
	Icon,
	Avatar,
	Box,
	HStack,
	VStack,
	Heading,
	Text,
	Image,
} from 'native-base'
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
		<Box
			style={{ backgroundColor: 'transparent' }}
			py={3}
			px={2}
			borderBottomColor={'light.300'}
			borderBottomWidth={0.2}
		>
			<HStack justifyContent={'space-between'}>
				<HStack alignItems={'flex-start'} space={2}>
					<Image source={{ uri: item.avatar }} size='xs' borderRadius={'lg'} alt={item.name[0]} />
					<VStack mt={-1}>
						<Text fontSize={'lg'} numberOfLines={1} isTruncated>
							{item.name}
						</Text>
						<Heading fontSize={'sm'} isTruncated>
							{item.username}
						</Heading>
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
