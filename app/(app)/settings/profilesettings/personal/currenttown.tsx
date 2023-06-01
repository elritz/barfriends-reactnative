import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, View } from 'native-base'
import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components/native'

interface CurrentPlacceScreenProps {}

export default ({}: CurrentPlacceScreenProps) => {
	const themeContext = useContext(ThemeContext)
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
					color: themeContext.palette.primary.color.default,
					borderBottomColor: 'transparent',
					backgroundColor: themeContext.palette.secondary.background.default,
				}}
			/>
		</View>
	)
}
