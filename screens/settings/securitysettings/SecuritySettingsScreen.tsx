import { useReactiveVar } from '@apollo/client'
import { ThemeReactiveVar } from '@reactive'
import { useToggleTheme } from '@util/hooks/theme/useToggleTheme'
import { Text } from 'native-base'
import { View } from 'native-base'
import React from 'react'

export default function SecuritySettingsScreen() {
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
			<Text fontSize={'5xl'}>SECURITY</Text>
		</View>
	)
}
