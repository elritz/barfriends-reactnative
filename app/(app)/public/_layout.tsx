// TODO: FX() Settings still needs to be done
import { Box, HStack, VStack } from '@components/core'
import GeneralInput from '@components/molecules/search/commoninput/GeneralInput'
import SearchAreaInput from '@components/molecules/search/searcharea/SearchAreaInput'
import { Ionicons, Entypo } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Icon, IconButton, theme } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

export default () => {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()

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
							<IconButton
								bg={colorScheme === 'light' ? 'light.50' : 'dark.50'}
								rounded={'full'}
								size={'xs'}
								onPress={() => router.back()}
								icon={<Icon as={Ionicons} name='md-chevron-back-outline' size={'xl'} />}
							/>
						</HStack>
					),
					headerRight: () => (
						<IconButton
							my={2}
							mr={2}
							icon={<Icon as={Entypo} name={'dots-three-vertical'} size={23} />}
						/>
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
							<IconButton
								bg={colorScheme === 'light' ? 'light.50' : 'dark.50'}
								rounded={'full'}
								size={'xs'}
								onPress={() => router.back()}
								icon={<Icon as={Ionicons} name='md-chevron-back-outline' size={'xl'} />}
							/>
						</HStack>
					),
					contentStyle: {
						backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
					},
					headerTransparent: true,
					header: () => {
						return (
							<VStack justifyContent={'flex-end'} pb={'$3'}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
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
