import { useReactiveVar } from '@apollo/client'
import CountryPicker from '@components/atoms/inputs/CountryPicker'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import parsePhoneNumber, { CountryCode } from 'libphonenumber-js'
import {
	Box,
	Heading,
	Input,
	KeyboardAvoidingView,
	Text,
	Button,
	Icon,
	useTheme,
} from 'native-base'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, InteractionManager, Platform, TextInput, View } from 'react-native'

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
	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
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
					router.push({
						pathname: '(app)/credential/personalcredentialstack/confirmationcode',
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
			as={Feather}
			name='arrow-right'
			size={'lg'}
			color={errors.mobileNumber ? theme.colors.gray[300] : theme.colors.primary[500]}
		/>
	)

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Heading>Enter your mobile number</Heading>
			<View style={{ marginVertical: 20, width: '100%' }}>
				<Controller
					name='mobileNumber.completeNumber'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							ref={phonenumberRef}
							key='mobileNumber.completeNumber'
							value={value}
							keyboardAppearance={colorScheme}
							onChangeText={value => onChange(value)}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							textContentType='telephoneNumber'
							blurOnSubmit={false}
							autoFocus
							placeholder='Mobile Number'
							returnKeyType='done'
							inputAccessoryViewID={inputAccessoryViewID}
							autoComplete='tel'
							keyboardType='phone-pad'
							leftElement={renderInputLeftIcon()}
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
				<Text>{errors?.mobileNumber?.number?.message}</Text>
			</View>

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
						style={{
							backgroundColor: errors.mobileNumber?.completeNumber
								? theme.colors.gray[300]
								: theme.colors.primary[500],
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						endIcon={<RightIcon />}
					/>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default PhoneScreen
