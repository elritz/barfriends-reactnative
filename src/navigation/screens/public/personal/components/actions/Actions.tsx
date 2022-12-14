import Details from '../details/Details'
import { useReactiveVar } from '@apollo/client'
import { Profile, useCreateFriendRequestMutation } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { AuthorizationReactiveVar } from '@reactive'
import { Button, VStack, HStack, Modal, useDisclose } from 'native-base'

type Props = {
	profile: Profile
}

export default function Actions({ profile }: Props) {
	const navigation = useNavigation()
	const rAuthorizationVar = useReactiveVar(AuthorizationReactiveVar)
	const { isOpen, onOpen, onClose } = useDisclose()

	const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({})

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
							: createFriendRequestMutation({
									variables: {
										receiversProfileId: profile.id,
										senderProfileId: String(rAuthorizationVar?.DeviceProfile?.Profile?.id),
									},
							  })
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
							: navigation.navigate('MessageRoomNavigator', {
									screen: 'MessagingRoomScreen',
									params: {
										messageroomId: '',
									},
							  })
					}}
				>
					Message
				</Button>
			</HStack>
			<Details profile={profile} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<Modal.Content w={'95%'}>
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
