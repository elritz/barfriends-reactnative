// TODO: UX() get the navigation route here as well default values from form
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSegments } from 'expo-router'
import { Box, Button, HStack, Icon, IconButton, Input, Text } from 'native-base'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

const SearchTextScreenInput = () => {
	const router = useRouter()
	const segments = useSegments()
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

	const handleSearchSubmitEditting = item => {
		const values = getValues()
		router.push({
			pathname: '(app)/explore/searchresults',
			params: { searchtext: String(values.searchtext) },
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

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	return (
		<Box h={`${SEARCH_BAR_HEIGHT}px`}>
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
							_light={{ color: 'light.600' }}
							_dark={{ color: 'dark.400' }}
						/>
					}
					w={'50px'}
					h={45}
					onPress={goBack}
				/>
				<Controller
					control={control}
					name='searchtext'
					render={({ field: { value, onChange } }) => (
						<Input
							variant={'unstyled'}
							_light={{ bgColor: 'light.200' }}
							_dark={{ bgColor: 'dark.200' }}
							flex={1}
							mr={2}
							rounded={'lg'}
							h={SEARCH_BAR_HEIGHT}
							_input={{
								fontSize: 'lg',
							}}
							autoFocus
							onChangeText={onChange}
							keyboardAppearance={colorScheme}
							placeholder={props.placeholder}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							placeholderTextColor={colorScheme === 'dark' ? 'dark.900' : 'light.900'}
							InputLeftElement={
								<Icon
									as={Ionicons}
									_light={{ color: 'light.600' }}
									_dark={{ color: 'dark.900' }}
									name='ios-search'
									size={'md'}
									ml={2}
								/>
							}
						/>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default SearchTextScreenInput
