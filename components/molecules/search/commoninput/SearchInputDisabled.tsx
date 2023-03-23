import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Box, Icon, Input } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

type Props = {
	onPress: () => void
}

const SearchInputDisabled = (props: Props) => {
	const colorScheme = useThemeColorScheme()

	return (
		<Box>
			<Input
				variant={'filled'}
				rounded={'lg'}
				_input={{
					fontSize: 'lg',
				}}
				h={SEARCH_BAR_HEIGHT}
				_light={{ bgColor: 'light.200' }}
				_dark={{ bgColor: 'dark.200' }}
				flex={1}
				mx={2}
				keyboardAppearance={colorScheme}
				placeholder='Search'
				editable={false}
				value={''}
				focusable={false}
				isReadOnly
				onFocus={props.onPress}
				returnKeyType='search'
				underlineColorAndroid='transparent'
				InputLeftElement={
					<Icon
						_light={{ color: 'light.400' }}
						_dark={{ color: 'dark.400' }}
						as={Ionicons}
						name='ios-search'
						size={'lg'}
						ml={2}
					/>
				}
				onPressIn={props.onPress}
			/>
		</Box>
	)
}

export default SearchInputDisabled
