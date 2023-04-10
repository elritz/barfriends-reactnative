import { useReactiveVar } from '@apollo/client'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { SearchReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { Input, Icon, IInputProps } from 'native-base'
import { useRef, useContext, useState } from 'react'
import { Keyboard } from 'react-native'
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
			pathname: '(app)/hometab/searchstack/searchtext',
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
		<Input
			ref={_searchInputRef}
			variant={'unstyled'}
			rounded={'lg'}
			_input={{
				fontSize: 'lg',
			}}
			h={SEARCH_BAR_HEIGHT}
			_light={{ bgColor: 'light.200' }}
			_dark={{ bgColor: 'dark.200' }}
			mx={2}
			alignSelf={'center'}
			placeholder='Search'
			returnKeyType='search'
			underlineColorAndroid='transparent'
			keyboardAppearance={colorScheme}
			InputLeftElement={
				isSearch || rSearch?.searchText.length ? (
					<Icon
						as={Ionicons}
						onPress={goBackToFeed}
						name='arrow-back'
						size={28}
						_light={{ color: 'light.400' }}
						_dark={{ color: 'dark.400' }}
					/>
				) : (
					<Icon
						as={Ionicons}
						_light={{ color: 'light.400' }}
						_dark={{ color: 'dark.400' }}
						name='ios-search'
						size={'lg'}
						ml={2}
					/>
				)
			}
			value={rSearch?.searchText}
			onChangeText={text => changeSearchText(text)}
			onSubmitEditing={() => {
				router.push({
					pathname: '(app)/hometab/searchstack/searchresulttabs',
					params: {},
				})
			}}
			onPressIn={() => {
				setIsSearch(true)
				router.push({
					pathname: '(app)/hometab/searchstack/searchtext',
					params: {},
				})
			}}
			onFocus={() => {
				router.push({
					pathname: '(app)/hometab/searchstack/searchtext',
					params: {},
				})
			}}
		/>
	)
}

export default ExploreSearchInput
