import { useReactiveVar } from '@apollo/client'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Input } from '@rneui/themed'
import { Icon, Box, IconButton } from 'native-base'
import React, { useContext } from 'react'
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
				leftIcon={
					<Icon
						as={Ionicons}
						name='ios-search'
						size={'lg'}
						ml={2}
						color={themeContext.palette.primary.color.primary}
					/>
				}
				rightIcon={
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
				containerStyle={{
					backgroundColor: 'transparent',
				}}
				inputContainerStyle={{
					backgroundColor: themeContext.palette.secondary.background,
					borderBottomColor: 'transparent',
					paddingHorizontal: 5,
					borderRadius: 14,
				}}
				inputStyle={{
					color: themeContext.palette.primary.color.primary,
				}}
			/>
		</Box>
	)
}

export default VenueSearchInputDisable
