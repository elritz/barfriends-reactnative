import { useReactiveVar } from '@apollo/client'
import { Box, Heading, Input, Pressable, Text } from '@components/core'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { CredentialPersonalProfileReactiveVar, ThemeReactiveVar } from '@reactive'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputAccessoryView, Platform, TextInput, View } from 'react-native'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import Reanimated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function () {
	const INPUT_ACCESSORY_VIEW_ID = 'pc-1298187263'
	const _passwordRef = useRef<TextInput>(null)
	const router = useRouter()
	const isFocused = useIsFocused()
	const { bottom } = useSafeAreaInsets()
	const rTheme = useReactiveVar(ThemeReactiveVar)
	const credentialPersonalProfileVar = useReactiveVar(CredentialPersonalProfileReactiveVar)

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
		if (_passwordRef && _passwordRef.current) {
			_passwordRef.current?.focus()
		}
	}, [])

	const navigateToNextScreen = async (): Promise<void | null> => {
		router.push({
			pathname: '(app)/credential/personalcredentialstack/create',
		})
	}

	const onSubmit = async (data: any) => {
		CredentialPersonalProfileReactiveVar({
			...credentialPersonalProfileVar,
			password: data.password,
		})

		navigateToNextScreen()
	}
	return (
		<Box flex={1}>
			<Reanimated.View style={{ flex: 1, marginHorizontal: 15 }}>
				<Heading mt={'$4'} fontWeight={'$black'} fontSize={'$3xl'}>
					Enter a password
				</Heading>
				<View style={{ marginVertical: '10%', width: '100%' }}>
					<Controller
						name='password'
						control={control}
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<>
									<Input
										ref={_passwordRef}
										variant={'underlined'}
										key='password'
										keyboardAppearance={rTheme.colorScheme === 'light' ? 'light' : 'dark'}
										value={value}
										py={2}
										_input={{
											fontSize: '2xl',
											fontWeight: 'medium',
										}}
										size={'lg'}
										secureTextEntry
										onChangeText={value => onChange(value)}
										onSubmitEditing={handleSubmit(onSubmit)}
										onBlur={onBlur}
										textContentType='oneTimeCode'
										blurOnSubmit={false}
										autoComplete={'password-new'}
										autoFocus
										enablesReturnKeyAutomatically={false}
										placeholder='Password'
										returnKeyType='done'
										autoCorrect={false}
										inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
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
				</View>
			</Reanimated.View>
			{Platform.OS === 'ios' ? (
				<InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
					<Box
						flexDirection={'row'}
						justifyContent={'flex-end'}
						sx={{
							h: 90,
						}}
						px={'$2'}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<Pressable disabled={!!errors.password} onPress={handleSubmit(onSubmit)}>
								<Box
									alignItems='center'
									justifyContent='center'
									sx={{
										h: 50,
										w: 50,
									}}
									rounded={'$full'}
									bg='$primary500'
								>
									<Feather name='arrow-right' size={32} color={errors?.password ? '#292524' : 'white'} />
								</Box>
							</Pressable>
						</View>
					</Box>
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
					<Box
						flexDirection={'row'}
						justifyContent={'flex-end'}
						alignItems='center'
						sx={{
							h: 90,
						}}
						px={'$2'}
					>
						<View
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
							}}
						>
							<Pressable disabled={!!errors.password} onPress={handleSubmit(onSubmit)}>
								<Box
									alignItems='center'
									justifyContent='center'
									sx={{
										h: 50,
										w: 50,
									}}
									rounded={'$full'}
									bg='$primary500'
								>
									<Feather name='arrow-right' size={32} color={errors?.password ? '#292524' : 'white'} />
								</Box>
							</Pressable>
						</View>
					</Box>
				</Reanimated.View>
			)}
		</Box>
	)
}
