import { useReactiveVar } from '@apollo/client'
import { StackActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { SearchReactiveVar } from '@reactive'
import { Input } from '@rneui/base'
import { Icon } from '@rneui/themed'
import React, { useContext } from 'react'
import { View, Keyboard } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ExploreSearchInput = () => {
	const _searchInputRef = React.useRef<Input>(null)
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
				inputContainerStyle={{
					height: 40,
					borderBottomColor: 'transparent',
					paddingHorizontal: 10,
					backgroundColor: themeContext.palette.secondary.background,
					borderRadius: 14,
				}}
				inputStyle={{
					color: themeContext.palette.primary.color.primary,
				}}
				leftIcon={
					isSearch || rSearch.searchText.length ? (
						<Icon
							type='ionicon'
							onPress={goBackToFeed}
							name='arrow-back'
							size={28}
							color={themeContext.palette.primary.color.primary}
						/>
					) : (
						<Icon
							type='ionicon'
							name='ios-search'
							size={20}
							color={themeContext.palette.primary.color.primary}
						/>
					)
				}
				rightIcon={
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						{!isSearch && (
							<Icon
								type='ionicon'
								onPress={() =>
									navigation.navigate('ModalNavigator', {
										screen: 'MapLocationModal',
									})
								}
								name='filter'
								size={24}
								style={{ marginHorizontal: 5 }}
								color={themeContext.palette.primary.color.primary}
							/>
						)}
						{!!rSearch.searchText.length && (
							<Icon
								type='ionicon'
								name='close-circle'
								size={25}
								color={themeContext.palette.primary.color.primary}
								onPress={clearSearchInput}
							/>
						)}
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default ExploreSearchInput
