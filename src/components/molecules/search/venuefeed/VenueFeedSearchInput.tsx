import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { SearchReactiveVar } from '@reactive'
import { IInputProps, Input, Icon } from 'native-base'
import { useContext, useRef, useState } from 'react'
import { View, Keyboard } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const VenueFeedSearchInput = () => {
	const _searchInputRef = useRef<IInputProps>(null)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const [isSearch, setIsSearch] = useState(false)
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
			screen: 'VenueFeedStack',
			params: {
				screen: 'VenueFeedScreen',
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
					// navigation.dispatch(StackActions.push('SearchTextScreen', { text: '123' }))
					navigation.dispatch(
						StackActions.push('SearchNavigator', { screen: 'SearchTextScreen', params: { text: '123' } }),
					)
				}}
				underlineColorAndroid='transparent'
				onPressIn={() => {
					setIsSearch(true)
					// navigation.navigate('HomeTabNavigator', {
					// 	screen: 'VenueFeedStack',
					// 	params: {
					// 		screen: 'SearchTextScreen',
					// 	},
					// })
				}}
				onFocus={() => {
					// navigation.navigate('HomeTabNavigator', {
					// 	screen: 'VenueFeedStack',
					// 	params: {
					// 		screen: 'SearchTextScreen',
					// 	},
					// })
				}}
				mt={'10px'}
				style={{
					borderBottomColor: 'transparent',
					paddingHorizontal: 10,
					borderRadius: 14,
				}}
				leftElement={
					isSearch || rSearch.searchText.length ? (
						<Icon as={Ionicons} onPress={goBackToFeed} name='arrow-back' size={28} />
					) : (
						<Icon as={Ionicons} name='ios-search' size={20} />
					)
				}
				rightElement={
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						{!isSearch && (
							<Icon
								as={Ionicons}
								onPress={() =>
									// navigation.navigate('ModalNavigator', {
									// 	screen: 'MapLocationModal',
									// })
									console.log('TODO: ===>')
								}
								name='filter'
								size={24}
								style={{ marginHorizontal: 10 }}
							/>
						)}
						{!!rSearch.searchText.length && (
							<Icon as={Ionicons} name='close-circle' size={25} onPress={clearSearchInput} />
						)}
					</View>
				}
			/>
		</SafeAreaView>
	)
}

export default VenueFeedSearchInput
