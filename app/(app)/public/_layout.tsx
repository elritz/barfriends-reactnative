// TODO: FX() Settings still needs to be done
import GeneralInput from '@components/molecules/search/commoninput/GeneralInput'
import SearchAreaInput from '@components/molecules/search/searcharea/SearchAreaInput'
import { Ionicons, Entypo } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { BlurView } from 'expo-blur'
import { Stack, useRouter } from 'expo-router'
import { Box, HStack, Icon, IconButton, VStack, theme } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

export default () => {
	const colorScheme = useThemeColorScheme()
	const router = useRouter()

	return (
		<Stack>
			<Stack.Screen
				name={'venue'}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name={'personal'} />
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: 'transparent',
					},
					headerLeft: () => (
						<HStack justifyContent={'flex-start'} maxW={'90%'} space={1} alignItems={'center'} ml={2}>
							<IconButton
								bg={colorScheme === 'light' ? 'light.50' : 'dark.50'}
								rounded={'full'}
								size={'xs'}
								onPress={() => router.back()}
								icon={<Icon as={Ionicons} name='md-chevron-back-outline' size={'xl'} />}
							/>
						</HStack>
					),
					animation: 'fade',
					contentStyle: {
						backgroundColor: colorScheme === 'dark' ? theme.colors.dark[100] : theme.colors.light[200],
					},
					headerTransparent: true,
					header: () => {
						return (
							<VStack justifyContent={'flex-end'} safeAreaTop pb={3}>
								{Platform.OS === 'ios' ? (
									<BlurView style={StyleSheet.absoluteFill} tint={colorScheme} intensity={80} />
								) : (
									<Box
										_light={{ bg: 'light.100' }}
										_dark={{ bg: 'dark.100' }}
										style={[StyleSheet.absoluteFill]}
									/>
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
