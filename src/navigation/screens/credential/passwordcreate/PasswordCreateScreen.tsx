import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button, Icon, Text, Box, Input, KeyboardAvoidingView, useTheme } from 'native-base'
import { useContext, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const PasswordCreateScreen = () => {
	const passwordRef = useRef(null)
	const navigation = useNavigation()
	const themeContext = useContext(ThemeContext)
	const theme = useTheme()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const inputAccessoryViewID = '34333mnk21323w22sd2222222222fnkn3ij42kkkl22'
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0

	const {
		control,
		handleSubmit,
		setError,
		getValues,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const values = getValues()

	useEffect(() => {
		if (!values.password) {
			setError('password', { type: 'validate', message: '' })
		}
		if (passwordRef && passwordRef.current) {
			passwordRef.current?.focus()
		}
	}, [])

	const navigateToNextScreen = async (): Promise<void | null> => {
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'PhotoScreen',
			},
		})
	}

	const onSubmit = async (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			password: data.password,
		})

		navigateToNextScreen()
	}

	const ConfirmPasswordInputRightIcon = () => (
		<Icon
			name={errors.password ? 'close-circle' : 'checkmark-circle'}
			as={Ionicons}
			size={25}
			mx={3}
			color={errors?.password ? theme.colors.error[500] : 'transparent'}
		/>
	)

	const RightIcon = () => (
		<Icon
			as={Feather}
			name='arrow-right'
			size={'xl'}
			color={errors.password ? theme.colors.primary[500] : 'white'}
		/>
	)

	return (
		<KeyboardAvoidingView
			height={'auto'}
			flexDir={'column'}
			mx={'5%'}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<Text mt={4} lineHeight={35} fontWeight={'black'} fontSize={'3xl'}>
				Enter a password
			</Text>
			<View style={{ marginVertical: '10%', width: '100%' }}>
				<Controller
					name='password'
					control={control}
					defaultValue=''
					render={({ field: { onChange, onBlur, value } }) => {
						return (
							<>
								<Input
									ref={passwordRef}
									key='password'
									value={value}
									secureTextEntry
									onChangeText={value => onChange(value)}
									onSubmitEditing={() => {
										handleSubmit(onSubmit)
										passwordRef?.current?.focus()
									}}
									onBlur={onBlur}
									textContentType='password'
									blurOnSubmit={false}
									autoFocus
									placeholder='Password'
									returnKeyType='next'
									autoCorrect={false}
									inputAccessoryViewID={inputAccessoryViewID}
									autoCapitalize='none'
									numberOfLines={1}
								/>
								<Text>{errors?.password?.message}</Text>
							</>
						)
					}}
					rules={{
						required: {
							value: true,
							message: '',
						},
						validate: {
							greaterThanZero: value => value.length > 0 || 'Must have password',
							noSpaces: value => /^[\S]+$/.test(value) || '',
							greaterQualThanFour: value => value.length >= 4 || 'Must be greater than 3 characters',
							checkDigets: value => /(?=.*\d)[A-Za-z\d]{1,}$/.test(value) || 'Must have a diget.',
						},
					}}
				/>
				<InputAccessoryView nativeID={inputAccessoryViewID}>
					<Box
						flexDir={'row'}
						justifyContent={'flex-end'}
						alignContent={'space-around'}
						height={'90px'}
						px={'2.5%'}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<Button
								onPress={handleSubmit(onSubmit)}
								isDisabled={!!errors.password}
								style={{
									justifyContent: 'center',
									backgroundColor: errors.password ? theme.colors.gray[300] : theme.colors.primary[500],
									height: 70,
									width: 70,
									paddingHorizontal: 20,
									borderRadius: 50,
								}}
								endIcon={<RightIcon />}
							/>
						</View>
					</Box>
				</InputAccessoryView>
			</View>
		</KeyboardAvoidingView>
	)
}

export default PasswordCreateScreen
