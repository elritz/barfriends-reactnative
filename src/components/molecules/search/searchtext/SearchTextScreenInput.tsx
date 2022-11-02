import { Ionicons } from '@expo/vector-icons'
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
import { Box, Icon, Input } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ExploreFilterTabParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

export type SearchTextScreenRouteProp = RouteProp<ExploreFilterTabParamList, 'SearchTextScreen'>
// TODO: UX() get the navigation route here as well default values from form
const SearchTextScreenInput = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const route = useRoute<SearchTextScreenRouteProp>()

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			searchText: route.params?.searchText || '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const handleSearchSubmitEditting = item => {
		navigation.dispatch(StackActions.pop())
		const values = getValues()
		navigation.navigate('HomeTabNavigator', {
			screen: 'ExploreStack',
			params: {
				screen: 'SearchResultTabStack',
				params: {
					screen: 'TopScreen',
					params: {
						searchText: values.searchText,
					},
				},
			},
		})
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		navigation.dispatch(CommonActions.setParams({ searchText: text }))
	}

	const clearSearchInput = () => {
		setValue('searchText', '')
		navigation.dispatch(CommonActions.setParams({ searchText: '' }))
	}

	return (
		<Box>
			<Controller
				control={control}
				name='searchText'
				render={({ field: { value, onChange } }) => (
					<Input
						placeholder='Search'
						autoFocus
						value={value}
						onChangeText={text => changeSearchText(text)}
						returnKeyType='search'
						underlineColorAndroid='transparent'
						leftElement={<Icon as={Ionicons} name='ios-search' size={20} />}
						onSubmitEditing={handleSearchSubmitEditting}
						// onCancel={() => {
						// 	clearSearchInput()
						// 	navigation.dispatch(StackActions.popToTop())
						// }}
						onPressIn={() => {
							navigation.navigate('HomeTabNavigator', {
								screen: 'ExploreStack',
								params: {
									screen: 'SearchTextScreen',
								},
							})
						}}
						style={{
							backgroundColor: 'transparent',
							alignSelf: 'center',
							paddingHorizontal: 5,
						}}
						_input={{
							borderBottomColor: 'transparent',
							borderRadius: 14,
							height: 50,
						}}
					/>
				)}
			/>
		</Box>
	)
}

export default SearchTextScreenInput
