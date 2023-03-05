import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Icon, IconButton, Input } from 'native-base'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const VenueFeedSearchInput = () => {
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	const themeContext = useContext(ThemeContext)
	return (
		<Input
			variant={'filled'}
			_light={{ bgColor: 'light.50' }}
			_dark={{ bgColor: 'dark.50' }}
			rounded={'lg'}
			w={'95%'}
			alignSelf={'center'}
			mx={2}
			style={{
				borderBottomColor: 'transparent',
				borderRadius: 14,
			}}
			_input={{
				color: themeContext.palette.primary.color.default,
				fontSize: 'lg',
			}}
			placeholder={'Search venues'}
			returnKeyType='search'
			underlineColorAndroid='transparent'
			keyboardAppearance={colorScheme}
			leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
			rightElement={
				<IconButton
					icon={<Icon as={FontAwesome5} name='filter' />}
					onPress={() =>
						router.push({
							pathname: '(app)/modalnavigator/searchareamodalstack',
						})
					}
					rounded={'full'}
					color={'transparent'}
				/>
			}
		/>
	)
}

export default VenueFeedSearchInput
