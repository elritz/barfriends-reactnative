import { useReactiveVar } from '@apollo/client'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import RNEText500 from '@components/atoms/typography/RNETypography/text/RNEText500'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import Countdown from '@util/hooks/useTimer'
import { Box, Text, VStack } from 'native-base'
import { useContext, useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Pressable, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import styled, { ThemeContext } from 'styled-components/native'

type CodeInputCellViewType = {
	isFocused: boolean
}

// TODO: FN(Resend Code) - when the user presses resend code need to resend and keep track of how many times

const CodeScreen = () => {
	const navigation = useNavigation()
	const route = useRoute()
	const themeContext = useContext(ThemeContext)
	const confirmationCode = useReactiveVar(ConfirmationCodeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const inputAccessoryViewID = 'codeAccessoryViewID'
	const CELL_COUNT = 4
	const { num, complete } = Countdown(9)
	const [codeValue, setCodeValue] = useState('')

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

	const navigateToNextScreen = () => {
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'BirthdayScreen',
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
		checkFinalCode(code)
	}

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={errors.code ? themeContext.palette.disabled.color.primary : 'white'}
		/>
	)

	return (
		<OuterView>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				{`Enter the 4-diget code sent to you at ${
					credentialPersonalProfileVar.email
						? credentialPersonalProfileVar.email
						: credentialPersonalProfileVar.phone.completeNumber
				}`}
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
								<CodeInputCellView
									onLayout={getCellOnLayoutHandler(index)}
									key={index}
									isFocused={isFocused}
								>
									<CellText>{symbol || (isFocused ? <Cursor /> : null)}</CellText>
								</CodeInputCellView>
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
				<RNEText500>{errors?.code?.message}</RNEText500>
			</View>
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer>
					<Box justifyContent={'space-around'}>
						{complete ? (
							<VStack space={2} justifyContent={'space-around'}>
								<Pressable onPress={() => console.log('TDO: resend code')}>
									<Text fontSize={'lg'}>Resend code</Text>
								</Pressable>
								<Pressable
									onPress={() =>
										navigation.navigate('CredentialNavigator', {
											screen: 'PersonalCredentialStack',
											params: {
												screen: 'EmailPhoneTabStack',
												params: {
													screen: 'PhoneScreen',
												},
											},
										})
									}
								>
									<Text fontSize={'lg'}>Update phone number</Text>
								</Pressable>
							</VStack>
						) : (
							<Text>
								Resend code in 0:0
								{num}
							</Text>
						)}
					</Box>
					<VStack justifyContent={'space-around'}>
						<Button
							disabled={!!errors.code}
							onPress={handleSubmit(onSubmit)}
							containerStyle={{
								justifyContent: 'center',
							}}
							buttonStyle={{
								backgroundColor: errors.code
									? themeContext.palette.disabled.background
									: themeContext.palette.bfscompany.primary,
								justifyContent: 'center',
								height: 70,
								width: 70,
								paddingHorizontal: 20,
								borderRadius: 50,
							}}
							iconPosition='right'
							icon={<RightIcon />}
						/>
					</VStack>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</OuterView>
	)
}

export default CodeScreen

const OuterView = styled.View`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 5%;
	margin-top: 20px;
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
const CodeInputCellView = styled.View<CodeInputCellViewType>`
	width: 50px;
	height: 60px;
	justify-content: center;
	align-items: center;
	border-bottom-color: ${props => (!props.isFocused ? '#ccc' : '#007AFF')};
	border-bottom-width: ${props => (props.isFocused ? '2px' : '1px')};
`

const CellText = styled.Text`
	color: ${props => props.theme.palette.active.color.primary};
	font-size: 38px;
	text-align: center;
`
