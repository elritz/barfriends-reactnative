import { useReactiveVar } from '@apollo/client'
import LogoTransparent from '@assets/images/company/LogoTransparent'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, HStack } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { Stack, useRouter } from 'expo-router'

export default () => {
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const router = useRouter()
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: 'transparent',
				},
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={'DeviceManager'}
				options={{
					headerShown: true,
					headerTitle: () => <LogoTransparent height={30} width={192} />,
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
			<Stack.Screen
				name={'Emojimood'}
				options={{
					headerTransparent: true,
					headerShown: true,
					title: '',
					headerLeft: () => <ChevronBackArrow />,
				}}
			/>
		</Stack>
	)
}
