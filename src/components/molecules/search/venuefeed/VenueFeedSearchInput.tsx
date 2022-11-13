import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Icon, Box, IconButton, Input } from 'native-base'

const VenueFeedSearchInput = () => {
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()

	return (
		<Box>
			<Input
				variant={'filled'}
				rounded={'lg'}
				mx={2}
				py={4}
				placeholder='Search venues'
				keyboardAppearance={colorScheme}
				underlineColorAndroid='transparent'
				_input={{
					fontSize: 'lg',
				}}
				leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
				rightElement={
					<IconButton
						icon={<Icon as={FontAwesome5} name='filter' />}
						onPress={() =>
							navigation.navigate('ModalNavigator', {
								screen: 'SearchAreaModalStack',
								params: {
									screen: 'SearchAreaModal',
								},
							})
						}
						mr={2}
						rounded={'full'}
						size={'sm'}
						color={'transparent'}
						variant={'solid'}
					/>
				}
			/>
		</Box>
	)
}

export default VenueFeedSearchInput
