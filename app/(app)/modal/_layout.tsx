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
				// headerTitle: () => <NavigationDragIcon />,
				// headerLeft: () => null,
				// headerTransparent: true,
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
					headerLeft: () => (
						<HStack
							justifyContent={'flex-start'}
							sx={{
								maxWidth: '90%',
							}}
							space={'md'}
							alignItems={'center'}
							ml={'$2'}
						>
							<Button
								bg={rTheme.colorScheme === 'light' ? '$light50' : '$dark50'}
								rounded={'$full'}
								size={'xs'}
								onPress={() => router.back()}
							>
								<Ionicons name='md-chevron-back-outline' size={35} />
							</Button>
						</HStack>
					),
				}}
			/>
		</Stack>
	)
}
