import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Button, Icon, Text, Box, Input, KeyboardAvoidingView, useTheme } from 'native-base'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, View } from 'react-native'

const PasswordCreateScreen = () => {
	const passwordRef = useRef(null)
	const navigation = useNavigation()
	const colorScheme = useThemeColorScheme()
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
				screen: 'PersonalCreationComplete',
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
									variant={'underlined'}
									ref={passwordRef}
									key='password'
									keyboardAppearance={colorScheme}
									value={value}
									py={2}
									_input={{
										fontSize: '2xl',
										fontWeight: 'medium',
									}}
									size={'lg'}
									secureTextEntry
									onChangeText={value => onChange(value)}
									onSubmitEditing={() => {
										handleSubmit(onSubmit)
										passwordRef?.current?.focus()
									}}
									onBlur={onBlur}
									textContentType='password'
									blurOnSubmit={false}
									autoComplete={'password-new'}
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
						height={'90px'}
						px={'2.5%'}
						_light={{
							bg: theme.colors.light[100],
						}}
						_dark={{
							bg: theme.colors.dark[200],
						}}
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
								borderRadius={'full'}
								style={{
									justifyContent: 'center',
									height: 60,
									width: 60,
									paddingHorizontal: 20,
									alignSelf: 'center',
								}}
								endIcon={
									<Icon
										as={Feather}
										name='arrow-right'
										size={'xl'}
										color={errors.password ? 'primary.700' : 'white'}
									/>
								}
							/>
						</View>
					</Box>
				</InputAccessoryView>
			</View>
		</KeyboardAvoidingView>
	)
}

export default PasswordCreateScreen
