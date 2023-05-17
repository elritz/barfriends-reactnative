import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { useRouter } from 'expo-router'
import {
	Text,
	Icon,
	IconButton,
	Input,
	KeyboardAvoidingView,
	Box,
	Heading,
	Pressable,
} from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View, TextInput, InteractionManager } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'e-129818723433'
	const router = useRouter()
	const { bottom } = useSafeAreaInsets()
	const colorScheme = useThemeColorScheme()
	const emailRef = useRef<TextInput>()
	const isFocused = useIsFocused()
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
		formState: { errors },
		setError,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
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
				case 'Error':
					setError('email', {
						type: 'validate',
						message: 'Unable to send phone number',
					})
					break
				case 'Code':
					router.push({
						pathname: '(app)/credential/personalcredentialstack/confirmationcode',
						params: {
							code: data.sendAuthenticatorDeviceOwnerCode.code,
						},
					})
					break
			}
		},
	})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			phone: {
				completeNumber: '',
				countryCallingCode: '',
				countryCode: '',
				number: '',
			},
			email: data.email,
		})
		sendCode({
			variables: {
				where: {
					Authenticators: {
						EmailInput: {
							email: data.email,
						},
					},
				},
			},
		})
	}

	useEffect(() => {
		if (isFocused && emailRef.current) {
			InteractionManager.runAfterInteractions(() => {
				emailRef.current?.focus()
			})
		}
		if (!isFocused) {
			InteractionManager.runAfterInteractions(() => {
				emailRef.current?.blur()
			})
		}
	}, [isFocused])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{
				flex: 1,
				height: 'auto',
				flexDirection: 'column',
				marginHorizontal: '5%',
			}}
		>
			<Box h={'110px'}>
				<Heading mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'} h={'auto'}>
					Enter your email
				</Heading>
				<Pressable
					onPress={() => {
						router.back()
					}}
					size={'md'}
					w={100}
					h={'auto'}
					pb={3}
					variant={'link'}
				>
					<Text fontSize={'md'} fontWeight={'500'} color={'primary.500'}>
						Use phone
					</Text>
				</Pressable>
			</Box>
			<View style={{ width: '100%' }}>
				<Controller
					name='email'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							ref={emailRef}
							key={'email'}
							isFocused={isFocused}
							variant={'underlined'}
							autoFocus
							returnKeyType='done'
							autoComplete='email'
							importantForAutofill='auto'
							autoCorrect={true}
							autoCapitalize='none'
							keyboardType='email-address'
							keyboardAppearance={colorScheme}
							numberOfLines={1}
							placeholder='Email'
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
							size={'lg'}
							blurOnSubmit={false}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							value={value.toLowerCase()}
							onChangeText={onChange}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: 'Hey this is required 🤷‍♂️.',
						},
						pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					}}
				/>
			</View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<Box
						display={isFocused ? 'flex' : 'none'}
						_light={{
							bg: 'light.200',
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
							disabled={!!errors?.email}
							onPress={handleSubmit(onSubmit)}
							variant={'solid'}
							color={'primary.500'}
							isDisabled={!!errors.email || loading}
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
									color={errors?.email ? 'primary.700' : 'white'}
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
							bg: 'light.200',
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
							disabled={!!errors?.email}
							onPress={handleSubmit(onSubmit)}
							variant={'solid'}
							color={'primary.500'}
							isDisabled={!!errors.email || loading}
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
									color={errors?.email ? 'primary.700' : 'white'}
								/>
							}
						/>
					</Box>
				</Reanimated.View>
			)}
		</KeyboardAvoidingView>
	)
}
