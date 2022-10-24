import { CommonActions, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { Icon, SearchBar } from '@rneui/themed'
import React, { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, View, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from 'styled-components/native'

const SearchTopTabStackInput = () => {
	const _searchInputRef = useRef<TextInput>(null)
	const inset = useSafeAreaInsets()
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const route = useRoute()

	const params: any = route.params

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
			searchText: params.params.searchText,
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	useEffect(() => {
		if (params.params.searchText) {
			setValue('searchText', params.params.searchText)
		}
	}, [params.params.searchText])

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		const pushAction = StackActions.push('HomeTabNavigator', {
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
		navigation.dispatch(pushAction)
	}

	const goBack = () => {
		Keyboard.dismiss()
		_searchInputRef.current?.blur()
		navigation.dispatch(StackActions.pop())
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
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-around',
				paddingTop: inset.top,
			}}
		>
			<Icon
				type='ionicon'
				onPress={goBack}
				name='arrow-back'
				size={35}
				color={themeContext.palette.primary.color.primary}
				containerStyle={{
					width: '10%',
					height: '100%',
					justifyContent: 'center',
				}}
			/>
			<Controller
				control={control}
				name='searchText'
				render={({ field: { value, onChange } }) => (
					<SearchBar
						ref={_searchInputRef}
						placeholder='Search'
						value={value}
						onChangeText={(text: string) => changeSearchText(text)}
						onSubmitEditing={handleSearchSubmitEditting}
						platform='ios'
						returnKeyType='search'
						searchIcon={
							<Icon
								type='ionicon'
								name='ios-search'
								size={20}
								color={themeContext.palette.primary.color.primary}
							/>
						}
						underlineColorAndroid='transparent'
						onCancel={() => {
							clearSearchInput()
							navigation.dispatch(StackActions.popToTop())
						}}
						onPressIn={() => {
							navigation.navigate('HomeTabNavigator', {
								screen: 'ExploreStack',
								params: {
									screen: 'SearchTextScreen',
									params: {
										searchText: value,
									},
								},
							})
						}}
						containerStyle={{
							backgroundColor: 'transparent',
							alignSelf: 'center',
							width: '90%',
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
		</View>
	)
}

export default SearchTopTabStackInput
