import { Text } from '@rneui/themed'
import { Box } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface StatusScreenProps {}

const StatusScreen = ({}: StatusScreenProps) => {
	const insets = useSafeAreaInsets()

	// list of 30 items
	const list = [
		{
			id: 1,
			name: 'John Doe',
			status: 'online',
		},
		{
			id: 2,
			name: 'Jane Doe',
			status: 'offline',
		},
	]

	return (
		<Box flexDirection={'column'}>
			<KeyboardAwareScrollView
				keyboardDismissMode='interactive'
				keyboardShouldPersistTaps={'always'}
				extraScrollHeight={100}
				style={{ height: '100%' }}
			>
				{list.map(item => {
					return <Text>{item.name}</Text>
				})}
			</KeyboardAwareScrollView>
		</Box>
	)
}

export default StatusScreen
