import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
	useRoute,
} from '@react-navigation/native'
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
			pathname: '(app)/hometabnavigator/searchstack/searchresults',
			params: { searchText: String(values.searchText) },
		})
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		router.setParams({})
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
		<Box
			style={{
				marginTop: inset.top,
			}}
		>
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
					render={({ field: { value, onChange } }) => (
						<Input
							_light={{ bgColor: 'light.50' }}
							_dark={{ bgColor: 'dark.50' }}
							variant={'unstyled'}
							rounded={'lg'}
							w={'85%'}
							keyboardAppearance={colorScheme}
							_input={{
								fontSize: 'md',
								fontWeight: 'medium',
							}}
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
										pathname: '(app)/hometabnavigator/searchstack?HELLO',
										params: { searchtext: value },
									})
								}
							}}
							leftElement={<Icon as={Ionicons} name='ios-search' size={'lg'} ml={1} />}
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
