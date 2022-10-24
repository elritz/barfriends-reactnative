import { CommonActions, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { SearchBar } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { Box } from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ThemeContext } from 'styled-components/native'

// TODO: UX() get the navigation route here as well

const SearchAreaScreenInput = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const route: any = useRoute()

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
		const values = getValues()
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
					<SearchBar
						placeholder='Searchssss'
						platform='ios'
						autoFocus
						value={value}
						onChangeText={text => changeSearchText(text)}
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
						onSubmitEditing={handleSearchSubmitEditting}
						onCancel={() => {
							clearSearchInput()
							navigation.dispatch(StackActions.popToTop())
						}}
						containerStyle={{
							backgroundColor: 'transparent',
							alignSelf: 'center',
						}}
						cancelButtonProps={{
							color: themeContext.palette.primary.color.primary,
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
				)}
			/>
		</Box>
	)
}

export default SearchAreaScreenInput
