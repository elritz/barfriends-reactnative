import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SearchReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Input, Icon, IInputProps } from 'native-base'
import { useRef, useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ExploreSearchInput = () => {
	const _searchInputRef = useRef<IInputProps>(null)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const [isSearch, setIsSearch] = useState(false)
	const colorScheme = useThemeColorScheme()
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
				variant={'filled'}
				_light={{ bgColor: 'light.50' }}
				_dark={{ bgColor: 'dark.50' }}
				w={'85%'}
				px={3}
				style={{
					borderBottomColor: 'transparent',
					borderRadius: 14,
				}}
				_input={{
					color: themeContext.palette.primary.color.default,
					fontSize: 'lg',
				}}
				returnKeyType='search'
				underlineColorAndroid='transparent'
				keyboardAppearance={colorScheme}
				placeholder='Search'
				value={rSearch?.searchText}
				onChangeText={text => changeSearchText(text)}
				onSubmitEditing={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchResultTabStack',
							params: {
								screen: 'TopScreen',
								params: {},
							},
						},
					})
					// navigation.dispatch(StackActions.push('SearchNavigator', { screen: 'SearchTextScreen', params: { text: '123' } }))
				}}
				onPressIn={() => {
					setIsSearch(true)
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
							params: {},
						},
					})
				}}
				onFocus={() => {
					navigation.navigate('HomeTabNavigator', {
						screen: 'ExploreStack',
						params: {
							screen: 'SearchTextScreen',
							params: {},
						},
					})
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
