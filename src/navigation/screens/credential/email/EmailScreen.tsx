import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import RNEHeading800 from '@components/atoms/typography/RNETypography/heading/RNEHeading800'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Input } from '@rneui/base'
import { Button, Icon } from '@rneui/themed'
import { Text } from 'native-base'
import React, { useContext, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

const EmailScreen = () => {
	const isFocused = useIsFocused()
	const headerHeight = useHeaderHeight()
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const emailRef = useRef<Input | null>(null)

	const inputAccessoryViewID = 'uniqueID2'
	const keyboardVerticalOffset =
		Platform.OS === 'ios' ? headerHeight + TAB_NAVIGATION_HEIGHT + 65 : 0

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

	const [sendCode] = useSendAuthenticatorDeviceOwnerCodeMutation({
		onCompleted: data => {
			switch (data.sendAuthenticatorDeviceOwnerCode?.__typename) {
				case 'ErrorProfiling':
					setError('email', {
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

	const RightIcon = () => (
		<Icon
			type='feather'
			name='arrow-right'
			size={35}
			color={
				errors.email ? themeContext.palette.disabled.color : themeContext.palette.bfscompany.accent
			}
		/>
	)

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

	return (
		<OuterView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter your email
			</Text>
			{isFocused ? (
				<View style={{ marginVertical: 20, width: '100%' }}>
					<Controller
						name='email'
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<RNETextInput
								refChild={emailRef}
								keyProp='email'
								onChange={onChange}
								onSubmitEditing={handleSubmit(onSubmit)}
								onBlur={onBlur}
								textContentType='emailAddress'
								value={value.toLowerCase()}
								autoFocus
								blurOnSubmit={false}
								placeholder='Email'
								returnKeyType='done'
								autoCompleteType='email'
								autoCapitalize='none'
								keyboardType='email-address'
								inputAccessoryViewID={inputAccessoryViewID}
								numberOfLines={1}
								errorMessage={errors?.email?.message}
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
			) : null}
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<InputAccessoryContainer style={{ justifyContent: 'flex-start' }}>
					<InputAccessoryInnerView>
						<Text>Check your email for your verification code that we sent you</Text>
					</InputAccessoryInnerView>
					<Button
						onPress={handleSubmit(onSubmit)}
						disabled={!!errors.email}
						buttonStyle={{
							backgroundColor: errors.email
								? themeContext.palette.disabled.background
								: themeContext.palette.bfscompany.primary,
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							justifyContent: 'center',
						}}
						containerStyle={{
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

export default EmailScreen

const OuterView = styled.KeyboardAvoidingView`
	flex: 1;
	height: auto;
	flex-direction: column;
	margin-horizontal: 2%;
`

const InputAccessoryInnerView = styled.View`
	flex: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding-horizontal: 5px;
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
