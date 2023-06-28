import { Box, HStack } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSegments } from 'expo-router'
import { Icon, IconButton, Input } from 'native-base'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

type Props = {
	placeholder: string
}
const GeneralInput = (props: Props) => {
	const router = useRouter()
	const segments = useSegments()
	const colorScheme = useThemeColorScheme()

	const {
		control,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			searchtext: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const clearSearchInput = () => {
		setValue('searchtext', '')
		router.setParams({
			searchtext: '',
		})
	}

	const debouncedSearchResults = useDebounce(watch().searchtext, 700)

	useMemo(() => {
		router.setParams({
			searchtext: watch().searchtext.toLowerCase().trim(),
		})
	}, [debouncedSearchResults])

	const goBack = () => {
		Keyboard.dismiss()
		router.back()
	}

	return (
		<Box
			bg={'transparent'}
			sx={{
				h: SEARCH_BAR_HEIGHT,
			}}
		>
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
							autoCapitalize={'none'}
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

export default GeneralInput
