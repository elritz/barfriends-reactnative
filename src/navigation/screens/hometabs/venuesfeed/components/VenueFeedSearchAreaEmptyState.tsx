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
			_dark={{ backgroundColor: 'dark.50' }}
			_light={{ backgroundColor: 'light.50' }}
			borderRadius={'lg'}
			p={5}
		>
			<Text
				numberOfLines={3}
				ellipsizeMode='tail'
				adjustsFontSizeToFit
				minimumFontScale={0.5}
				pb={2}
				w={265}
				maxW={'85%'}
				style={{
					alignSelf: 'center',
					textAlign: 'center',
					textTransform: 'uppercase',
				}}
				fontWeight={'black'}
				lineHeight={'xs'}
				fontSize={'2xl'}
			>
				Where are your venues?
			</Text>
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
					variant={'unstyled'}
					w={'95%'}
					_text={{
						textTransform: 'uppercase',
						fontWeight: '700',
						fontSize: 'lg',
						_dark: {
							color: 'light.50',
						},
						_light: {
							color: 'dark.50',
						},
						// underline: true,
					}}
				>
					Find area
				</Button>
			</VStack>
		</Box>
	)
}
