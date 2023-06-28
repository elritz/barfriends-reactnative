import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter, useSearchParams } from 'expo-router'
import { HStack, Icon, IconButton, Input } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'

const SearchTopTabStackInput = () => {
	const _searchInputRef = useRef<TextInput>(null)
	const router = useRouter()
	const params = useSearchParams()
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
						_dark={{ color: 'dark.400' }}
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
						_light={{ bgColor: 'light.200' }}
						_dark={{ bgColor: 'dark.200' }}
						variant={'unstyled'}
						rounded={'lg'}
						flex={1}
						value={value}
						keyboardAppearance={colorScheme}
						ref={_searchInputRef}
						placeholder='Search'
						autoCorrect={false}
						_input={{
							fontSize: 'md',
							fontWeight: 'medium',
						}}
						mr={2}
						isReadOnly
						onChangeText={onChange}
						onSubmitEditing={handleSearchSubmitEditting}
						returnKeyType='search'
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
				)}
			/>
		</HStack>
	)
}

export default SearchTopTabStackInput
