import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Icon, Input, useTheme } from 'native-base'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { ThemeContext } from 'styled-components/native'

type Props = {
	onPress: () => void
}

const ExploreSearchInputDisabled = (props: Props) => {
	const colorScheme = useThemeColorScheme()
	const themeContext = useContext(ThemeContext)

	return (
		<Input
			variant={'filled'}
			rounded={'lg'}
			px={3}
			style={{
				borderBottomColor: 'transparent',
				borderRadius: 14,
			}}
			_input={{
				color: themeContext.palette.primary.color.default,
				fontSize: 'lg',
			}}
			_light={{ bgColor: 'light.50' }}
			_dark={{ bgColor: 'dark.50' }}
			mx={2}
			keyboardAppearance={colorScheme}
			placeholder='Search'
			value={''}
			focusable={false}
			isReadOnly
			onFocus={props.onPress}
			returnKeyType='search'
			underlineColorAndroid='transparent'
			leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
			onPressIn={props.onPress}
		/>
	)
}

export default ExploreSearchInputDisabled
