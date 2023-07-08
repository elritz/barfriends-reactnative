import { useReactiveVar } from '@apollo/client'
import { HStack, Input, Pressable } from '@components/core'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter, useSearchParams } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

const SearchTopTabStackInput = () => {
	const _searchInputRef = useRef<TextInput>(null)
	const router = useRouter()
	const params = useSearchParams()
	const rTheme = useReactiveVar(ThemeReactiveVar)
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
			searchtext: params.searchtext as string,
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
		setValue('searchtext', params.searchtext as string)
	}, [params.searchtext])

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		router.push({
			params: {
				searchtext: values.searchtext,
			},
			pathname: '(app)/hometab/searchstack/searchtext',
		})
	}

	const goBack = () => {
		Keyboard.dismiss()
		_searchInputRef.current?.blur()
		router.back()
	}

	return (
		<HStack alignItems={'center'}>
			<Pressable
				onPress={goBack}
				sx={{
					':hover': {
						bg: 'transparent',
					},
					':pressed': {
						bg: 'transparent',
					},
					':focus': {
						bg: 'transparent',
					},
					w: 50,
					h: 35,
				}}
			>
				<Ionicons
					isFocusVisible={false}
					name='arrow-back'
					color={
						colorScheme === 'light'
							? rTheme.theme?.gluestack.tokens.colors.light900
							: rTheme.theme?.gluestack.tokens.colors.dark900
					}
					size={35}
				/>
			</Pressable>
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input isReadOnly ref={_searchInputRef} variant='underlined'>
						<Ionicons
							size={20}
							style={{
								marginLeft: 2,
							}}
							name='ios-search'
							color={
								colorScheme === 'light'
									? rTheme.theme?.gluestack.tokens.colors.light900
									: rTheme.theme?.gluestack.tokens.colors.dark900
							}
						/>
						<Input.Input
							sx={{
								_dark: {
									bg: '$dark200',
								},
								_light: {
									bg: '$light200',
								},
							}}
							rounded={'lg'}
							flex={1}
							value={value}
							keyboardAppearance={colorScheme === 'light' ? 'light' : 'dark'}
							placeholder='Search'
							autoCorrect={false}
							mr={'$2'}
							onChangeText={onChange}
							onSubmitEditing={handleSearchSubmitEditting}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onPressIn={() => {
								router.replace({
									params: {
										searchtext: value,
									},
									pathname: '(app)/hometab/explorestack/searchtext',
								})
							}}
						/>
					</Input>
				)}
			/>
		</HStack>
	)
}

export default SearchTopTabStackInput
