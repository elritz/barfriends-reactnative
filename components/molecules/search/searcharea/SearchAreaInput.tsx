import { useReactiveVar } from '@apollo/client'
import ChevronBackArrow from '@components/atoms/buttons/goback/ChevronBackArrow/ChevronBackArrow'
import { Button, HStack, Input, Pressable } from '@components/core'
import { SEARCH_BAR_HEIGHT } from '@constants/ReactNavigationConstants'
import { Ionicons } from '@expo/vector-icons'
import { ThemeReactiveVar } from '@reactive'
import useDebounce from '@util/hooks/useDebounce'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

type Props = {
	placeholder: string
}
const SearchAreaInput = (props: Props) => {
	const router = useRouter()
	const rTheme = useReactiveVar(ThemeReactiveVar)

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
		<HStack position={'relative'} flex={1}>
			<ChevronBackArrow />
			<Controller
				control={control}
				name='searchtext'
				render={({ field: { value, onChange } }) => (
					<Input
						variant={'rounded'}
						flex={1}
						mr={'$2'}
						sx={{
							':focus': {
								borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
							},
							':focusVisible': {
								borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
							},
							borderColor: rTheme.colorScheme === 'light' ? '$light700' : '$dark400',
						}}
						bg={
							rTheme.colorScheme === 'light'
								? rTheme.theme?.gluestack.tokens.colors.light100
								: rTheme.theme?.gluestack.tokens.colors.dark100
						}
					>
						<Input.Icon ml={'$2'}>
							<Ionicons
								color={
									rTheme.colorScheme === 'light'
										? rTheme.theme?.gluestack.tokens.colors.light700
										: rTheme.theme?.gluestack.tokens.colors.dark900
								}
								name='ios-search'
								size={23}
							/>
						</Input.Icon>
						<Input.Input
							autoFocus
							alignSelf={'center'}
							placeholder={props.placeholder || 'Search'}
							returnKeyType='search'
							underlineColorAndroid='transparent'
							keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
							onChange={onChange}
							onChangeText={onChange}
							placeholderTextColor={rTheme.colorScheme === 'light' ? '$light600' : '$dark900'}
						/>
					</Input>
				)}
			/>
		</HStack>
	)
}

export default SearchAreaInput
