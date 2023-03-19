import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import { CountryCode } from 'libphonenumber-js'
import { Input, Text, Icon, IconButton, Box, Heading, Pressable } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View, TextInput, InteractionManager, InputAccessoryView, Platform } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
	const INPUT_ACCESSORY_VIEW_ID = 'p-1298187263'
	const router = useRouter()
	const { bottom } = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const phonenumberRef = useRef<TextInput>()
	const colorScheme = useThemeColorScheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const { height: platform } = useReanimatedKeyboardAnimation()
	const INPUT_CONTAINER_HEIGHT = 90

	const height = useDerivedValue(() => platform.value, [isFocused])

	const textInputContainerStyle = useAnimatedStyle(
		() => ({
			width: '100%',
			position: 'absolute',
			bottom: 0,
			paddingBottom: bottom,
			height: INPUT_CONTAINER_HEIGHT,
			transform: [{ translateY: height.value }],
		}),
		[],
	)

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
					router.push({
						pathname: '(app)/credential/personalcredentialstack/confirmationcode',
						params: {
							code: String(data.sendAuthenticatorDeviceOwnerCode.code),
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
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Box h={'110px'}>
					<Heading mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'} h={'70px'}>
						Enter your mobile number
					</Heading>
					<Pressable
						onPress={() => {
							router.push({
								pathname: '(app)/credential/personalcredentialstack/email',
							})
						}}
						size={'md'}
						w={100}
						h={'auto'}
						pb={3}
						variant={'link'}
					>
						<Text fontSize={'md'} fontWeight={'500'} color={'primary.500'}>
							Use email
						</Text>
					</Pressable>
				</Box>
				<View style={{ width: '100%' }}>
					<Controller
						name='mobileNumber.completeNumber'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								ref={phonenumberRef}
								key={'mobileNumber.completeNumber'}
								inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								textContentType='telephoneNumber'
								autoComplete='tel'
								keyboardType='phone-pad'
								placeholder='Mobile Number'
								variant={'underlined'}
								returnKeyType={Platform.OS === 'ios' ? 'done' : 'none'}
								numberOfLines={1}
								keyboardAppearance={colorScheme}
								mt={'1/6'}
								autoFocus
								py={2}
								_input={{
									fontSize: '2xl',
									fontWeight: 'medium',
								}}
								size={'lg'}
								enablesReturnKeyAutomatically={false}
								// onSubmitEditing={handleSubmit(onSubmit)}
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
					<Text fontSize={'md'} color={'error.500'}>
						{errors?.mobileNumber?.completeNumber?.message}
					</Text>
				</View>
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<Box
						display={isFocused ? 'flex' : 'none'}
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
							disabled={!!errors?.mobileNumber?.completeNumber}
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
									color={errors?.mobileNumber?.completeNumber ? 'primary.700' : 'white'}
								/>
							}
						/>
					</Box>
				</InputAccessoryView>
			) : (
				<Reanimated.View
					style={[
						{
							height: INPUT_CONTAINER_HEIGHT,
						},
						textInputContainerStyle,
					]}
				>
					<Box
						display={isFocused ? 'flex' : 'none'}
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
							disabled={!!errors?.mobileNumber?.completeNumber}
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
									color={errors?.mobileNumber?.completeNumber ? 'primary.700' : 'white'}
								/>
							}
						/>
					</Box>
				</Reanimated.View>
			)}
		</Box>
	)
}

export default PhoneScreen
