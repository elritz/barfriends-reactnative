import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useNavigation, useRouter, useSearchParams } from 'expo-router'
import { Box, HStack, Icon, Input } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

const SearchTopTabStackInput = () => {
	const router = useRouter()
	const params = useSearchParams()
	const _searchInputRef = useRef<TextInput>(null)
	const colorScheme = useThemeColorScheme()
	const navigation = useNavigation()
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
			searchText: String(params?.searchText) || '',
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
		console.log('params.searchText =======++> :>> ', params.searchText)
		setValue('searchText', String(params.searchText))
	}, [params?.searchText])

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		router.push({
			params: {
				searchText: values.searchText,
			},
			pathname: '(app)/hometab/searchstack/searchtext',
		})
	}

	const goBack = () => {
		Keyboard.dismiss()
		_searchInputRef.current?.blur()
		router.back()
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		router.setParams({
			searchText: text,
		})
	}

	const clearSearchInput = () => {
		setValue('searchText', '')
		router.setParams({
			searchText: '',
		})
	}

	return (
		<Box>
			<HStack alignItems={'center'}>
				<Icon
					as={Ionicons}
					onPress={goBack}
					name='arrow-back'
					size={'2xl'}
					ml={2}
					style={{
						width: 35,
					}}
				/>
				<Controller
					control={control}
					name='searchText'
					render={({ field: { value } }) => (
						<Input
							_light={{ bgColor: 'light.50' }}
							_dark={{ bgColor: 'dark.50' }}
							variant={'filled'}
							rounded={'lg'}
							mr={2}
							w={'85%'}
							keyboardAppearance={colorScheme}
							ref={_searchInputRef}
							placeholder='Search'
							_input={{
								fontSize: 'lg',
							}}
							value={value}
							isReadOnly
							onChangeText={(text: string) => changeSearchText(text)}
							onSubmitEditing={handleSearchSubmitEditting}
							returnKeyType='search'
							leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={2} />}
							underlineColorAndroid='transparent'
							onPressIn={() => {
								router.push({
									params: {
										searchText: value,
									},
									pathname: '(app)/hometab/searchstack/searchtext',
								})
							}}
						/>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default SearchTopTabStackInput
