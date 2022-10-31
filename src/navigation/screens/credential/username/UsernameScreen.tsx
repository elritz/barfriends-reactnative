import { useReactiveVar } from '@apollo/client'
import RNETextInput from '@components/atoms/inputs/rnetextinput/RNETextInput'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useCheckUsernameLazyQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import { Button } from '@rneui/base'
import { Text, Icon, Box, KeyboardAvoidingView } from 'native-base'
import { useContext, useRef } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { ActivityIndicator, InputAccessoryView, Platform, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const UsernameScreen = () => {
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const inputAccessoryViewID = 'uniqsdfweeqweeeeeeqweue1d5'
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0
	const navigation = useNavigation()
	const usernameTextInputRef = useRef(null)
	const themeContext = useContext(ThemeContext)

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			username: '',
		},
		resolver: undefined,
		context: undefined,
		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: true,
	})

	const values = getValues()

	const [checkUsername, { data: CUData, loading: CULoading, error: CUError }] =
		useCheckUsernameLazyQuery({
			fetchPolicy: 'no-cache',
			variables: {
				username: values.username,
			},
			onCompleted(data) {
				if (!data.checkUsername) {
					setError('username', { type: 'validate', message: 'Username has been taken' })
				} else {
					clearErrors()
				}
			},
		})

	const onSubmit = (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			username: data.username,
		})
		navigation.navigate('CredentialNavigator', {
			screen: 'PersonalCredentialStack',
			params: {
				screen: 'PasswordCreateScreen',
			},
		})
	}

	const validateCheckUsername = async (value: string): Promise<ValidateResult> => {
		setTimeout(() => {
			checkUsername()
		}, 500)
		if (!CULoading && CUData?.checkUsername) {
			return true
		} else {
			setError('username', { type: 'validate', message: 'Username has been taken' })
			return false
		}
	}

	const InputRightIcon = () => {
		return CULoading ? (
			<ActivityIndicator size='small' color={themeContext.palette.primary.color.primary} />
		) : (
			<Icon
				as={Ionicons}
				name='checkmark-circle'
				size={'lg'}
				color={errors.username || !CUData?.checkUsername ? 'error.600' : 'success.700'}
			/>
		)
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
				Choose your username
			</Text>
			<View style={{ marginVertical: '10%', width: '100%' }}>
				<Controller
					name='username'
					control={control}
					defaultValue=''
					render={({ field: { onChange, onBlur, value } }) => (
						<RNETextInput
							refChild={usernameTextInputRef}
							value={value}
							keyProp='username'
							placeholder='Username'
							onChange={value => onChange(value)}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							autoCorrect={false}
							autoFocus
							textContentType='username'
							returnKeyType='done'
							numberOfLines={1}
							keyboardType='default'
							autoCapitalize='none'
							inputAccessoryViewID={inputAccessoryViewID}
							blurOnSubmit={true}
							rightIcon={<InputRightIcon />}
							errorMessage={errors?.username?.message}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: '',
						},
						validate: {
							greaterThanZero: value => value.length > 0 || 'Must have password',
							greaterQualThanFour: value => value.length >= 1 || '',
							noSpaces: value => /^[\S]+$/.test(value) || 'No spaces are allowed',
							validateCheckUsername: async value => (await validateCheckUsername(value)) || '',
						},
					}}
				/>
			</View>
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
							disabled={!!errors.username}
							containerStyle={{
								justifyContent: 'center',
							}}
							buttonStyle={{
								backgroundColor: errors.username
									? themeContext.palette.disabled.background
									: themeContext.palette.highlight.background.primary,
								borderRadius: 50,
								height: 70,
								width: 70,
								paddingHorizontal: 20,
								justifyContent: 'center',
							}}
							iconPosition='right'
							icon={
								<Icon
									as={Feather}
									name='arrow-right'
									size={35}
									color={errors.username ? themeContext.palette.disabled.color.primary : 'white'}
								/>
							}
						/>
					</View>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default UsernameScreen
