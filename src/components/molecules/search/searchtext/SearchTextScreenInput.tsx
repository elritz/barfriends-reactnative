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
import { Box, Button, HStack, Icon, IconButton, Input, Text } from 'native-base'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ExploreFilterTabParamList } from 'src/types/app'

export type SearchTextScreenRouteProp = RouteProp<ExploreFilterTabParamList, 'SearchTextScreen'>
// TODO: UX() get the navigation route here as well default values from form
const SearchTextScreenInput = () => {
	const navigation = useNavigation()
	const inset = useSafeAreaInsets()
	const route = useRoute<SearchTextScreenRouteProp>()
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
			searchText: route.params?.searchText || '',
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
			console.log('error :>> ', error)
		},
		onCompleted: data => {
			navigation.dispatch(CommonActions.setParams({ data: data.exploreSearch }))
		},
	})

	const clearSearchInput = () => {
		setValue('searchText', '')
		navigation.dispatch(CommonActions.setParams({ searchText: '' }))
	}

	const goBack = () => {
		Keyboard.dismiss()
		navigation.dispatch(StackActions.pop())
	}

	const handleSearchSubmitEditting = item => {
		navigation.dispatch(StackActions.pop())
		const values = getValues()
		navigation.dispatch(
			StackActions.push('HomeTabNavigator', {
				screen: 'ExploreStack',
				params: {
					screen: 'SearchResultTabStack',
					params: {
						screen: 'TopScreen',
						params: {
							searchText: values.searchText,
							data: data?.exploreSearch,
						},
					},
				},
			}),
		)
	}

	const changeSearchText = (text: string) => {
		setValue('searchText', text)
		navigation.dispatch(CommonActions.setParams({ searchText: text }))
	}

	const debouncedSearchResults = useDebounce(watch().searchText, 700)

	useMemo(() => {
		if (watch().searchText.length) {
			exploreSearchQuery({
				variables: {
					search: debouncedSearchResults,
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
								if (route.name !== 'SearchTextScreen') {
									navigation.dispatch(
										StackActions.push('HomeTabNavigator', {
											screen: 'ExploreStack',
											params: {
												screen: 'SearchTextScreen',
											},
										}),
									)
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
											h={'30px'}
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
											navigation.dispatch(StackActions.pop(1))
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
