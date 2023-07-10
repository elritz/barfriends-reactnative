import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
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
			pathname: '(app)/explore/searchtext',
		})
	}

	return (
		<HStack alignItems={'center'}>
			<ChevronBackArrow />
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input
						variant={'rounded'}
						flex={1}
						mr={'$2'}
						sx={{
							':focus': {
								borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
							},
							':focusVisible': {
								borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
							},
							borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
						}}
					>
						<Input.Input
							keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							placeholderTextColor={rTheme.colorScheme === 'light' ? '$light900' : '$dark900'}
							autoCorrect={false}
							autoCapitalize={'none'}
							placeholder='Search'
							autoFocus
							value={value}
							blurOnSubmit={false}
							onChangeText={onChange}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
						/>
					</Input>
					// <Input isReadOnly ref={_searchInputRef} variant='underlined'>
					// 	<Ionicons
					// 		size={20}
					// 		style={{
					// 			marginLeft: 2,
					// 		}}
					// 		name='ios-search'
					// 		color={
					// 			colorScheme === 'light'
					// 				? rTheme.theme?.gluestack.tokens.colors.light900
					// 				: rTheme.theme?.gluestack.tokens.colors.dark900
					// 		}
					// 	/>
					// 	<Input.Input
					// 		sx={{
					// 			_dark: {
					// 				bg: '$dark200',
					// 			},
					// 			_light: {
					// 				bg: '$light200',
					// 			},
					// 		}}
					// 		rounded={'lg'}
					// 		flex={1}
					// 		value={value}
					// 		keyboardAppearance={colorScheme === 'light' ? 'light' : 'dark'}
					// 		placeholder='Search'
					// 		autoCorrect={false}
					// 		mr={'$2'}
					// 		onChangeText={onChange}
					// 		onSubmitEditing={handleSearchSubmitEditting}
					// 		returnKeyType='search'
					// 		underlineColorAndroid='transparent'
					// 		onPressIn={() => {
					// 			router.replace({
					// 				params: {
					// 					searchtext: value,
					// 				},
					// 				pathname: '(app)/hometab/explorestack/searchtext',
					// 			})
					// 		}}
					// 	/>
					// </Input>
				)}
			/>
		</HStack>
	)
}

export default SearchTopTabStackInput
