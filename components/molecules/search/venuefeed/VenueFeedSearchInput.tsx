import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Box, Icon, IconButton, Input } from 'native-base'

const VenueFeedSearchInput = () => {
	const router = useRouter()
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
				// flex={1}
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
				rightElement={
					<IconButton
						icon={<Icon as={FontAwesome5} name='filter' size={'md'} />}
						onPress={() =>
							router.push({
								pathname: '(app)/searcharea',
							})
						}
						_pressed={{
							bg: 'transparent',
						}}
					/>
				}
			/>
		</Box>
	)
}

export default VenueFeedSearchInput
