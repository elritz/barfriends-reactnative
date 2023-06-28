import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Icon, IconButton, Input } from 'native-base'

const VenueFeedSearchInput = () => {
	const router = useRouter()
	const colorScheme = useThemeColorScheme()

	return (
		<Input
			variant={'unstyled'}
			rounded={'lg'}
			_input={{
				fontSize: 'lg',
			}}
			h={SEARCH_BAR_HEIGHT}
			mx={2}
			_light={{ bgColor: 'light.200' }}
			_dark={{ bgColor: 'dark.200' }}
			// flex={1}
			alignSelf={'center'}
			placeholder={'Search area'}
			returnKeyType='search'
			underlineColorAndroid='transparent'
			keyboardAppearance={colorScheme}
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
	)
}

export default VenueFeedSearchInput
