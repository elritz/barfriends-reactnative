import { useReactiveVar } from '@apollo/client'
import CountryPicker from '@components/atoms/inputs/CountryPicker'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button, Text } from '@rneui/base'
import { Icon } from '@rneui/themed'
import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'
import { Box, KeyboardAvoidingView } from 'native-base'
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
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const headerHeight = useHeaderHeight()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0
	const inputAccessoryViewID = 'phonenumberAccessoryID'
	const phonenumberRef = useRef<TextInput | null>(null)
	const [country, setCountry] = useState<CountrySelector>({
		countryCode: 'CA',
		countryCallingCode: '+1',
	})

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
					ConfirmationCodeReactiveVar({
						id: data.sendAuthenticatorDeviceOwnerCode.id,
						code: data.sendAuthenticatorDeviceOwnerCode.code,
					})
					navigation.navigate('CredentialNavigator', {
						screen: 'PersonalCredentialStack',
						params: {
							screen: 'ConfirmationCodeScreen',
						},
					})
					break
			}
		},
	})

	useEffect(() => {
		phonenumberRef.current?.focus()
		setValue('countrySelector', { countryCode: 'CA', countryCallingCode: '+1' })
	}, [])

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
	}, [setError])

	const validateFormatPhonenumber = (value: any) => {
		const parsedPhoneNumber = parsePhoneNumber(`${value.replace(/\s+/g, '')}`, country.countryCode)
		return parsedPhoneNumber?.isValid()
	}

	const validateCleanPhonenumber = (value: any): boolean => {
		try {
			const phonenumberValue = value
			if (
				country.countryCallingCode === phonenumberValue.slice(0, country.countryCallingCode.length)
			) {
				const removeCallingCode = phonenumberValue.slice(country.countryCallingCode.length)
				const newRemoveNonNumberCharacters = removeCallingCode.replace(/\D+/g, '')
				const phoneNumberFormat = parsePhoneNumber(
					`${newRemoveNonNumberCharacters}`,
					country.countryCode,
				)

				if (!phoneNumberFormat) {
					return false
				}
				const newInternationalFormat = phoneNumberFormat.formatNational()

				setValue(
					'mobileNumber.completeNumber',
					`${country.countryCallingCode} ${newInternationalFormat}`,
				)
				setValue('mobileNumber.number', newRemoveNonNumberCharacters)
				clearErrors()
				return true
			}

			const phoneNumberFormat = parsePhoneNumber(`${phonenumberValue}`, country.countryCode)
			const newInternationalFormat = phoneNumberFormat?.formatNational()
			const newRemoveNonNumberCharacters = phonenumberValue.replace(/\D+/g, '')

			clearErrors()

			setValue(
				'mobileNumber.completeNumber',
				`${country.countryCallingCode} ${newInternationalFormat}`,
			)

			return true
		} catch (e) {
			return false
		}
	}

	const onSubmit = data => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			email: '',
			phone: {
				number: data.mobileNumber.number,
				completeNumber: data.mobileNumber.number,
				countryCallingCode: data.countrySelector.countryCallingCode,
				countryCode: data.countrySelector.countryCode,
			},
		})
		sendCode({
			variables: {
				where: {
					Authenticators: {
						PhoneInput: {
							number: data.mobileNumber.number,
							completeNumber: data.mobileNumber.number,
							countryCallingCode: data.countrySelector.countryCallingCode,
							countryCode: data.countrySelector.countryCode,
						},
					},
				},
			},
		})
	}

	const renderInputLeftIcon = () => (
		<Controller
			name='countrySelector'
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<CountryPicker
					onSelect={({ cca2, callingCode }) => {
						setValue('countrySelector', {
							countryCode: cca2,
							countryCallingCode: `+${callingCode[0]}`,
						})
						setCountry({
							countryCode: cca2,
							countryCallingCode: `+${callingCode[0]}`,
						})
						phonenumberRef.current?.focus()
					}}
					countryCode={value.countryCode}
				/>
			)}
			rules={{
				required: {
					value: true,
					message: 'Hey this is required 🤷‍♂️.',
				},
			}}
		/>
	)

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={errors.mobileNumber && themeContext.palette.disabled.color.primary}
		/>
	)

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<RNEHeading800>Enter your mobile number</RNEHeading800>
			{isFocused ? (
				<View style={{ marginVertical: 20, width: '100%' }}>
					<Controller
						name='mobileNumber.completeNumber'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<RNETextInput
								refChild={phonenumberRef}
								keyProp='mobileNumber.completeNumber'
								value={value}
								onChange={value => onChange(value)}
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
								leftIcon={renderInputLeftIcon()}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: 'Hey this is required 🤷‍♂️.',
							},
							validate: {
								formatPhonenumber: async (value: any) =>
									validateFormatPhonenumber(value) || 'The phone number is invalid 🙅‍♀️.',
								cleanPhonenumber: async (value: any) =>
									validateCleanPhonenumber(value) || 'Format not excepted',
							},
						}}
					/>
				</View>
			) : null}

			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					flexDir={'row'}
					justifyContent={'flex-end'}
					alignContent={'space-around'}
					height={'90px'}
					px={'2.5%'}
				>
					<Box flex={2} display={'flex'} flexDir={'column'} justifyContent={'space-around'} px={2}>
						<Text>
							By continuing you may receive an SMS for verification. Message and data rates may apply.
						</Text>
					</Box>
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
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default PhoneScreen
