import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Icon, Box, IconButton, Input } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

const VenueSearchInputDisable = () => {
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)

	return (
		<Box marginBottom={-3}>
			<Input
				placeholder='Search venues'
				// disabled
				value={''}
				underlineColorAndroid='transparent'
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
						rounded={'full'}
						size={'sm'}
						color={'transparent'}
						variant={'solid'}
					/>
				}
				style={{
					borderBottomColor: 'transparent',
					paddingHorizontal: 5,
					borderRadius: 14,
				}}
			/>
		</Box>
	)
}

export default VenueSearchInputDisable
