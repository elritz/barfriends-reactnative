import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { Divider, Heading, Pressable } from 'native-base'
import { Icon, VStack, View } from 'native-base'

export default function AppearanceSettingsScreen() {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleThemes({ colorScheme })
	}

	return (
		<View
			_dark={{
				bg: 'dark.50',
			}}
			_light={{
				bg: 'light.50',
			}}
			flex={1}
		>
			<VStack py={4} w={'full'} space={4} justifyContent={'space-around'}>
				<Pressable
					onPress={async () => {
						await setTheme({ colorScheme: 'light' })
					}}
					px={4}
					flexDir={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} size={'md'}>
						Light
					</Heading>
					{rThemeVar.localStorageColorScheme === 'light' && (
						<Icon as={Ionicons} size={'lg'} color={'primary.500'} name={'checkmark-circle'} />
					)}
				</Pressable>
				<Divider />
				<Pressable
					onPress={async () => {
						await setTheme({ colorScheme: 'dark' })
					}}
					px={4}
					flexDir={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} size={'md'}>
						Dark
					</Heading>
					{rThemeVar.localStorageColorScheme === 'dark' && (
						<Icon as={Ionicons} size={'lg'} color={'primary.500'} name={'checkmark-circle'} />
					)}
				</Pressable>
				<Divider />
				<Pressable
					onPress={async () => {
						await setTheme({ colorScheme: 'light' })
					}}
					px={4}
					flexDir={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Heading fontWeight={'normal'} size={'md'}>
						System
					</Heading>
					{rThemeVar.localStorageColorScheme === 'system' && (
						<Icon as={Ionicons} size={'lg'} color={'primary.500'} name={'checkmark-circle'} />
					)}
				</Pressable>
				<Divider />
			</VStack>
		</View>
	)
}
