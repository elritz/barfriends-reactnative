import { useReactiveVar } from '@apollo/client'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useCheckUsernameLazyQuery } from '@graphql/generated'
import { useNavigation } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar } from '@reactive'
import useThemeColorScheme from '@util/hooks/theme/useThemeColorScheme'
import { Button, Input, useTheme, Text, Icon, Box, KeyboardAvoidingView } from 'native-base'
import { useContext, useRef } from 'react'
import { Controller, useForm, ValidateResult } from 'react-hook-form'
import { ActivityIndicator, InputAccessoryView, Platform, View } from 'react-native'
import { ThemeContext } from 'styled-components/native'

const UsernameScreen = () => {
	const inputAccessoryViewID = 'uniqsdfweeqweeeeeeqweue1d5'
	const navigation = useNavigation()
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)
	const usernameTextInputRef = useRef(null)
	const themeContext = useContext(ThemeContext)
	const colorScheme = useThemeColorScheme()
	const theme = useTheme()

	const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0

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
			<ActivityIndicator size='small' color={themeContext.palette.primary.color.default} />
		) : (
			<Icon
				as={Ionicons}
				name='checkmark-circle'
				size={'lg'}
				color={errors.username || !CUData?.checkUsername ? 'error.600' : 'success.700'}
				mr={2}
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
						<Input
							ref={usernameTextInputRef}
							value={value}
							key='username'
							placeholder='Username'
							variant={'underlined'}
							keyboardAppearance={colorScheme}
							onChangeText={onChange}
							onSubmitEditing={handleSubmit(onSubmit)}
							onBlur={onBlur}
							autoCorrect={false}
							autoFocus
							textContentType='username'
							autoComplete='username-new'
							returnKeyType='done'
							py={2}
							_input={{
								fontSize: '2xl',
								fontWeight: 'medium',
							}}
							size={'lg'}
							numberOfLines={1}
							keyboardType='default'
							autoCapitalize='none'
							inputAccessoryViewID={inputAccessoryViewID}
							blurOnSubmit={true}
							InputRightElement={<InputRightIcon />}
						/>
					)}
					rules={{
						required: {
							value: true,
							message: '',
						},
						validate: {
							greaterThanZero: value => value.length > 0 || '',
							greaterQualThanFour: value => value.length >= 1 || '',
							noSpaces: value => /^[\S]+$/.test(value) || 'No spaces are allowed',
							validateCheckUsername: async value => (await validateCheckUsername(value)) || '',
						},
					}}
				/>
				<Text>{errors?.username?.message}</Text>
			</View>
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
					<Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<Button
							onPress={handleSubmit(onSubmit)}
							isDisabled={!!errors.username}
							style={{
								justifyContent: 'center',
								backgroundColor: errors.username ? theme.colors.gray[300] : theme.colors.primary[500],
								borderRadius: 50,
								height: 70,
								width: 70,
								paddingHorizontal: 20,
							}}
							rightIcon={
								<Icon
									as={Feather}
									name='arrow-right'
									size={35}
									color={errors.username ? theme.colors.primary[500] : 'white'}
								/>
							}
						/>
					</Box>
				</Box>
			</InputAccessoryView>
		</KeyboardAvoidingView>
	)
}

export default UsernameScreen
