import { Ionicons } from '@expo/vector-icons'
import { Icon, Input } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

type Props = {
	onPress: () => void
}

const ExploreSearchInputDisabled = (props: Props) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Input
			placeholder='Search'
			value={''}
			isDisabled
			returnKeyType='search'
			underlineColorAndroid='transparent'
			leftElement={
				<Icon
					as={Ionicons}
					name='ios-search'
					size={20}
					color={themeContext.palette.primary.color.default}
				/>
			}
			onPressIn={props.onPress}
			style={{
				alignSelf: 'center',
				borderBottomColor: 'transparent',
				paddingHorizontal: 5,
				// backgroundColor: themeContext.palette.secondary.background,
				borderRadius: 14,
				height: 50,
				color: themeContext.palette.primary.color.default,
			}}
		/>
	)
}

export default ExploreSearchInputDisabled
