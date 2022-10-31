import { useReactiveVar } from '@apollo/client'
import { TAB_NAVIGATION_HEIGHT } from '@constants/ReactNavigationConstants'
import { Feather } from '@expo/vector-icons'
import { useSendAuthenticatorDeviceOwnerCodeMutation } from '@graphql/generated'
import { useHeaderHeight } from '@react-navigation/elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Text, Icon, IconButton, Input, KeyboardAvoidingView, Box } from 'native-base'
import React, { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View, TextInput, InteractionManager } from 'react-native'
import styled, { ThemeContext } from 'styled-components/native'

const EmailScreen = () => {
	const emailRef = useRef<TextInput>()
	const isFocused = useIsFocused()
	const headerHeight = useHeaderHeight()
	const navigation = useNavigation()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

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
		if (isFocused) {
			InteractionManager.runAfterInteractions(() => {
				emailRef.current?.focus()
			})
		} else {
			InteractionManager.runAfterInteractions(() => {
				emailRef.current?.blur()
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
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter your email
			</Text>
			<View style={{ marginVertical: 20, width: '100%' }}>
				<Controller
					name='email'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							ref={emailRef}
							key={'email'}
							variant={'underlined'}
							autoFocus
							returnKeyType='done'
							autoComplete='email'
							autoCapitalize='none'
							keyboardType='email-address'
							numberOfLines={1}
							placeholder='Email'
							inputAccessoryViewID={inputAccessoryViewID}
							py={4}
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
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
			<InputAccessoryView nativeID={inputAccessoryViewID}>
				<Box
					bg={'white'}
					flexDir={'row'}
					justifyContent={'flex-start'}
					alignContent={'space-around'}
					h={'90px'}
					px={'2.5%'}
				>
					<Box display={'flex'} flex={2} flexDir={'column'} justifyContent={'space-around'} px={'5px'}>
						<Text>Check your email for your verification code that we sent you</Text>
					</Box>
					<IconButton
						disabled={!!errors.email}
						onPress={handleSubmit(onSubmit)}
						variant={'solid'}
						color={'primary.500'}
						isDisabled={!!errors.email}
						style={{
							justifyContent: 'center',
							borderRadius: 50,
							height: 70,
							width: 70,
							paddingHorizontal: 20,
							alignSelf: 'center',
						}}
						icon={
							<Icon
								as={Feather}
								name='arrow-right'
								size={'2xl'}
								color={errors.email ? 'light.800' : 'white'}
							/>
						}
					/>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default EmailScreen
