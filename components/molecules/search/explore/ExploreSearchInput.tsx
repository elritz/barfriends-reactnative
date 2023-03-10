import { useReactiveVar } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { SearchReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Input, Icon, IInputProps } from 'native-base'
import { useRef, useContext, useState } from 'react'
import { Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const ExploreSearchInput = () => {
	const router = useRouter()
	const _searchInputRef = useRef<IInputProps>(null)
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
		router.push({
			pathname: '(app)/hometabnavigator/searchstack/searchtext',
			params: {
				searchText: '',
			},
		})
	}

	const clearSearchInput = () => {
		_searchInputRef?.current?.clear()
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
					router.push({
						pathname: '(app)/hometabnavigator/searchstack/searchresulttabs',
						params: {},
					})
				}}
				onPressIn={() => {
					setIsSearch(true)
					router.push({
						pathname: '(app)/hometabnavigator/searchstack/searchtext',
						params: {},
					})
				}}
				onFocus={() => {
					router.push({
						pathname: '(app)/hometabnavigator/searchstack/searchtext',
						params: {},
					})
				}}
				leftElement={
					isSearch || rSearch?.searchText.length ? (
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
