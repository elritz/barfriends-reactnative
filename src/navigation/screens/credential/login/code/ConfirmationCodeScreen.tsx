import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import Countdown from '@util/hooks/useTimer'
import { Box, Heading, KeyboardAvoidingView, Text, Icon, Button, useTheme } from 'native-base'
import { useContext, useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Platform, Pressable, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { LoginStackParamList } from 'src/types/app'
import { ThemeContext } from 'styled-components/native'

type CodeInputCellViewType = {
	isFocused: boolean
}

// TODO: FN(Resend code functionality) - ln:172

export type ConfirmationCodeScreenRouteProp = RouteProp<
	LoginStackParamList,
	'ConfirmationCodeScreen'
>

const ConfirmationCodeScreen = () => {
	const route = useRoute<ConfirmationCodeScreenRouteProp>()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const headerHeight = useHeaderHeight()
	const confirmationCode = useReactiveVar(ConfirmationCodeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const inputAccessoryViewID = 'codeAccessoryViewID'
	const CELL_COUNT = 4
	const { num, complete } = Countdown(9)
	const [codeValue, setCodeValue] = useState('')
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0
	const ref = useBlurOnFulfill({ value: confirmationCode.code, cellCount: CELL_COUNT })

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: codeValue,
		setValue: setCodeValue,
	})

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
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

	const navigateToUpdatePhoneNumber = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'AuthenticatorScreen',
			},
		})
	}

	const navigateToNextScreen = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'LoginCredentialStack',
			params: {
				screen: 'DeviceManagerScreen',
				params: {
					authenticator: route.params.authenticator,
				},
			},
		})
	}

	const checkFinalCode = (value: string): ValidateResult => {
		if (value !== route.params.code) {
			return false
		}
		navigateToNextScreen()
		return true
	}

	const onSubmit = (data: { code: any }) => {
		const { code } = data
		if (code !== route.params.code) {
			return setError('code', { type: 'validate', message: 'Invalid code' })
		}
		clearErrors()
		navigateToNextScreen()
	}

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				{`Enter the 4-diget code sent to you at ${route.params.authenticator}`}
			</Text>
			<View style={{ marginVertical: '10%', width: '100%' }}>
				<Controller
					name='code'
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CodeField
							{...props}
							ref={ref}
							value={value}
							onChangeText={value => onChange(value)}
							cellCount={CELL_COUNT}
							rootStyle={{
								marginVertical: 10,
								width: 260,
							}}
							keyboardType='number-pad'
							textContentType='oneTimeCode'
							inputAccessoryViewID={inputAccessoryViewID}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							blurOnSubmit
							autoFocus
							onEndEditing={handleSubmit(onSubmit)}
							renderCell={({ index, symbol, isFocused }) => (
								<Box
									width={'50px'}
									height={'60px'}
									justifyContent={'center'}
									alignItems={'center'}
									borderBottomColor={isFocused ? '#ccc' : '#007AFF'}
									borderBottomWidth={isFocused ? '2px' : '1px'}
									onLayout={getCellOnLayoutHandler(index)}
									key={index}
								>
									<Heading
										style={{
											color: themeContext.palette.company.primary,
										}}
									>
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
							checkCompare: value =>
								value === route.params.code || "The SMS passcode you've entered is incorrect.",
							checkFinalCode: value => checkFinalCode(value) || "Code doesn't match.",
						},
					}}
				/>
				<Text color={'error.500'}>{errors?.code?.message}</Text>
			</View>
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					flexDir={'row'}
					justifyContent={'flex-end'}
					alignContent={'space-around'}
					height={'90px'}
					px={'2.5%'}
				>
					<Box flexDir={'column'} justifyContent={'space-around'} my={2} flex={1}>
						{complete ? (
							<>
								<Pressable onPress={() => null}>
									<Text colorScheme={'primary'}>Confirm resend code</Text>
								</Pressable>
								<Pressable onPress={() => navigateToUpdatePhoneNumber()}>
									<Text colorScheme={'primary'}>Update phone number</Text>
								</Pressable>
							</>
						) : (
							<Text>
								Resend code in 0:0
								{num}
							</Text>
						)}
					</Box>
					<View
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<Button
							disabled={!!errors.code}
							onPress={handleSubmit(onSubmit)}
							colorScheme={errors.code ? 'gray' : 'primary'}
							style={{
								justifyContent: 'center',
								height: 70,
								width: 70,
								paddingHorizontal: 20,
								borderRadius: 50,
							}}
							endIcon={
								<Icon
									as={Feather}
									name='arrow-right'
									size={'xl'}
									color={errors.code ? theme.colors.gray[300] : themeContext.palette.bfscompany.accent}
								/>
							}
						/>
					</View>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default ConfirmationCodeScreen
