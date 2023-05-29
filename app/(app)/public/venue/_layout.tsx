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
				headerShown: true,
				headerTransparent: true,
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
				headerRight: () => (
					<IconButton my={2} mr={2} icon={<Icon as={Entypo} name={'dots-three-vertical'} size={23} />} />
				),
				headerTitle: '',
			}}
		>
			<Stack.Screen name={'[profileid]'} />
		</Stack>
	)
}
