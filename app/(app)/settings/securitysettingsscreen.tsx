import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { View, Text } from 'native-base'

export default () => {
	const rThemeVar = useReactiveVar(ThemeReactiveVar)
	const [toggleThemes] = useToggleTheme()

	const setTheme = async ({ colorScheme }: { colorScheme: 'light' | 'dark' | 'system' }) => {
		await toggleThemes({ colorScheme })
	}

	return (
		<View
			_dark={{
				bg: 'dark.100',
			}}
			_light={{
				bg: 'light.100',
			}}
			flex={1}
		>
			<Text fontSize={'5xl'}>SECURITY</Text>
		</View>
	)
}
