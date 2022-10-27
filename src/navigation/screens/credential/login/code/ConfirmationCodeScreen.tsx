import { useReactiveVar } from '@apollo/client'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ConfirmationCodeReactiveVar, CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import Countdown from '@util/hooks/useTimer'
import { Text } from 'native-base'
import { useContext, useState } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { InputAccessoryView, Pressable, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { PersonalCredentialStackParamList } from 'src/types/app'
import styled, { ThemeContext } from 'styled-components/native'

type CodeInputCellViewType = {
	isFocused: boolean
}

// TODO: FN(Resend code functionality) - ln:172

export type ConfirmationCodeScreenRouteProp = RouteProp<
	PersonalCredentialStackParamList,
	'ConfirmationCodeScreen'
>

const ConfirmationCodeScreen = () => {
	const route = useRoute<ConfirmationCodeScreenRouteProp>()
	const navigation = useNavigation()
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

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={
				errors.code
					? themeContext.palette.disabled.color.primary
					: themeContext.palette.bfscompany.accent
			}
		/>
	)

	return (
		<OuterView>
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
							checkCompare: value =>
								value === route.params.code || "The SMS passcode you've entered is incorrect.",
							checkFinalCode: value => checkFinalCode(value) || "Code doesn't match.",
						},
					}}
				/>
				<Text color={'error.500'}>{errors?.code?.message}</Text>
			</View>
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer>
					<CodeInputOptionsView>
						{complete ? (
							<>
								<Pressable onPress={() => null}>
									<Text style={{ color: themeContext.palette.highlight.color.primary }}>
										Confirm resend code
									</Text>
								</Pressable>
								<Pressable onPress={() => navigateToUpdatePhoneNumber()}>
									<Text style={{ color: themeContext.palette.highlight.color.primary }}>
										Update phone number
									</Text>
								</Pressable>
							</>
						) : (
							<Text>
								Resend code in 0:0
								{num}
							</Text>
						)}
					</CodeInputOptionsView>
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
							containerStyle={{
								justifyContent: 'center',
							}}
							buttonStyle={{
								backgroundColor: errors.code
									? themeContext.palette.disabled.background
									: themeContext.palette.highlight.background.primary,
								justifyContent: 'center',
								height: 70,
								width: 70,
								paddingHorizontal: 20,
								borderRadius: 50,
							}}
							iconPosition='right'
							icon={<RightIcon />}
						/>
					</View>
				</InputAccessoryContainer>
			</InputAccessoryView>
		</OuterView>
	)
}

export default ConfirmationCodeScreen

const OuterView = styled.View`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 5%;
`

const CodeInputOptionsView = styled.View`
	flex-direction: column;
	justify-content: space-around;
	margin-vertical: 4px;
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
