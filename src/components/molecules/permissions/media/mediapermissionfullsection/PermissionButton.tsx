import { Button } from 'native-base'

type Props = {
	onPress: () => void
}

export default function PermissionButton(props: Props) {
	return (
		<Button
			onPress={props.onPress}
			mt={4}
			w={'85%'}
			_text={{
				fontWeight: 'bold',
				textTransform: 'uppercase',
			}}
		>
			Continue
		</Button>
	)
}
