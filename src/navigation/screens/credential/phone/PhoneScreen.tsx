import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { CountryCode } from 'libphonenumber-js'
import {
	Input,
	Text,
	Icon,
	IconButton,
	KeyboardAvoidingView,
	Box,
	Heading,
	useTheme,
} from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View, InteractionManager, TextInput } from 'react-native'

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
	const inputAccessoryViewID = 'phonenumberAccessoryID2122'
	const navigation = useNavigation()
	const phonenumberRef = useRef<TextInput>()
	const isFocused = useIsFocused()
	const headerHeight = useHeaderHeight()
	const colorScheme = useThemeColorScheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

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

	const [sendCode, { data, loading, error }] = useSendAuthenticatorDeviceOwnerCodeMutation({
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
								code: String(data.sendAuthenticatorDeviceOwnerCode.code),
							},
						},
					})
					break
			}
		},
	})

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

	useEffect(() => {
		setValue('countrySelector', { countryCode: 'CA', countryCallingCode: '+1' })
	}, [])

	useEffect(() => {
		if (isFocused && phonenumberRef.current) {
			InteractionManager.runAfterInteractions(() => {
				phonenumberRef.current?.focus()
			})
		}
		if (!isFocused) {
			InteractionManager.runAfterInteractions(() => {
				phonenumberRef.current?.blur()
			})
		}
	}, [isFocused])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
			style={{
				flex: 1,
				height: 'auto',
				flexDirection: 'column',
				marginHorizontal: '5%',
			}}
		>
			<Heading mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'} h={'70px'}>
				Enter your mobile number
			</Heading>
			<View style={{ marginVertical: 20, width: '100%' }}>
				<Controller
					name='mobileNumber.completeNumber'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							ref={phonenumberRef}
							key={'mobileNumber.completeNumber'}
							isFocused={isFocused}
							textContentType='telephoneNumber'
							autoComplete='tel'
							keyboardType='phone-pad'
							placeholder='Mobile Number'
							variant={'underlined'}
							returnKeyType='done'
							numberOfLines={1}
							keyboardAppearance={colorScheme}
							inputAccessoryViewID={inputAccessoryViewID}
							mt={'1/6'}
							py={2}
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
							size={'lg'}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							onChangeText={value => {
								onChange(value)
								const replaced = value.replace(/\D/g, '')
								setValue('mobileNumber.number', replaced)
							}}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Hey this is required 🤷‍♂️.',
						},
					}}
				/>
				<Text style={{ color: 'red' }}>{errors?.mobileNumber?.number?.message}</Text>
			</View>

			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					_light={{
						bg: 'light.100',
					}}
					_dark={{
						bg: 'dark.200',
					}}
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
					<IconButton
						disabled={!!errors.mobileNumber}
						onPress={handleSubmit(onSubmit)}
						variant={'solid'}
						color={'primary.500'}
						isDisabled={!!errors.mobileNumber?.completeNumber || loading}
						borderRadius={'full'}
						style={{
							justifyContent: 'center',
							height: 60,
							width: 60,
							paddingHorizontal: 20,
							alignSelf: 'center',
						}}
						icon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={'xl'}
								color={errors.mobileNumber ? 'primary.700' : 'white'}
							/>
						}
					/>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default PhoneScreen
