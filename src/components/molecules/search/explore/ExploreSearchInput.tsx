import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SearchReactiveVar } from '@reactive'
import { Input, Icon, IInputProps } from 'native-base'
import React, { useContext } from 'react'
import { Keyboard } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ExploreSearchInput = () => {
	const _searchInputRef = React.useRef<IInputProps>(null)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const inset = useSafeAreaInsets()
	const [isSearch, setIsSearch] = React.useState(false)
	const rSearch = useReactiveVar(SearchReactiveVar)

	const changeSearchText = (text: string) => {
		SearchReactiveVar({
			...rSearch,
			searchText: text,
		})
	}

	const goBackToFeed = () => {
		Keyboard.dismiss()
		setIsSearch(false)
		_searchInputRef.current?.blur()
		navigation.navigate('HomeTabNavigator', {
			screen: 'ExploreStack',
			params: {
				screen: 'ExploreScreen',
			},
		})
	}

	const clearSearchInput = () => {
		_searchInputRef.current.clear()
		SearchReactiveVar({
			...rSearch,
			searchText: '',
		})
	}

	return (
		<SafeAreaView>
			<Input
				ref={_searchInputRef}
				placeholder='Search'
				value={rSearch.searchText}
				onChangeText={text => changeSearchText(text)}
				returnKeyType='search'
				onSubmitEditing={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchResultTabStack',
							params: {
								screen: 'TopScreen',
							},
						},
					})
					// navigation.dispatch(StackActions.push('SearchNavigator', { screen: 'SearchTextScreen', params: { text: '123' } }))
				}}
				underlineColorAndroid='transparent'
				onPressIn={() => {
					setIsSearch(true)
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
						},
					})
				}}
				onFocus={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
						},
					})
				}}
				px={3}
				style={{
					height: 40,
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
				_input={{
					color: themeContext.palette.primary.color.default,
				}}
				leftElement={
					isSearch || rSearch.searchText.length ? (
						<Icon
							as={Ionicons}
							onPress={goBackToFeed}
							name='arrow-back'
							size={28}
							color={themeContext.palette.primary.color.default}
						/>
					) : (
						<Icon
							as={Ionicons}
							name='ios-search'
							size={20}
							color={themeContext.palette.primary.color.default}
						/>
					)
				}
			/>
		</SafeAreaView>
	)
}

export default ExploreSearchInput
