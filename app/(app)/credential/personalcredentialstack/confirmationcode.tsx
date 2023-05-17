import { useReactiveVar } from '@apollo/client'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import Countdown from '@util/hooks/useTimer'
import { log } from 'console'
import { useRouter, useSearchParams } from 'expo-router'
import { IconButton, Icon, Box, Text, VStack, Heading, Button, useDisclose } from 'native-base'
import { useEffect, useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// TODO: FN(onPress(Resend Code)) - ln:162 -- when the user presses resend code need to resend and keep track of how many times

export default () => {
	const INPUT_ACCESSORY_VIEW_ID = 'cc-1298187263'
	const { bottom } = useSafeAreaInsets()
	const isFocused = useIsFocused()
	const router = useRouter()
	const params = useSearchParams()

	const confirmationCode = useReactiveVar(ConfirmationCodeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const colorScheme = useThemeColorScheme()

	const { isOpen, onOpen, onClose } = useDisclose()

	const CELL_COUNT = String(params?.code).length
	const ref = useBlurOnFulfill({ value: confirmationCode.code, cellCount: CELL_COUNT })

	const { num, complete } = Countdown(9)
	const [codeValue, setCodeValue] = useState('')

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

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: codeValue,
		setValue: setCodeValue,
	})

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			code: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const checkFinalCode = (value: string): ValidateResult => {
		console.log(value)
		console.log(params.code)

		if (value !== params?.code) {
			return false
		} else {
			return true
		}
	}

	const onSubmit = (data: { code: any }) => {
		const { code } = data

		if (code !== params?.code) {
			return setError('code', { type: 'validate', message: 'Invalid code' })
		}
		clearErrors()
		if (checkFinalCode(code)) {
			router.push({
				pathname: '(app)/credential/personalcredentialstack/birthday',
			})
		} else {
			setError('code', { type: 'validate', message: 'Wrong code' })
		}
	}

	useEffect(() => {
		console.log(
			"🚀 ~ file: confirmationcode.tsx:118 ~ useEffect ~ watch('code').length:",
			watch('code').length,
			CELL_COUNT,
		)
		if (watch('code').length === CELL_COUNT) {
			onSubmit({
				code: watch('code'),
			})
		}
	}, [watch('code')])

	const InnerContent = () => {
		return (
			<Box
				display={isFocused ? 'flex' : 'none'}
				_light={{
					bg: 'light.200',
				}}
				_dark={{
					bg: 'dark.200',
				}}
				flexDir={'row'}
				justifyContent={'space-between'}
				alignContent={'space-around'}
				h={'90px'}
				px={'2.5%'}
			>
				<Box justifyContent={'space-around'}>
					{complete ? (
						<VStack space={0} justifyContent={'space-around'}>
							<Button
								variant={'ghost'}
								size={'xs'}
								_text={{ fontSize: 'lg' }}
								justifyContent={'flex-start'}
								// onPress={() => navigation.goBack()}
							>
								{/* <Text fontSize={'lg'}>Resend code</Text> */}
								Resend code
							</Button>
							<Button
								variant={'ghost'}
								_text={{ fontSize: 'lg' }}
								size={'xs'}
								justifyContent={'flex-start'}
								// onPress={() => navigation.goBack()}
							>
								Update phone number
							</Button>
						</VStack>
					) : (
						<Text>
							Resend code in 0:0
							{num}
						</Text>
					)}
				</Box>
				<VStack justifyContent={'space-around'}>
					<IconButton
						disabled={!!errors.code}
						onPress={handleSubmit(onSubmit)}
						variant={'solid'}
						color={'primary.500'}
						isDisabled={!!errors.code}
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
								color={errors.code ? 'light.800' : 'white'}
							/>
						}
					/>
				</VStack>
			</Box>
		)
	}

	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
					{`Enter the 4-diget code sent to you at ${
						credentialPersonalProfileVar.email
							? credentialPersonalProfileVar.email
							: credentialPersonalProfileVar?.phone?.completeNumber
					}`}
				</Heading>
				<View style={{ alignSelf: 'center', width: '80%' }}>
					<Controller
						name='code'
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
							<CodeField
								{...props}
								inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
								ref={ref}
								value={value}
								onChangeText={value => onChange(value)}
								cellCount={CELL_COUNT}
								rootStyle={{
									marginVertical: 10,
								}}
								keyboardType='number-pad'
								textContentType='oneTimeCode'
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								blurOnSubmit={false}
								autoFocus
								onEndEditing={handleSubmit(onSubmit)}
								renderCell={({ index, symbol, isFocused }) => (
									<Box
										key={index}
										w={'50px'}
										h={'60px'}
										justifyContent={'center'}
										alignItems={'center'}
										borderBottomColor={!isFocused ? '#ccc' : '#007AFF'}
										borderBottomWidth={isFocused ? '2px' : '1px'}
										onLayout={getCellOnLayoutHandler(index)}
									>
										<Heading color={'primary.500'} fontSize={'3xl'}>
											{symbol || (isFocused ? <Cursor /> : null)}
										</Heading>
									</Box>
								)}
							/>
						)}
						rules={{
							required: {
								value: true,
								message: '',
							},
							validate: {
								checkLength: value => value.length === CELL_COUNT,
								checkFinalCode: value =>
									checkFinalCode(value) || "The SMS passcode you've entered is incorrect.",
							},
						}}
					/>
					<Text style={{ color: 'red' }}>{errors?.code?.message}</Text>
				</View>
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<InnerContent />
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
					<InnerContent />
				</Reanimated.View>
			)}
		</Box>
	)
}
