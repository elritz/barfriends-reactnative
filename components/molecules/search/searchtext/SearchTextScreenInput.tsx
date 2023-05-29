// TODO: UX() get the navigation route here as well default values from form
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
import { Keyboard, TextInput } from 'react-native'

const SearchTextScreenInput = () => {
	const _searchRef = useRef<TextInput>()
	const router = useRouter()
	const params = useSearchParams()
	const segments = useSegments()
	const isFocused = useIsFocused()
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
				_searchRef?.current.focus()
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

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	const handleSearchSubmitEditting = data => {
		router.push({
			pathname: '(app)/hometab/explorestack/searchresults',
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
					name='searchtext'
					render={({ field: { value, onChange } }) => (
						<Input
							ref={_searchRef}
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
							blurOnSubmit={false}
							onChangeText={onChange}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSubmit(handleSearchSubmitEditting)}
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
