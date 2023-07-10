// TODO: UX() get the navigation route here as well default values from form
import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { HStack, Input } from '@components/core'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useLocalSearchParams, useRouter, useSegments } from 'expo-router'
import { useEffect, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

const SearchTextScreenInput = () => {
	const _searchRef = useRef<TextInput>()
	const router = useRouter()
	const params = useLocalSearchParams()
	const segments = useSegments()
	const isFocused = useIsFocused()
	const rTheme = useReactiveVar(ThemeReactiveVar)

	const {
		control,
		setError,
		clearErrors,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
		watch,
		setFocus,
	} = useForm({
		defaultValues: {
			searchtext: String(params.searchtext) || '',
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
		if (isFocused) {
			if (_searchRef && _searchRef.current) {
				// _searchRef?.current.focus()
			}
		}
	}, [isFocused])

	useEffect(() => {
		setValue('searchtext', params.searchtext as string)
	}, [params.searchtext])

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onCompleted: data => {
			router.setParams({
				searchtext: String(watch().searchtext),
			})
		},
	})

	const clearSearchInput = () => {
		setValue('searchtext', '')
		router.setParams({
			searchtext: '',
		})
	}

	const handleSearchSubmitEditting = data => {
		router.push({
			pathname: '(app)/explore/searchresults',
			params: { searchtext: data.searchtext },
		})
	}

	const debouncedSearchResults = useDebounce(watch().searchtext, 700)

	useMemo(() => {
		if (watch().searchtext) {
			exploreSearchQuery({
				variables: {
					search: String(watch().searchtext),
				},
			})
		}
	}, [debouncedSearchResults])

	return (
		<HStack>
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
							onPressIn={() => {
								if (segments[3] !== 'searchtext') {
									router.push({
										pathname: '(app)/explore/searchtext',
										params: { searchtext: value },
									})
								}
							}}
						/>
					</Input>
					// <Input
					// 	ref={_searchRef}
					// 	_light={{ bgColor: 'light.200' }}
					// 	_dark={{ bgColor: 'dark.200' }}

					// 	leftElement={
					// 		<Ionicons
					// 			size={25}
					// 			ml={'$2'}
					// 			name='ios-search'
					// 			color={
					// 				rTheme.colorScheme === 'light'
					// 					? rTheme.theme?.gluestack.tokens.colors.light600
					// 					: rTheme.theme?.gluestack.tokens.colors.dark900
					// 			}
					// 		/>
					// 	}
					// 	rightElement={
					// 		<HStack alignItems={'center'}>
					// 			{value.length ? (
					// 				<Button
					// 					variant={'link'}
					// 					p={'$1'}
					// 					py={'$2'}
					// 					isDisabled={!value.length}
					// 					onPress={clearSearchInput}
					// 				>
					// 					<Ionicons
					// 						color={
					// 							rTheme.colorScheme === 'light'
					// 								? rTheme.theme?.gluestack.tokens.colors.light600
					// 								: rTheme.theme?.gluestack.tokens.colors.dark600
					// 						}
					// 						name='close-circle'
					// 					/>
					// 				</Button>
					// 			) : null}
					// 			<Button
					// 				onPress={() => {
					// 					clearSearchInput()
					// 					router.back()
					// 				}}
					// 				variant={'link'}
					// 			>
					// 				<Text lineHeight={'$xs'}>Cancel</Text>
					// 			</Button>
					// 		</HStack>
					// 	}
					// />
				)}
			/>
		</HStack>
	)
}

export default SearchTextScreenInput
