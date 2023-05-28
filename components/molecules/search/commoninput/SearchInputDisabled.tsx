import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Box, Icon, Input, Pressable } from 'native-base'

type Props = {
	onPress: () => void
}

const SearchInputDisabled = (props: Props) => {
	const colorScheme = useThemeColorScheme()

	return (
		<Box position={'relative'} flex={1}>
			<Pressable
				position={'absolute'}
				top={0}
				bottom={0}
				left={0}
				right={0}
				zIndex={10}
				onPressIn={props.onPress}
			></Pressable>
			<Input
				position={'absolute'}
				bottom={0}
				left={0}
				right={0}
				variant={'unstyled'}
				_light={{ bgColor: 'light.200' }}
				_dark={{ bgColor: 'dark.200' }}
				rounded={'lg'}
				mx={2}
				_input={{
					fontSize: 'lg',
				}}
				h={SEARCH_BAR_HEIGHT}
				alignSelf={'center'}
				placeholderTextColor={colorScheme === 'dark' ? 'dark.900' : 'light.900'}
				placeholder={'Search'}
				returnKeyType='search'
				underlineColorAndroid='transparent'
				keyboardAppearance={colorScheme}
				InputLeftElement={
					<Icon
						as={Ionicons}
						_light={{ color: 'light.600' }}
						_dark={{ color: 'dark.900' }}
						name='ios-search'
						size={'md'}
						ml={2}
					/>
				}
			/>
		</Box>
	)
}

export default SearchInputDisabled
