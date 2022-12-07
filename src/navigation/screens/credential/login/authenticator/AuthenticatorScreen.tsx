import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Entypo, Feather } from '@expo/vector-icons'
import {
	useAuthorizedProfilesLazyQuery,
	useSendAuthenticatorDeviceOwnerCodeMutation,
} from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { KeyboardAvoidingView, Button, IconButton, Icon, Box, Input } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, InputAccessoryView, Platform } from 'react-native'

export type FormType = {
	authenticator: string
}

export default function AuthenticatorScreen() {
	// const inputRef = useRef<TextInput | null>(null)
	const inputAccessoryViewID = 'phonenumberAccessoryID'
	const navigation = useNavigation()
	const headerHeight = useHeaderHeight()
	const colorScheme = useThemeColorScheme()
	const [keyboardType, setKeyboardType] = useState('number-pad')
	const [focusKeyboard, setFocusKeybaord] = useState(false)
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		setError,
		formState: { errors },
	} = useForm<FormType>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			authenticator: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [sendAuthenticatorDeviceOwnerCodeMutation] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: data => {
			const values = getValues()
			if (data.sendAuthenticatorDeviceOwnerCode.__typename === 'Code') {
				navigation.navigate('CredentialNavigator', {
					screen: 'LoginCredentialStack',
					params: {
						screen: 'ConfirmationCodeScreen',
						params: {
							authenticator: values.authenticator,
							code: data.sendAuthenticatorDeviceOwnerCode.code,
						},
					},
				})
			}
		},
	})

	const [authorizedProfilesV2Query, { data, loading, error }] = useAuthorizedProfilesLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			const formValues = getValues()
			const replaced = formValues.authenticator.replace(/\D/g, '')

			if (data.authorizedProfiles.__typename === 'ProfileTypesResponse') {
				if (data.authorizedProfiles?.username.length) {
					navigation.navigate('CredentialNavigator', {
						screen: 'LoginCredentialStack',
						params: {
							screen: 'PasswordLoginScreen',
							params: {
								profile: data.authorizedProfiles?.username[0].id,
							},
						},
					})
				}

				if (data.authorizedProfiles?.phone.length) {
					sendAuthenticatorDeviceOwnerCodeMutation({
						variables: {
							where: {
								Authenticators: {
									PhoneInput: {
										number: replaced,
									},
								},
							},
						},
					})
					if (data.authorizedProfiles.email.length) {
						sendAuthenticatorDeviceOwnerCodeMutation({
							variables: {
								where: {
									Authenticators: {
										EmailInput: {
											email: formValues.authenticator,
										},
									},
								},
							},
						})
					}
				}
			} else {
				setError('authenticator', { message: data.authorizedProfiles.message })
			}
		},
	})

	const onSubmit = data => {
		const username = data.authenticator.replace(/[^a-zA-Z0-9]/g, '')
		const numberOnly = data.authenticator.replace(/\D/g, '')

		authorizedProfilesV2Query({
			variables: {
				where: {
					Profiles: [
						{
							username: username,
							email: data.authenticator,
							Phone: {
								number: numberOnly,
							},
						},
					],
				},
			},
		})
	}

	const RightIcon = () => {
		switch (keyboardType) {
			case 'number-pad':
				return <Icon onPress={() => setKeyboardType('email')} name='email' as={Entypo} />
			case 'email':
				return <Icon onPress={() => setKeyboardType('number-pad')} name='dial-pad' as={Entypo} />
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setFocusKeybaord(true)
		}, 500)
		return () => clearTimeout(timer)
	}, [focusKeyboard])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
			flex={1}
			height={'auto'}
			flexDirection={'column'}
			style={{
				flex: 1,
				height: 'auto',
				flexDirection: 'column',
				marginHorizontal: '5%',
			}}
		>
			{focusKeyboard && (
				<Controller
					name='authenticator'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							// ref={inputRef}
							key='authenticator'
							keyboardAppearance={colorScheme}
							variant={'underlined'}
							returnKeyType='done'
							textContentType='telephoneNumber'
							autoComplete={keyboardType === 'number-pad' ? 'tel' : 'email'}
							keyboardType={keyboardType === 'number-pad' ? 'number-pad' : 'email-address'}
							numberOfLines={1}
							placeholder='Email, number or username '
							inputAccessoryViewID={inputAccessoryViewID}
							rightElement={<RightIcon />}
							autoCapitalize='none'
							autoFocus={focusKeyboard}
							mt={'1/6'}
							py={2}
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							value={value.toLowerCase()}
							onChangeText={value => {
								if (keyboardType === 'number-pad') {
									onChange(value.toLowerCase())
									setValue('authenticator', value)
								} else {
									onChange(value)
									setValue('authenticator', value.trim())
								}
							}}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: '',
						},
					}}
				/>
			)}
			{errors?.authenticator?.message ? (
				<Button
					onPress={() => {
						navigation.navigate('CredentialNavigator', {
							screen: 'PersonalCredentialStack',
							params: {
								screen: 'GetStartedScreen',
							},
						})
					}}
					my={3}
					_text={{ textTransform: 'uppercase', fontWeight: '700', fontSize: 'lg' }}
					borderRadius={'xl'}
				>
					Sign up
				</Button>
			) : null}
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					flexDir={'row'}
					justifyContent={'flex-end'}
					alignContent={'space-around'}
					height={'90px'}
					px={'2.5%'}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<IconButton
							disabled={!!errors.authenticator || loading}
							onPress={handleSubmit(onSubmit)}
							variant={'solid'}
							color={'primary.500'}
							isDisabled={!!errors.authenticator || loading}
							style={{
								justifyContent: 'center',
								borderRadius: 50,
								height: 70,
								width: 70,
								paddingHorizontal: 20,
								alignSelf: 'center',
							}}
							icon={
								<Icon
									as={Feather}
									name='arrow-right'
									size={'2xl'}
									color={errors?.authenticator ? 'light.800' : 'white'}
								/>
							}
						/>
					</View>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}
