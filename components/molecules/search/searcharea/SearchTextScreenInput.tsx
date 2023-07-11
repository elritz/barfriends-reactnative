// TODO: UX() get the navigation route here as well default values from form
import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Box, HStack, Input } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { useExploreSearchLazyQuery } from '@graphql/generated'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSegments } from 'expo-router'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

const SearchTextScreenInput = () => {
	const router = useRouter()
	const segments = useSegments()
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
		<Box
			bg='$transparent'
			sx={{
				h: SEARCH_BAR_HEIGHT,
			}}
		>
			<HStack alignItems={'center'}>
				<ChevronBackArrow />
				<Controller
					control={control}
					name='searchtext'
					render={({ field: { value, onChange } }) => (
						<Input variant={'rounded'} alignSelf={'center'} h={SEARCH_BAR_HEIGHT}>
							<Input.Input
								placeholder={'Search'}
								returnKeyType='search'
								underlineColorAndroid='transparent'
								keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								flex={1}
								mr={'$2'}
								autoFocus
								onChangeText={onChange}
								placeholderTextColor={rTheme.colorScheme === 'light' ? '$light900' : '$dark900'}
							/>
						</Input>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default SearchTextScreenInput
