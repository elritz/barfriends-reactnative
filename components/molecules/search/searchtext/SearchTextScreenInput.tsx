import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { Box, Button, HStack, Icon, IconButton, Input, Text } from 'native-base'
import { useEffect, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

// TODO: UX() get the navigation route here as well default values from form
const SearchTextScreenInput = () => {
	const _searchInput = useRef()
	const router = useRouter()
	const params = useSearchParams()

	const segments = useSegments()
	const isFocused = useIsFocused()

	const colorScheme = useThemeColorScheme()

	useEffect(() => {
		if (isFocused) {
			_searchInput?.current.focus()
		}
	}, [isFocused])

	useEffect(() => {
		console.log('params.searchText :>> ', params.searchText)
		setValue('searchText', params.searchText ? (params.searchText as string) : '')
	}, [params])

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
			searchText: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [exploreSearchQuery, { data, loading, error }] = useExploreSearchLazyQuery({
		onError: error => {
			// console.log('error Explore Search Query  :>> ', error)
		},
		onCompleted: data => {
			router.setParams({
				searchText: String(watch().searchText),
			})
			// console.log('data SEARCH SCREEN :>> ', data)
		},
	})

	const clearSearchInput = () => {
		setValue('searchText', '')
		router.setParams({
			searchText: '',
		})
	}

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		console.log('values.searchText NAVIGATE :>> ', values.searchText)
		router.push({
			pathname: '(app)/hometab/explorestack/searchresults',
			params: { searchtext: String(values.searchText) },
		})
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
	}

	const debouncedSearchResults = useDebounce(watch().searchText, 700)

	useMemo(() => {
		if (watch().searchText) {
			exploreSearchQuery({
				variables: {
					search: String(watch().searchText),
				},
			})
		}
	}, [debouncedSearchResults])

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
							_dark={{ color: 'dark.900' }}
						/>
					}
					w={'50px'}
					h={35}
					onPress={goBack}
				/>
				<Controller
					control={control}
					name='searchText'
					render={({ field: { value, onChange } }) => (
						<Input
							ref={_searchInput}
							variant={'unstyled'}
							_light={{ bgColor: 'light.200' }}
							_dark={{ bgColor: 'dark.200' }}
							rounded={'lg'}
							placeholderTextColor={colorScheme === 'dark' ? 'dark.900' : 'light.900'}
							flex={1}
							keyboardAppearance={colorScheme}
							_input={{
								fontSize: 'md',
								fontWeight: 'medium',
							}}
							h={SEARCH_BAR_HEIGHT}
							mr={2}
							autoCapitalize={'none'}
							placeholder='Search'
							autoFocus
							value={value}
							onChangeText={text => changeSearchText(text)}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSearchSubmitEditting}
							onPressIn={() => {
								if (segments[3] !== 'searchtext') {
									router.push({
										pathname: '(app)/hometab/explorestack/searchtext',
										params: { searchtext: value },
									})
								}
							}}
							leftElement={
								<Icon
									as={Ionicons}
									_light={{ color: 'light.600' }}
									_dark={{ color: 'dark.900' }}
									name='ios-search'
									size={'md'}
									ml={2}
								/>
							}
							rightElement={
								<HStack alignItems={'center'}>
									{value.length ? (
										<IconButton
											variant={'ghost'}
											_pressed={{
												bg: 'transparent',
											}}
											p={1}
											py={2}
											_focus={{
												bg: 'transparent',
											}}
											icon={
												<Icon
													as={Ionicons}
													_light={{ color: 'light.600' }}
													_dark={{ color: 'dark.600' }}
													name='close-circle'
												/>
											}
											isDisabled={!value.length}
											onPress={clearSearchInput}
											shadow={'2'}
										/>
									) : null}
									<Button
										onPress={() => {
											clearSearchInput()
											router.back()
										}}
										_pressed={{
											bg: 'transparent',
										}}
										variant={'ghost'}
									>
										<Text lineHeight={'xs'}>Cancel</Text>
									</Button>
								</HStack>
							}
						/>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default SearchTextScreenInput
