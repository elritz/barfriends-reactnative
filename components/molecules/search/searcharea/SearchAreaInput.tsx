import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { SearchReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter } from 'expo-router'
import { Box, HStack, Icon, IconButton, Input } from 'native-base'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

type Props = {
	placeholder: string
}
const SearchAreaInput = (props: Props) => {
	const router = useRouter()
	const colorScheme = useThemeColorScheme()
	// constSearchReactiveVar()

	const {
		control,
		watch,
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

	const debouncedSearchResults = useDebounce(watch().searchtext, 300)

	useMemo(() => {
		router.setParams({
			searchtext: watch().searchtext,
		})
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
							InputLeftElement={
								<Icon
									as={Ionicons}
									_light={{ color: 'light.600' }}
									_dark={{ color: 'dark.400' }}
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

export default SearchAreaInput
