import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { CountryCode } from 'libphonenumber-js'
import { Text } from 'native-base'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, InteractionManager, Platform, TextInput, View } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

export type FormType = {
	countrySelector: CountrySelector
	mobileNumber: {
		number: string
		completeNumber: string
	}
}

export type CountrySelector = {
	countryCode: CountryCode
	countryCallingCode: string
}

const PhoneScreen = () => {
	const phonenumberRef = useRef<TextInput | null>(null)
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const headerHeight = useHeaderHeight()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0
	const inputAccessoryViewID = 'phonenumberAccessoryID'

	const {
		control,
		handleSubmit,
		setValue,
		clearErrors,
		setError,
		getValues,
		formState: { errors },
	} = useForm<FormType>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			mobileNumber: {
				number: '',
				completeNumber: '',
			},
			countrySelector: {
				countryCallingCode: '+1',
				countryCode: 'CA',
			},
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const [sendCode] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: data => {
			switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
				case 'ErrorProfiling':
					setError('mobileNumber.number', {
						type: 'validate',
						message: 'Unable to send phone number',
					})
					break
				case 'Code':
					navigation.navigate('CredentialNavigator', {
						screen: 'PersonalCredentialStack',
						params: {
							screen: 'ConfirmationCodeScreen',
							params: {
								code: data.sendAuthenticatorDeviceOwnerCode.code,
							},
						},
					})
					break
			}
		},
	})

	useEffect(() => {
		phonenumberRef.current?.focus()
		setValue('countrySelector', { countryCode: 'CA', countryCallingCode: '+1' })
	}, [isFocused])

	useEffect(() => {
		if (phonenumberRef.current) {
			InteractionManager.runAfterInteractions(() => {
				phonenumberRef.current?.focus()
			})
		}
	}, [phonenumberRef, phonenumberRef.current])

	useEffect(() => {
		const phonenumber = getValues('mobileNumber')
		if (!phonenumber) {
			setError('mobileNumber', {
				type: 'validate',
				message: '',
			})
		}
	}, [setError, errors])

	const onSubmit = data => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			email: '',
			phone: {
				...credentialPersonalProfileVar.phone,
				number: data.mobileNumber.number,
				completeNumber: data.mobileNumber.number,
			},
		})
		sendCode({
			variables: {
				where: {
					Authenticators: {
						PhoneInput: {
							number: data.mobileNumber.number,
							completeNumber: data.mobileNumber.number,
						},
					},
				},
			},
		})
	}

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={errors.mobileNumber ? themeContext.palette.disabled.color.primary : 'white'}
		/>
	)

	return (
		<OuterView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter your mobile number
			</Text>
			<View style={{ marginVertical: 20, width: '100%' }}>
				<Controller
					name='mobileNumber.completeNumber'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<RNETextInput
							refChild={phonenumberRef}
							keyProp='mobileNumber.completeNumber'
							value={value}
							onChange={value => {
								onChange(value)
								const replaced = value.replace(/\D/g, '')
								setValue('mobileNumber.number', replaced)
							}}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							textContentType='telephoneNumber'
							blurOnSubmit={false}
							autoFocus
							placeholder='Mobile Number'
							returnKeyType='done'
							inputAccessoryViewID={inputAccessoryViewID}
							autoCompleteType='tel'
							keyboardType='phone-pad'
							errorMessage={errors?.mobileNumber?.number?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Hey this is required 🤷‍♂️.',
						},
					}}
				/>
			</View>

			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer style={{ justifyContent: 'flex-start' }}>
					<InputAccessoryInnerView>
						<Text>
							By continuing you may receive an SMS for verification. Message and data rates may apply.
						</Text>
					</InputAccessoryInnerView>
					<Button
						disabled={!!errors.mobileNumber}
						onPress={handleSubmit(onSubmit)}
						containerStyle={{
							justifyContent: 'center',
						}}
						buttonStyle={{
							backgroundColor: errors.mobileNumber?.completeNumber
								? themeContext.palette.disabled.background
								: themeContext.palette.bfscompany.primary,
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						iconPosition='right'
						icon={<RightIcon />}
					/>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</OuterView>
	)
}

export default PhoneScreen

const OuterView = styled.KeyboardAvoidingView`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 5%;
`

const InputAccessoryContainer = styled.View`
	background-color: ${props => props.theme.palette.background.paper};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: space-around;
	height: 90px;
	padding-horizontal: 2.5%;
`

const InputAccessoryInnerView = styled.View`
	flex: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding-horizontal: 5px;
`
