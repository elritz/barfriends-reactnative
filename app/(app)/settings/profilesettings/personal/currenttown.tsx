import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, View, useTheme } from 'native-base'
import { useState } from 'react'

interface CurrentPlacceScreenProps {}

export default ({}: CurrentPlacceScreenProps) => {
	const theme = useTheme()
	const colorScheme = useThemeColorScheme()
	const [search, setSearch] = useState<string>('')

	return (
		<View>
			<Input
				placeholder='Search...'
				onChangeText={(text: string) => setSearch(text)}
				value={search}
				keyboardAppearance={colorScheme}
				style={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
					paddingHorizontal: 5,
					borderRadius: 14,
				}}
				_input={{
					color: colorScheme === 'light' ? theme.colors.light[900] : theme.colors.dark[900],
					borderBottomColor: 'transparent',
					backgroundColor: colorScheme === 'light' ? theme.colors.light[50] : theme.colors.dark[50],
				}}
			/>
		</View>
	)
}
