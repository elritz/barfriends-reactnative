import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import { Profile } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, VStack, HStack, Modal, useDisclose } from 'native-base'

type Props = {
	data: Profile
}

export default function Actions({ data }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()

	return (
		<VStack
			p={3}
			space={3}
			borderRadius={'xl'}
			_light={{
				bg: 'light.50',
			}}
			_dark={{
				bg: 'light.800',
			}}
		>
			<HStack space={3}>
				<Button
					flex={1}
					_text={{
						fontWeight: '600',
					}}
					colorScheme={'primary'}
					onPress={() => {
						rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'
							? onOpen()
							: console.log('HEELO)W')
					}}
				>
					Barfriend
				</Button>
				<Button
					bg={'blue.500'}
					_text={{
						fontWeight: '600',
					}}
					flex={2}
					colorScheme={'primary'}
					onPress={() => {
						rAuthorizationVar?.DeviceProfile?.Profile?.ProfileType === 'GUEST'
							? onOpen()
							: console.log('HEELO)W')
					}}
				>
					Message
				</Button>
			</HStack>
			<Details item={data} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header fontSize='4xl' fontWeight='bold'>
						Account Sign up
					</Modal.Header>
					<Modal.Body>
						To do cool things. You'll need to be cool and create an account for yourself.
					</Modal.Body>
					<Modal.Footer>
						<Button variant='unstyled' mr='1' onPress={onClose}>
							Later
						</Button>
						<Button
							colorScheme='primary'
							onPress={() => {
								onClose()
								navigation.navigate('CredentialNavigator', {
									screen: 'PersonalCredentialStack',
									params: {
										screen: 'GetStartedScreen',
									},
								})
							}}
						>
							Continue
						</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</VStack>
	)
}
