import PermissionButtonSearchAreaLocation from './PermissionButtonSearchAreaLocation'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Heading, Icon, VStack, Button, Text } from 'native-base'

export default function VenueFeedSearchAreaEmptyState() {
	const navigation = useNavigation()
	return (
		<Box
			mb={2}
			mx={2}
			_dark={{ backgroundColor: 'dark.100' }}
			_light={{ backgroundColor: 'light.100' }}
			borderRadius={'lg'}
			p={5}
		>
			<Heading size={'2xl'} textAlign={'center'} fontWeight={'black'} lineHeight={'xs'} mb={5}>
				Welcome to Barfriends
			</Heading>
			<Text>
				Continue to find venues using location using your device location, or find venues with Search
				Area.
				<Icon size={'xs'} color={'primary.500'} as={FontAwesome5} name='filter' /> search area.{' '}
			</Text>
			<VStack w={'full'} alignItems={'center'} space={2}>
				<PermissionButtonSearchAreaLocation />
				<Button
					onPress={() => {
						navigation.navigate('ModalNavigator', {
							screen: 'SearchAreaModalStack',
							params: {
								screen: 'SearchAreaModal',
							},
						})
					}}
					w={'85%'}
					variant={'ghost'}
					size={'lg'}
					_text={{
						fontSize: 'lg',
					}}
				>
					Find area
				</Button>
			</VStack>
		</Box>
	)
}
