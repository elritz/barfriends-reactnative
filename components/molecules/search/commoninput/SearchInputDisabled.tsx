import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Box, Icon, Input } from 'native-base'

type Props = {
	onPress: () => void
}

const SearchInputDisabled = (props: Props) => {
	const colorScheme = useThemeColorScheme()

	return (
		<Box>
			<Input
				variant={'unstyled'}
				rounded={'lg'}
				_input={{
					fontSize: 'lg',
				}}
				h={SEARCH_BAR_HEIGHT}
				_light={{ bgColor: 'light.200' }}
				_dark={{ bgColor: 'dark.200' }}
				mx={2}
				alignSelf={'center'}
				placeholder={'Search venues'}
				returnKeyType='search'
				underlineColorAndroid='transparent'
				keyboardAppearance={colorScheme}
				InputLeftElement={
					<Icon
						as={Ionicons}
						_light={{ color: 'light.400' }}
						_dark={{ color: 'dark.400' }}
						name='ios-search'
						size={'lg'}
						ml={2}
					/>
				}
				onFocus={props.onPress}
				onPressIn={props.onPress}
			/>
		</Box>
	)
}

export default SearchInputDisabled
