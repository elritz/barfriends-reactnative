import { useReactiveVar } from '@apollo/client'
import { Box, Button, HStack, Input } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter, useSegments } from 'expo-router'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

type Props = {
	placeholder: string
}
const GeneralInput = (props: Props) => {
	const router = useRouter()
	const segments = useSegments()
	const rTheme = useReactiveVar(ThemeReactiveVar)

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
				<Button
					onPress={goBack}
					isFocusVisible={false}
					sx={{
						h: 50,
						w: 50,
						':hover': {
							bg: 'transparent',
						},
						':pressed': {
							bg: 'transparent',
						},
						':focus': {
							bg: 'transparent',
						},
					}}
				>
					<Ionicons
						size={35}
						name='arrow-back'
						color={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light600
								: rTheme.theme?.gluestack.tokens.colors.dark400
						}
					/>
				</Button>
				<Controller
					control={control}
					name='searchtext'
					render={({ field: { value, onChange } }) => (
						<Input variant={'rounded'}>
							<Ionicons
								// _light={{ color: 'light.600' }}
								// _dark={{ color: 'dark.900' }}
								name='ios-search'
								size={25}
								ml={'$2'}
							/>
							<Input.Input
								// _light={{ bgColor: 'light.200' }}
								// _dark={{ bgColor: 'dark.200' }}
								flex={1}
								mr={'$2'}
								sx={{
									h: SEARCH_BAR_HEIGHT,
								}}
								rounded={'$lg'}
								autoFocus
								onChangeText={onChange}
								autoCapitalize={'none'}
								keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
								placeholder={props.placeholder}
								returnKeyType='search'
								underlineColorAndroid='transparent'
								placeholderTextColor={rTheme.colorScheme === 'light' ? '$light900' : '$dark900'}
							/>
						</Input>
					)}
				/>
			</HStack>
		</Box>
	)
}

export default GeneralInput
