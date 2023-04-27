import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Box, HStack, Icon, IconButton, Input } from 'native-base'
import { Keyboard } from 'react-native'

type Props = {
	onPress: () => void
}

const SearchAreaInputDisabled = (props: Props) => {
	const router = useRouter()
	const colorScheme = useThemeColorScheme()

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	return (
		<Box h={SEARCH_BAR_HEIGHT}>
			<HStack alignItems={'center'}>
				<IconButton
					isFocusVisible={false}
					_hover={{
						bg: 'transparent',
					}}
					_pressed={{
						bg: 'transparent',
					}}
					_focus={{
						bg: 'transparent',
					}}
					icon={
						<Icon
							as={Ionicons}
							size={'xl'}
							name='arrow-back'
							_light={{ color: 'light.600' }}
							_dark={{ color: 'dark.400' }}
						/>
					}
					w={'50px'}
					h={45}
					onPress={goBack}
				/>
				<Input
					variant={'unstyled'}
					_light={{ bgColor: 'light.200' }}
					_dark={{ bgColor: 'dark.200' }}
					flex={1}
					mr={2}
					rounded={'lg'}
					h={SEARCH_BAR_HEIGHT}
					_input={{
						fontSize: 'lg',
					}}
					keyboardAppearance={colorScheme}
					placeholder='Search'
					value={''}
					onFocus={props.onPress}
					returnKeyType='search'
					underlineColorAndroid='transparent'
					InputLeftElement={
						<Icon
							as={Ionicons}
							_light={{ color: 'light.600' }}
							_dark={{ color: 'dark.400' }}
							name='ios-search'
							size={'md'}
							ml={2}
						/>
					}
					onPressIn={props.onPress}
					focusable={false}
					isReadOnly
				/>
			</HStack>
		</Box>
	)
}

export default SearchAreaInputDisabled
