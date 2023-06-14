// TODO: FX() Settings still needs to be done
import { Ionicons, Entypo } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Stack, useRouter } from 'expo-router'
import { HStack, Icon, IconButton } from 'native-base'

export default () => {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				options={{
					presentation: 'transparentModal',
				}}
				name={'[profileid]'}
			/>
		</Stack>
	)
}
