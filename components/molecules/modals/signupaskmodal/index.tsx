import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Button, Modal } from 'native-base'

type Props = {
	isOpen: boolean
	onClose: () => void
}
export default function SignupAskModal({ isOpen, onClose }: Props) {
	const router = useRouter()
	return (
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
							router.push({
								pathname: '(app)/credential/personalcredentialstack/getstarted',
							})
						}}
					>
						Continue
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}
