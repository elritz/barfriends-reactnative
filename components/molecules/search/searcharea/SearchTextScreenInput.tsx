import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { Box, Button, HStack, Icon, IconButton, Input, Text } from 'native-base'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: UX() get the navigation route here as well default values from form
const SearchTextScreenInput = () => {
	const params = useSearchParams()
	const router = useRouter()
	const segments = useSegments()

	console.log("🚀 ~ file: SearchTextScreenInput.tsx:19 ~ SearchTextScreenInput ~ segments:", segments)

	const inset = useSafeAreaInsets()
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
			searchtext: '',
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
				searchtext: String(watch().searchtext),
			})
			// console.log('data SEARCH SCREEN :>> ', data)
		},
	})

	const clearSearchInput = () => {
		setValue('searchtext', '')
		router.setParams({
			searchText: '',
		})
	}

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		console.log('values.searchText NAVIGATE :>> ', values.searchtext)
		router.push({
			pathname: '(app)/hometab/searchstack/searchresults',
			params: { searchtext: String(values.searchtext) },
		})
	}

	const changeSearchText = (text: string) => {
		setValue('searchtext', text)
		router.setParams({})
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

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	return (
		<Box h={SEARCH_BAR_HEIGHT}>
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
							_light={{ color: 'light.400' }}
							_dark={{ color: 'dark.400' }}
							ml={2}
							style={{
								width: 35,
								height: 35,
							}}
						/>
					}
					onPress={goBack}
				/>
				<Controller
					control={control}
					name='searchtext'
					render={({ field: { value, onChange } }) => (
						<Input
							variant={'filled'}
							_light={{ bg: 'light.200' }}
							_dark={{ bg: 'dark.200' }}
							flex={1}
							mr={2}
							rounded={'lg'}
							h={SEARCH_BAR_HEIGHT}
							keyboardAppearance={colorScheme}
							autoCapitalize={'none'}
							placeholder='Search'
							autoFocus
							placeholderTextColor={colorScheme === 'dark' ? 'dark.900' : 'light.900'}
							value={value}
							onChangeText={text => changeSearchText(text)}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							onSubmitEditing={handleSearchSubmitEditting}
							onPressIn={() => {
								if (segments[3] !== 'searchtext') {
									router.push({
										pathname: '(app)/hometab/searchstack?HELLO',
										params: { searchtext: value },
									})
								}
							}}
							InputLeftElement={
								<Icon
									_light={{ color: 'light.600' }}
									_dark={{ color: 'dark.400' }}
									as={Ionicons}
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
											_hover={{
												bg: 'transparent',
											}}
											_focus={{
												bg: 'transparent',
											}}
											icon={<Icon as={Ionicons} name='close-circle' />}
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
										variant={'ghost'}
									>
										<Text>Cancel</Text>
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
