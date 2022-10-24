import RNEHeading1000 from '@components/atoms/typography/RNETypography/heading/RNEHeading1000'
import { SearchBar } from '@rneui/themed'
import { useContext, useState } from 'react'
import { View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

interface CurrentPlacceScreenProps {}

const CurrentPlacceScreen = ({}: CurrentPlacceScreenProps) => {
	const themeContext = useContext(ThemeContext)
	const [search, setSearch] = useState<string>('')

	return (
		<View>
			<SearchBar
				placeholder='Search...'
				onChangeText={(text: string) => setSearch(text)}
				showCancel={false}
				platform='ios'
				value={search}
				containerStyle={{
					backgroundColor: 'transparent',
					width: '95%',
					alignSelf: 'center',
				}}
				cancelButtonProps={{
					color: themeContext.palette.primary.color.primary,
				}}
				inputContainerStyle={{
					borderBottomColor: 'transparent',
					paddingHorizontal: 5,
					backgroundColor: themeContext.palette.secondary.background,
					borderRadius: 14,
				}}
			/>
		</View>
	)
}
export default CurrentPlacceScreen
