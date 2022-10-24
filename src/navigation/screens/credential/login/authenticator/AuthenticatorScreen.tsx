import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import {
	useAuthorizedProfilesLazyQuery,
	useSendAuthenticatorDeviceOwnerCodeMutation,
} from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import { KeyboardAvoidingView, Button, IconButton } from 'native-base'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, InputAccessoryView, TextInput } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

export type FormType = {
	authenticator: string
}

export default function AuthenticatorScreen() {
	const inputRef = useRef<TextInput | null>(null)
	const inputAccessoryViewID = 'phonenumberAccessoryID'
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const [keyboardType, setKeyboardType] = useState('number-pad')
	const [focusKeyboard, setFocusKeybaord] = useState(false)

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
				if (data.authorizedProfiles.username.length) {
					navigation.navigate('CredentialNavigator', {
						screen: 'LoginCredentialStack',
						params: {
							screen: 'PasswordLoginScreen',
							params: {
								profile: data.authorizedProfiles.username[0].id,
							},
						},
					})
				}

				if (data.authorizedProfiles.phone.length) {
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
				return <Icon onPress={() => setKeyboardType('email')} name='email' type='entypo' />
			case 'email':
				return <Icon onPress={() => setKeyboardType('number-pad')} name='dial-pad' type='entypo' />
		}
	}

	const SubmitRightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={
				errors?.authenticator?.message
					? themeContext.palette.disabled.color.primary
					: themeContext.palette.bfscompany.accent
			}
		/>
	)

	useEffect(() => {
		const timer = setTimeout(() => {
			setFocusKeybaord(true)
		}, 500)
		return () => clearTimeout(timer)
	}, [focusKeyboard])

	return (
		<KeyboardAvoidingView
			flex={1}
			height={'auto'}
			flexDirection={'column'}
			style={{ marginHorizontal: '5%' }}
		>
			{focusKeyboard && (
				<Controller
					name='authenticator'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<RNETextInput
							containerStyle={{ marginTop: 40 }}
							refChild={inputRef}
							keyProp='authenticator'
							value={value.toLowerCase()}
							autoFocus={focusKeyboard}
							onChange={value => {
								if (keyboardType === 'number-pad') {
									onChange(value.toLowerCase())
									setValue('authenticator', value)
								} else {
									onChange(value)
									setValue('authenticator', value.trim())
								}
							}}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							textContentType={keyboardType === 'number-pad' ? 'telephoneNumber' : 'emailAddress'}
							blurOnSubmit={false}
							rightIcon={<RightIcon />}
							placeholder='Email, number or username '
							returnKeyType='done'
							autoCapitalize='none'
							numberOfLines={1}
							inputAccessoryViewID={inputAccessoryViewID}
							autoCompleteType={keyboardType === 'number-pad' ? 'tel' : 'email'}
							keyboardType={keyboardType === 'number-pad' ? 'number-pad' : 'email-address'}
							errorMessage={errors?.authenticator?.message}
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
			{errors?.authenticator?.message ? <Button my={3}>Sign up</Button> : null}
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer style={{ justifyContent: 'flex-end' }}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<IconButton
							onPress={handleSubmit(onSubmit)}
							disabled={!!errors.authenticator}
							backgroundColor={
								errors?.authenticator
									? themeContext.palette.disabled.background
									: themeContext.palette.bfscompany.primary
							}
							style={{
								width: 70,
								height: 70,
								paddingHorizontal: 20,
								justifyContent: 'center',
								borderRadius: 50,
							}}
							icon={<SubmitRightIcon />}
						/>
					</View>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

const InputAccessoryContainer = styled.View`
	background-color: ${props => props.theme.palette.background.paper};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: space-around;
	height: 90px;
	padding-horizontal: 2.5%;
`
