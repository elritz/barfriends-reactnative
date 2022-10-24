import { useNavigation } from '@react-navigation/native'
import { Icon, SearchBar } from '@rneui/themed'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'

type Props = {
	onPress: () => void
}

const ExploreSearchInputDisabled = (props: Props) => {
	const themeContext = useContext(ThemeContext)

	return (
		<SearchBar
			placeholder='Search'
			platform='ios'
			value={''}
			disabled
			returnKeyType='search'
			underlineColorAndroid='transparent'
			searchIcon={
				<Icon
					type='ionicon'
					name='ios-search'
					size={20}
					color={themeContext.palette.primary.color.primary}
				/>
			}
			onPressIn={props.onPress}
			cancelButtonProps={{
				color: themeContext.palette.primary.color.primary,
			}}
			containerStyle={{
				backgroundColor: 'transparent',
				alignSelf: 'center',
			}}
			inputContainerStyle={{
				borderBottomColor: 'transparent',
				paddingHorizontal: 5,
				backgroundColor: themeContext.palette.secondary.background,
				borderRadius: 14,
				height: 50,
			}}
			inputStyle={{
				color: themeContext.palette.primary.color.primary,
			}}
		/>
	)
}

export default ExploreSearchInputDisabled
