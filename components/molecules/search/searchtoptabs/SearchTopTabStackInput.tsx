import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter, useSearchParams } from 'expo-router'
import { Box, HStack, Icon, IconButton, Input } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

const SearchTopTabStackInput = () => {
	const router = useRouter()
	const params = useSearchParams()
	const _searchInputRef = useRef<TextInput>(null)
	const colorScheme = useThemeColorScheme()

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
			searchText: String(params?.searchtext) || '',
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
		setValue('searchText', String(params.searchtext))
	}, [params?.searchtext])

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
				<IconButton
					isFocusVisible={false}
					_hover={{
						bg: 'transparent',
					}}
					_pressed={{
						bg: 'transparent',
					}}
					_focus={{
						bg: 'transparent',
					}}
					icon={
						<Icon
							as={Ionicons}
							size={'xl'}
							name='arrow-back'
							_light={{ color: 'light.700' }}
							_dark={{ color: 'dark.400' }}
						/>
					}
					w={'50px'}
					h={35}
					onPress={goBack}
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
							flex={1}
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
							leftElement={
								<Icon
									as={Ionicons}
									_light={{ color: 'light.400' }}
									_dark={{ color: 'dark.400' }}
									name='ios-search'
									size={'lg'}
									ml={2}
								/>
							}
							underlineColorAndroid='transparent'
							onPressIn={() => {
								router.push({
									params: {
										searchtext: value,
									},
									pathname: '(app)/hometab/explorestack/searchtext',
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
