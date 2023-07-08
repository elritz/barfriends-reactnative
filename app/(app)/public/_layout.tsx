// TODO: FX() Settings still needs to be done
import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, VStack } from '@components/core'
import GeneralInput from '@components/molecules/search/commoninput/GeneralInput'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Platform, StyleSheet } from 'react-native'

export default () => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const colorScheme = useThemeColorScheme()

	return (
		<Stack>
			<Stack.Screen
				options={{
					headerShown: true,
					headerTransparent: true,
					headerStyle: {
						backgroundColor: 'transparent',
					},
					presentation: 'modal',
					animation: 'fade',
					headerLeft: () => (
						<HStack
							justifyContent={'flex-start'}
							maxWidth={'90%'}
							space={'$md'}
							alignItems={'center'}
							ml={'$2'}
						>
							<Button
								onPress={() => router.back()}
								rounded={'$full'}
								size='xs'
								bg={colorScheme === 'light' ? '$light50' : '$dark50'}
							>
								<Ionicons name='md-chevron-back-outline' size={30} />
							</Button>
						</HStack>
					),
					headerRight: () => (
						<Button
							onPress={() => router.back()}
							rounded={'$full'}
							size='xs'
							my={'$2'}
							mr={'$2'}
							bg={colorScheme === 'light' ? '$light50' : '$dark50'}
						>
							<Entypo name='dots-three-vertical' size={23} />
						</Button>
					),
					headerTitle: '',
				}}
				name={'venue'}
			/>
			<Stack.Screen name={'personal'} />
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerLeft: () => (
						<HStack
							justifyContent={'flex-start'}
							maxWidth={'90%'}
							space={'$md'}
							alignItems={'center'}
							ml={'$2'}
						>
							<Button
								onPress={() => router.back()}
								rounded={'$full'}
								size='xs'
								my={'$2'}
								mr={'$2'}
								bg={colorScheme === 'light' ? '$light50' : '$dark50'}
							>
								<Ionicons name='md-chevron-back-outline' size={30} />
							</Button>
						</HStack>
					),
					contentStyle: {
						backgroundColor:
							colorScheme === 'dark'
								? rTheme.theme?.gluestack.tokens.colors.dark100
								: rTheme.theme?.gluestack.tokens.colors.light100,
					},
					headerTransparent: true,
					header: () => {
						return (
							<VStack justifyContent={'flex-end'} pb={'$3'}>
								{Platform.OS === 'ios' ? (
									<BlurView
										style={StyleSheet.absoluteFill}
										tint={colorScheme === 'light' ? 'light' : 'dark'}
										intensity={80}
									/>
								) : (
									<Box style={[StyleSheet.absoluteFill]} />
								)}
								<GeneralInput placeholder='Search contacts' />
							</VStack>
						)
					},
				}}
				name={'contacts'}
			/>
		</Stack>
	)
}
