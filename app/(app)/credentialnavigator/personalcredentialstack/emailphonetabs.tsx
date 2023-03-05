import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import GetStartedScreen from '@navigation/screens/credential/getstarted/GetStartedScreen'
import { Stack } from 'expo-router'
import { View } from 'native-base'

export default () => {
	return (
		<View>
			<Stack.Screen
				options={{
					title: '',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<GetStartedScreen />
		</View>
	)
}
